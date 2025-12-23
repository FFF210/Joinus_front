import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { myAxios } from '../../config';
import { getNoticeImageUrl } from '../../services/csApi';
import AdminHeader from '../../components/layout/AdminHeader';
import { X, Download, File } from 'lucide-react';
import '../../styles/components/button.css';
import './admin-common.css';
import './NoticeForm.css';

const NoticeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    files: []
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  // 파일 미리보기 정보
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    // 새 글 작성 진입 시 상태 초기화
    if (!id) {
      setFormData({ title: '', content: '', files: [] });
      setFilePreviews([]);
      setPreviewUrl(null);
      return;
    }

    const fetchNotice = async () => {
      try {
        const response = await myAxios().get(`/admin/noticeDetail/${id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          content: data.content,
          files: [] // 기존 파일은 미리보기만 노출
        });
        if (data.image1FileId) {
          setPreviewUrl(getNoticeImageUrl(data.image1FileId));
        } else {
          setPreviewUrl(null);
        }
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        alert("공지사항을 불러올 수 없습니다.");
      }
    };

    fetchNotice();
  }, [id]);

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(() => {
    return () => {
      filePreviews.forEach(preview => {
        if (preview.url) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ 핵심 수정: 기존 파일에 추가하는 방식
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const currentCount = formData.files.length;
    const maxFiles = 3;
    
    // 3개 초과 체크
    if (currentCount + newFiles.length > maxFiles) {
      alert(`파일은 최대 ${maxFiles}개까지만 첨부할 수 있습니다.\n현재 ${currentCount}개, 추가하려는 파일 ${newFiles.length}개`);
      e.target.value = ''; // input 초기화
      return;
    }

    // 기존 파일에 새 파일 추가
    const updatedFiles = [...formData.files, ...newFiles];

    // 새 파일들의 미리보기만 생성
    const newPreviews = newFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type,
      name: file.name,
      size: file.size
    }));

    // 기존 미리보기에 새 미리보기 추가
    setFilePreviews(prev => [...prev, ...newPreviews]);
    
    setFormData(prev => ({
      ...prev,
      files: updatedFiles
    }));

    // input 초기화 (같은 파일 다시 선택 가능하게)
    e.target.value = '';
  };

  // 개별 파일 삭제
  const handleRemoveFile = (index) => {
    // URL 해제
    if (filePreviews[index]?.url) {
      URL.revokeObjectURL(filePreviews[index].url);
    }

    // 배열에서 제거
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
    setFilePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 파일 타입 체크
  const isImageFile = (type) => {
    return type.startsWith('image/');
  };

  // 파일 크기 포맷
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleCancel = () => {
    navigate('/admin/noticeList');
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);

    formData.files.forEach(file => {
      data.append('images', file);
    });

    try {
      const response = isEdit
        ? await myAxios().post(`/admin/noticeUpdate/${id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        : await myAxios().post('/admin/noticeForm', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });

      // 백엔드 응답에서 notice id 추출
      let noticeId = response?.data?.id ?? response?.data?.noticeId;
      if (!noticeId && typeof response?.data === 'string') {
        const match = response.data.match(/(\d+)/);
        if (match) noticeId = match[1];
      }
      if (!noticeId && isEdit) {
        noticeId = id; // fallback
      }

      alert(isEdit ? "수정되었습니다." : "등록되었습니다.");
      navigate(`/cs/notice/${noticeId}`);
    } catch (error) {
      console.error("공지사항 등록 실패:", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("공지사항 등록 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="admin-layout">
      <div className="main-content">
        <AdminHeader title={isEdit ? "공지사항 수정" : "공지사항 등록"} />

        <div className="content-area">
          <div className="form-container">
            {/* 제목 */}
            <div className="form-group">
              <label className="form-label">제목</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="제목을 입력하세요"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* 본문 */}
            <div className="form-group">
              <label className="form-label">본문</label>
              <textarea
                name="content"
                className="form-textarea"
                placeholder="내용을 입력하세요"
                value={formData.content}
                onChange={handleChange}
                rows={12}
              />
            </div>

            {/* 파일 첨부 */}
            <div className="form-group">
              <label className="form-label">
                파일 첨부 ({formData.files.length}/3)
              </label>

              {/* 파일 선택 버튼 - 3개 미만일 때만 표시 */}
              {formData.files.length < 3 && (
                <div className="image-upload-container" style={{ marginBottom: '16px' }}>
                  <input
                    type="file"
                    id="file-upload"
                    className="image-input"
                    accept="*/*"
                    onChange={handleFileChange}
                    multiple
                  />
                  <label htmlFor="file-upload" className="image-upload-label">
                     파일 선택 ({formData.files.length}/3)
                  </label>
                </div>
              )}

              {/* 파일 미리보기 영역 */}
              {filePreviews.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '16px'
                }}>
                  {filePreviews.map((preview, index) => (
                    <div
                      key={index}
                      style={{
                        position: 'relative',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      {/* 삭제 버튼 */}
                      <button
                        onClick={() => handleRemoveFile(index)}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 10
                        }}
                      >
                        <X size={14} />
                      </button>

                      {/* 이미지 미리보기 */}
                      {isImageFile(preview.type) ? (
                        <div style={{ marginBottom: '8px' }}>
                          <img
                            src={preview.url}
                            alt={preview.name}
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                      ) : (
                        /* 일반 파일 아이콘 */
                        <div style={{
                          width: '100%',
                          height: '150px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          marginBottom: '8px'
                        }}>
                          <File size={48} color="#6b7280" />
                        </div>
                      )}

                      {/* 파일 정보 */}
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        <div style={{
                          fontWeight: 'bold',
                          marginBottom: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {preview.name}
                        </div>
                        <div>{formatFileSize(preview.size)}</div>
                      </div>

                      {/* 다운로드 버튼 (일반 파일만) */}
                      {!isImageFile(preview.type) && (
                        <a
                          href={preview.url}
                          download={preview.name}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            marginTop: '8px',
                            padding: '6px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '12px'
                          }}
                        >
                          <Download size={14} />
                          다운로드
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 버튼 */}
            <div className="form-actions">
              <button className="notice-button secondary" onClick={handleCancel}>
                취소
              </button>
              <button className="notice-button primary" onClick={handleSubmit}>
                {isEdit ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeForm;
