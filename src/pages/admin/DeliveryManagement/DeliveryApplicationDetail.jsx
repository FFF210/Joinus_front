import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../../pages/consumer/Partnership.css';
import './DeliveryApplicationDetail.css';

export default function DeliveryApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 더미 데이터 (실제로는 API에서 ID로 가져옴)
  // Partnership 폼 구조와 동일하게 맞춤
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    managerName: '',
    managerPhone: '',
    managerEmail: '',
    category: '',
    productName: '',
    productDescription: '',
    supplyPrice: '',
    minQuantity: '',
    deliveryPeriod: '',
    currentStock: '',
    proposalLink: '',
    additionalNotes: '',
    appliedDate: '',
    status: ''
  });

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      setIsLoading(true);
      try {
        // TODO: 백엔드 연동 시 아래 주석 해제하고 실제 API 호출
        // const baseUrl = 'http://localhost:8080';
        // const response = await fetch(`${baseUrl}/admin/supply/applications/${id}`);
        // const data = await response.json();
        // setFormData(data);

        // 임시: 더미 데이터 사용 (Partnership 폼 구조에 맞춤)
        const mockData = {
          id: id,
          companyName: '친환경용품 상사',
          businessNumber: '123-45-67890',
          managerName: '김지연',
          managerPhone: '010-1111-2222',
          managerEmail: 'eco@example.com',
          category: '생활용품',
          productName: '친환경 텀블러 500ml 세트',
          productDescription: '친환경 소재로 제작된 텀블러 세트입니다. BPA 프리 소재로 건강에 안전하며, 보온/보냉 기능이 뛰어납니다. 20-30대 직장인 및 학생층을 타겟으로 하며, 온라인 쇼핑몰에서 월 평균 500개 판매 실적을 보유하고 있습니다.',
          supplyPrice: '8,000원',
          minQuantity: '100개',
          deliveryPeriod: '주문 확정 후 7일 이내 출고 가능',
          currentStock: '현재 창고 재고 300개 보유',
          proposalLink: 'https://example.com/proposal-detail',
          additionalNotes: '희망 판매 방식: 공동구매 진행 시 최소 100개 단위로 주문 가능. 가격 조건: 100개 이상 주문 시 단가 8,000원, 200개 이상 주문 시 단가 7,500원. 공동구매 진행 희망 일정: 2025년 12월 중순 이후 가능.',
          appliedDate: '2025-01-15',
          status: '신청'
        };
        setFormData(mockData);
      } catch (error) {
        console.error('신청 상세 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/suppliy/applications');
  };

  const handleApprove = () => {
    if (window.confirm('이 납품 신청을 승인하시겠습니까?')) {
      // TODO: 실제 승인 로직 (API 호출)
      console.log('승인 처리:', id);
      alert('승인 처리되었습니다.');
      navigate('/admin/suppliy/applications');
    }
  };

  const handleReject = () => {
    const reason = window.prompt('반려 사유를 입력하세요.');
    if (reason && reason.trim()) {
      // TODO: 실제 반려 로직 (API 호출)
      console.log('반려 처리:', id, reason);
      alert('반려 처리되었습니다.');
      navigate('/admin/suppliy/applications');
    }
  };

  if (isLoading) {
    return (
      <div className="partnership-page">
        <div className="partnership-container">
          <div className="loading">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="partnership-page">
      <div className="partnership-container">
        {/* 헤더 */}
        <div className="partnership-header">
          <div className="detail-header-top">
            <h1 className="page-title">납품 신청 상세</h1>
            <button className="back-button" onClick={handleBack}>
              &lt; 목록으로
            </button>
          </div>
          <p className="page-description">
            납품 제안 정보를 확인하고 승인/반려 처리를 진행합니다.
          </p>
        </div>

        {/* 폼 섹션 - 읽기 전용 */}
        <div className="form-section">
          <div className="form-header-info">
            <div className="form-info-item">
              <span className="info-label">신청일:</span>
              <span className="info-value">{formData.appliedDate}</span>
            </div>
            <div className="form-info-item">
              <span className="info-label">상태:</span>
              <span className={`status-badge status-${formData.status === '승인' ? 'approved' : formData.status === '반려' ? 'rejected' : 'pending'}`}>
                {formData.status}
              </span>
            </div>
          </div>

          <form className="partnership-form">
            {/* 첫 번째 행 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="companyName">
                  업체명 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  readOnly
                  className="read-only-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="businessNumber">사업자 등록번호</label>
                <input
                  type="text"
                  id="businessNumber"
                  name="businessNumber"
                  value={formData.businessNumber}
                  readOnly
                  className="read-only-input"
                />
              </div>
            </div>

            {/* 두 번째 행 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="managerName">
                  담당자 이름 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  readOnly
                  className="read-only-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="managerPhone">
                  담당자 연락처 <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="managerPhone"
                  name="managerPhone"
                  value={formData.managerPhone}
                  readOnly
                  className="read-only-input"
                />
              </div>
            </div>

            {/* 세 번째 행 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="managerEmail">담당자 이메일</label>
                <input
                  type="email"
                  id="managerEmail"
                  name="managerEmail"
                  value={formData.managerEmail}
                  readOnly
                  className="read-only-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">주요 카테고리</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  readOnly
                  className="read-only-input"
                />
              </div>
            </div>

            {/* 보유 상품명 */}
            <div className="form-group full-width">
              <label htmlFor="productName">
                보유 상품명 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                readOnly
                className="read-only-input"
              />
            </div>

            {/* 상품 설명/강점 */}
            <div className="form-group full-width">
              <label htmlFor="productDescription">상품 설명/강점</label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                readOnly
                className="read-only-input"
                rows={5}
              />
            </div>

            {/* 네 번째 행 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="supplyPrice">예상 공급 단가 (VAT 포함)</label>
                <input
                  type="text"
                  id="supplyPrice"
                  name="supplyPrice"
                  value={formData.supplyPrice}
                  readOnly
                  className="read-only-input"
                />
                <p className="form-note">
                  ※ 공동구매 판매가 산정 시 참고용으로 활용됩니다.
                </p>
              </div>
              <div className="form-group">
                <label htmlFor="minQuantity">최소 공급 가능 수량</label>
                <input
                  type="text"
                  id="minQuantity"
                  name="minQuantity"
                  value={formData.minQuantity}
                  readOnly
                  className="read-only-input"
                />
              </div>
            </div>

            {/* 다섯 번째 행 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliveryPeriod">예상 납기</label>
                <input
                  type="text"
                  id="deliveryPeriod"
                  name="deliveryPeriod"
                  value={formData.deliveryPeriod}
                  readOnly
                  className="read-only-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentStock">현재 보유 재고</label>
                <input
                  type="text"
                  id="currentStock"
                  name="currentStock"
                  value={formData.currentStock}
                  readOnly
                  className="read-only-input"
                />
              </div>
            </div>

            {/* 제안 상세 페이지 링크 */}
            <div className="form-group full-width">
              <label htmlFor="proposalLink">제안 상세 페이지 링크</label>
              {formData.proposalLink ? (
                <div className="link-container">
                  <input
                    type="url"
                    id="proposalLink"
                    name="proposalLink"
                    value={formData.proposalLink}
                    readOnly
                    className="read-only-input"
                  />
                  <a 
                    href={formData.proposalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    링크 열기
                  </a>
                </div>
              ) : (
                <input
                  type="text"
                  id="proposalLink"
                  name="proposalLink"
                  value=""
                  readOnly
                  className="read-only-input"
                  placeholder="등록된 링크가 없습니다."
                />
              )}
              <p className="form-note">
                ※ 상세 제안서를 확인할 수 있는 웹 페이지가 있다면 입력해 주세요.
              </p>
            </div>

            {/* 기타 참고 사항 */}
            <div className="form-group full-width">
              <label htmlFor="additionalNotes">기타 참고 사항</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes || ''}
                readOnly
                className="read-only-input"
                rows={5}
                placeholder="등록된 내용이 없습니다."
              />
            </div>

            {/* 버튼 영역 - 승인/반려 버튼 */}
            {formData.status === '신청' && (
              <div className="form-actions">
                <button type="button" className="btn-reject" onClick={handleReject}>
                  반려
                </button>
                <button type="button" className="btn-approve" onClick={handleApprove}>
                  승인
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

