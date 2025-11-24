import { useParams, useNavigate } from 'react-router-dom';
import './DeliveryDetail.css';

export default function DeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 더미 데이터 (실제로는 API에서 ID로 가져옴)
  const deliveryData = {
    id: id,
    companyName: '친환경용품 상사',
    businessNumber: '123-45-67890',
    managerName: '김지연 과장',
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
    receivedDate: '2025-10-15',
    status: '승인 대기'
  };

  const handleBack = () => {
    navigate('/admin/deliveryManagement');
  };

  const handleApprove = () => {
    if (window.confirm('이 납품 제안을 승인하시겠습니까?')) {
      alert('승인 처리되었습니다.');
      // 실제 승인 로직
      navigate('/admin/deliveryManagement');
    }
  };

  const handleHold = () => {
    if (window.confirm('이 납품 제안을 보류하시겠습니까?')) {
      alert('보류 처리되었습니다.');
      // 실제 보류 로직
      navigate('/admin/deliveryManagement');
    }
  };

  return (
    <div className="delivery-detail-page">
      <div className="delivery-detail-container">
        {/* 헤더 */}
        <div className="detail-header">
          <div className="header-content">
            <h1 className="page-title">납품신청 상세</h1>
            <p className="page-description">
              납품 제안 정보를 확인하고 승인/반려 처리를 진행합니다.
            </p>
          </div>
          <button className="back-button" onClick={handleBack}>
            &lt; 목록으로
          </button>
        </div>

        {/* 기본 정보 섹션 */}
        <div className="detail-section">
          <h2 className="section-title">기본 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">업체명</label>
              <div className="info-value">{deliveryData.companyName}</div>
            </div>
            <div className="info-item">
              <label className="info-label">사업자 등록번호</label>
              <div className="info-value">{deliveryData.businessNumber}</div>
            </div>
            <div className="info-item">
              <label className="info-label">담당자 이름</label>
              <div className="info-value">{deliveryData.managerName}</div>
            </div>
            <div className="info-item">
              <label className="info-label">담당자 연락처</label>
              <div className="info-value">{deliveryData.managerPhone}</div>
            </div>
            <div className="info-item">
              <label className="info-label">담당자 이메일</label>
              <div className="info-value">{deliveryData.managerEmail}</div>
            </div>
            <div className="info-item">
              <label className="info-label">주요 카테고리</label>
              <div className="info-value">{deliveryData.category}</div>
            </div>
            <div className="info-item">
              <label className="info-label">접수일</label>
              <div className="info-value">{deliveryData.receivedDate}</div>
            </div>
            <div className="info-item">
              <label className="info-label">상태</label>
              <div className="info-value">
                <span className={`status-badge status-${deliveryData.status === '승인 대기' ? 'pending' : deliveryData.status === '보류' ? 'hold' : 'approved'}`}>
                  {deliveryData.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 정보 섹션 */}
        <div className="detail-section">
          <h2 className="section-title">상품 정보</h2>
          <div className="info-grid">
            <div className="info-item full-width">
              <label className="info-label">보유 상품명</label>
              <div className="info-value">{deliveryData.productName}</div>
            </div>
            <div className="info-item full-width">
              <label className="info-label">상품 설명/강점</label>
              <div className="info-value text-area-value">{deliveryData.productDescription}</div>
            </div>
            <div className="info-item">
              <label className="info-label">예상 공급 단가 (VAT 포함)</label>
              <div className="info-value">{deliveryData.supplyPrice}</div>
            </div>
            <div className="info-item">
              <label className="info-label">최소 공급 가능 수량</label>
              <div className="info-value">{deliveryData.minQuantity}</div>
            </div>
            <div className="info-item">
              <label className="info-label">예상 납기</label>
              <div className="info-value">{deliveryData.deliveryPeriod}</div>
            </div>
            <div className="info-item">
              <label className="info-label">현재 보유 재고</label>
              <div className="info-value">{deliveryData.currentStock}</div>
            </div>
            <div className="info-item full-width">
              <label className="info-label">제안 상세 페이지 링크</label>
              <div className="info-value">
                {deliveryData.proposalLink ? (
                  <a href={deliveryData.proposalLink} target="_blank" rel="noopener noreferrer" className="link-value">
                    {deliveryData.proposalLink}
                  </a>
                ) : (
                  <span className="no-data">-</span>
                )}
              </div>
            </div>
            <div className="info-item full-width">
              <label className="info-label">기타 참고 사항</label>
              <div className="info-value text-area-value">{deliveryData.additionalNotes || '-'}</div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="detail-actions">
          {deliveryData.status === '승인 대기' && (
            <>
              <button className="btn-hold" onClick={handleHold}>
                보류
              </button>
              <button className="btn-approve" onClick={handleApprove}>
                승인
              </button>
            </>
          )}
          {deliveryData.status === '보류' && (
            <button className="btn-approve" onClick={handleApprove}>
              승인
            </button>
          )}
          {deliveryData.status === '승인' && (
            <div className="approved-message">이미 승인된 제안입니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

