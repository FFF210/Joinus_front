import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './ProductStatistics.css';

export default function ProductStatistics() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupbuyId = searchParams.get('groupbuy') || 'GG-1024';

  // 상품 정보 더미 데이터
  const productData = {
    'GG-1024': {
      id: 'GG-1024',
      name: '친환경 텀블러 500ml',
      category: '생활용품',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      minParticipants: 100,
      currentParticipants: 75,
      targetPrice: 15000,
      currentPrice: 15000,
      status: '진행중'
    },
    'GG-1025': {
      id: 'GG-1025',
      name: '프리미엄 수건 세트',
      category: '생활용품',
      startDate: '2025-11-05',
      endDate: '2025-11-20',
      minParticipants: 80,
      currentParticipants: 40,
      targetPrice: 16000,
      currentPrice: 16000,
      status: '진행중'
    },
    'GG-1026': {
      id: 'GG-1026',
      name: '해외 직구 커피머신',
      category: '가전/기타',
      startDate: '2025-11-08',
      endDate: '2025-11-22',
      minParticipants: 30,
      currentParticipants: 18,
      targetPrice: 110000,
      currentPrice: 110000,
      status: '진행중'
    }
  };

  const product = productData[groupbuyId] || productData['GG-1024'];

  // 일별 참여 통계
  const dailyStats = [
    { date: '2025-11-01', participants: 5, revenue: 75000 },
    { date: '2025-11-02', participants: 8, revenue: 120000 },
    { date: '2025-11-03', participants: 12, revenue: 180000 },
    { date: '2025-11-04', participants: 15, revenue: 225000 },
    { date: '2025-11-05', participants: 18, revenue: 270000 },
    { date: '2025-11-06', participants: 22, revenue: 330000 },
    { date: '2025-11-07', participants: 28, revenue: 420000 },
    { date: '2025-11-08', participants: 35, revenue: 525000 },
    { date: '2025-11-09', participants: 42, revenue: 630000 },
    { date: '2025-11-10', participants: 50, revenue: 750000 },
    { date: '2025-11-11', participants: 58, revenue: 870000 },
    { date: '2025-11-12', participants: 65, revenue: 975000 },
    { date: '2025-11-13', participants: 75, revenue: 1125000 },
  ];

  // 참여자 상세 내역
  const participantDetails = [
    { id: 1, name: '김철수', phone: '010-1234-5678', joinDate: '2025-11-13 14:30', quantity: 1, amount: 15000, status: '결제완료' },
    { id: 2, name: '이영희', phone: '010-2345-6789', joinDate: '2025-11-13 13:15', quantity: 2, amount: 30000, status: '결제완료' },
    { id: 3, name: '박민수', phone: '010-3456-7890', joinDate: '2025-11-13 12:00', quantity: 1, amount: 15000, status: '결제완료' },
    { id: 4, name: '최지은', phone: '010-4567-8901', joinDate: '2025-11-13 11:45', quantity: 1, amount: 15000, status: '결제대기' },
    { id: 5, name: '정수진', phone: '010-5678-9012', joinDate: '2025-11-13 10:20', quantity: 3, amount: 45000, status: '결제완료' },
    { id: 6, name: '한지훈', phone: '010-6789-0123', joinDate: '2025-11-12 18:30', quantity: 1, amount: 15000, status: '결제완료' },
    { id: 7, name: '윤서아', phone: '010-7890-1234', joinDate: '2025-11-12 17:15', quantity: 2, amount: 30000, status: '결제완료' },
    { id: 8, name: '강도현', phone: '010-8901-2345', joinDate: '2025-11-12 16:00', quantity: 1, amount: 15000, status: '결제완료' },
    { id: 9, name: '임태영', phone: '010-9012-3456', joinDate: '2025-11-12 15:30', quantity: 1, amount: 15000, status: '결제완료' },
    { id: 10, name: '오지은', phone: '010-0123-4567', joinDate: '2025-11-12 14:20', quantity: 1, amount: 15000, status: '결제완료' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 페이지네이션 계산
  const totalPages = Math.ceil(participantDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = participantDetails.slice(startIndex, endIndex);

  const progress = (product.currentParticipants / product.minParticipants) * 100;
  const totalRevenue = product.currentParticipants * product.currentPrice;
  const remainingParticipants = product.minParticipants - product.currentParticipants;

  const formatCurrency = (amount) => {
    return `₩ ${amount.toLocaleString()}`;
  };

  const handleBack = () => {
    navigate('/admin/statistics');
  };

  return (
    <div className="product-statistics-page">
      {/* 헤더 */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">상품별 통계</h1>
          <p className="page-description">
            {product.name}의 상세 통계를 확인할 수 있습니다.
          </p>
        </div>
        <button className="back-button" onClick={handleBack}>
          &lt; 목록으로
        </button>
      </div>

      {/* 상품 기본 정보 */}
      <div className="product-info-section">
        <div className="product-info-card">
          <div className="info-row">
            <div className="info-item">
              <label className="info-label">공구 ID</label>
              <div className="info-value">{product.id}</div>
            </div>
            <div className="info-item">
              <label className="info-label">상품명</label>
              <div className="info-value">{product.name}</div>
            </div>
            <div className="info-item">
              <label className="info-label">카테고리</label>
              <div className="info-value">{product.category}</div>
            </div>
            <div className="info-item">
              <label className="info-label">상태</label>
              <div className="info-value">
                <span className={`status-badge ${product.status === '진행중' ? 'status-ongoing' : 'status-completed'}`}>
                  {product.status}
                </span>
              </div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <label className="info-label">시작일</label>
              <div className="info-value">{product.startDate}</div>
            </div>
            <div className="info-item">
              <label className="info-label">마감일</label>
              <div className="info-value">{product.endDate}</div>
            </div>
            <div className="info-item">
              <label className="info-label">목표 인원수</label>
              <div className="info-value">{product.minParticipants}명</div>
            </div>
            <div className="info-item">
              <label className="info-label">현재 참여수</label>
              <div className="info-value highlight">{product.currentParticipants}명</div>
            </div>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-label">현재 매출</div>
          <div className="stat-value">{formatCurrency(totalRevenue)}</div>
          <div className="stat-note">
            목표 매출: {formatCurrency(product.minParticipants * product.currentPrice)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">진행률</div>
          <div className="stat-value">{progress.toFixed(1)}%</div>
          <div className="stat-note">
            {remainingParticipants > 0 ? `목표까지 ${remainingParticipants}명 남음` : '목표 달성!'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">평균 주문 금액</div>
          <div className="stat-value">{formatCurrency(product.currentPrice)}</div>
          <div className="stat-note">
            단가 기준
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">결제 완료</div>
          <div className="stat-value">
            {participantDetails.filter(p => p.status === '결제완료').length}건
          </div>
          <div className="stat-note">
            총 {participantDetails.length}건 중
          </div>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="progress-section">
        <div className="progress-header">
          <h2 className="section-title">진행률</h2>
          <span className="progress-text">
            {product.currentParticipants} / {product.minParticipants}명
          </span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 일별 참여 추이 */}
      <div className="chart-section">
        <h2 className="section-title">일별 참여 추이</h2>
        <div className="chart-container">
          <div className="chart-bars">
            {dailyStats.map((day, index) => {
              const maxParticipants = Math.max(...dailyStats.map(d => d.participants));
              const height = (day.participants / maxParticipants) * 100;
              return (
                <div key={index} className="chart-bar-item">
                  <div className="bar-wrapper">
                    <div 
                      className="bar" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="bar-label">{day.date.split('-')[2]}</div>
                  <div className="bar-value">{day.participants}명</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 참여자 상세 내역 */}
      <div className="participants-section">
        <div className="section-header">
          <h2 className="section-title">참여자 상세 내역</h2>
          <span className="participants-count">총 {participantDetails.length}명</span>
        </div>
        <div className="table-container">
          <table className="participants-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>연락처</th>
                <th>참여일시</th>
                <th>수량</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {currentParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td className="name-cell">{participant.name}</td>
                  <td>{participant.phone}</td>
                  <td>{participant.joinDate}</td>
                  <td>{participant.quantity}개</td>
                  <td className="amount-cell">{formatCurrency(participant.amount)}</td>
                  <td>
                    <span className={`status-badge ${participant.status === '결제완료' ? 'status-paid' : 'status-pending'}`}>
                      {participant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

