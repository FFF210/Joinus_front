import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InquiryDetail.css';

export default function InquiryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 더미 데이터 (백엔드 연동 전까지)
  const dummyInquiry = {
    id: 1,
    order_number: 'ORD-2025-001234',
    category: '배송',
    title: '배송 지연 문의',
    content: '주문한 상품이 예상 배송일보다 늦게 도착하고 있습니다. 배송 상황을 확인해주세요.',
    status: '답변 완료',
    created_at: '2025-01-15',
    attachments: [
      { id: 1, url: '/images/inquiry1.jpg', name: '배송지연증명.jpg' },
      { id: 2, url: '/images/inquiry2.jpg', name: '주문내역.jpg' }
    ],
    answer: {
      content: '안녕하세요. 배송 지연으로 불편을 드려 죄송합니다. 현재 배송 중이며 내일 도착 예정입니다. 추가 문의사항이 있으시면 언제든지 연락주세요.',
      answered_at: '2025-01-16',
      answered_by: '관리자'
    }
  };

  useEffect(() => {
    const fetchInquiry = async () => {
      setIsLoading(true);
      try {
        // TODO: 백엔드 연동 시 아래 주석 해제하고 실제 API 호출
        // const baseUrl = 'http://localhost:8080';
        // const response = await fetch(`${baseUrl}/inquiries/${id}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`, // 인증 토큰 필요
        //   },
        // });
        // const data = await response.json();
        // setInquiry(data);

        // 임시: 더미 데이터 사용
        setInquiry(dummyInquiry);
      } catch (error) {
        console.error('문의 상세 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiry();
  }, [id]);

  if (isLoading) {
    return (
      <div className="inquiry-detail-page">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="inquiry-detail-page">
        <div className="error">문의를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="inquiry-detail-page">
      <div className="inquiry-detail-container">
        {/* 헤더 */}
        <div className="detail-header">
          <h1 className="page-title">1:1 문의</h1>
          <button className="back-button" onClick={() => navigate('/cs/notice?tab=inquiry')}>
            ← 뒤로가기
          </button>
        </div>

        {/* 문의 카드 */}
        <div className="inquiry-card">
          {/* 제목 및 상태 */}
          <div className="inquiry-title-section">
            <div className="inquiry-header">
              <h2 className="inquiry-title">{inquiry.title}</h2>
              <span className={`status-badge ${inquiry.status === '답변 완료' ? 'completed' : 'pending'}`}>
                {inquiry.status}
              </span>
            </div>
            <div className="inquiry-meta">
              <span className="inquiry-date">작성일: {inquiry.created_at}</span>
              {inquiry.order_number && (
                <span className="inquiry-order">주문번호: {inquiry.order_number}</span>
              )}
              {inquiry.category && (
                <span className="inquiry-category">카테고리: {inquiry.category}</span>
              )}
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="inquiry-question-section">
            <h3 className="section-label">문의 내용</h3>
            <div className="inquiry-content">{inquiry.content}</div>
            
            {/* 첨부 이미지 */}
            {inquiry.attachments && inquiry.attachments.length > 0 && (
              <div className="inquiry-attachments">
                <h4 className="attachments-title">첨부 파일</h4>
                <div className="attachment-list">
                  {inquiry.attachments.map((file) => (
                    <div key={file.id} className="attachment-item">
                      <img src={file.url} alt={file.name} className="attachment-image" />
                      <span className="attachment-name">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 관리자 답변 */}
          {inquiry.status === '답변 완료' && inquiry.answer && (
            <div className="inquiry-answer-section">
              <h3 className="section-label">관리자 답변</h3>
              <div className="answer-content">
                <p>{inquiry.answer.content}</p>
                <div className="answer-footer">
                  <span>답변일: {inquiry.answer.answered_at}</span>
                  <span>담당자: {inquiry.answer.answered_by}</span>
                </div>
              </div>
            </div>
          )}

          {/* 답변 대기 상태 */}
          {inquiry.status === '답변 대기' && (
            <div className="inquiry-waiting">
              <p>답변 대기 중입니다. 빠른 시일 내에 답변드리겠습니다.</p>
            </div>
          )}
        </div>

        {/* 목록 버튼 */}
        <div className="detail-footer">
          <button className="list-button" onClick={() => navigate('/cs/notice?tab=inquiry')}>
            문의 목록
          </button>
        </div>
      </div>
    </div>
  );
}