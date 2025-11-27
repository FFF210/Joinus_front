import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // 더미 데이터
  const topProposals = [
    { id: 1, name: '무선 블루투스 이어폰', votes: 125 },
    { id: 2, name: '스마트 워치', votes: 98 },
    { id: 3, name: '에어프라이어', votes: 87 },
  ];

  const pendingPayments = [
    { id: 1, name: '친환경 텀블러 500ml', count: 5 },
    { id: 2, name: '해외 직구 커피머신', count: 3 },
    { id: 3, name: '유기농 식물성 샴푸 세트', count: 2 },
  ];

  const ongoingGroupBuys = [
    {
      id: 'GG-1024',
      name: '친환경 텀블러 500ml',
      participants: 75,
      minParticipants: 100,
      revenue: '₩ 1,125,000',
      deadline: '2일 3시간'
    },
    {
      id: 'GG-1025',
      name: '프리미엄 수건 세트',
      participants: 40,
      minParticipants: 80,
      revenue: '₩ 640,000',
      deadline: '5일'
    },
    {
      id: 'GG-1026',
      name: '해외 직구 커피머신',
      participants: 18,
      minParticipants: 30,
      revenue: '₩ 1,980,000',
      deadline: '7일'
    },
  ];

  return (
    <div className="dashboard-page">
      {/* 헤더 */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">대시보드</h1>
          <p className="page-description">
            오늘/이번 주 매출, 진행 중 공구 현황을 한 눈에 확인합니다.
          </p>
        </div>
        <div className="header-date">
          오늘 기준: 2025-11-09
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-label">이번주 매출</div>
          <div className="stat-value">₩ 6,520,000</div>
          <div className="stat-note">오늘 매출: ₩ 1,240,000 (어제 대비 +12%)</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">진행 중 공구 수</div>
          <div className="stat-value">12건</div>
          <div className="stat-note">마감 임박: 3건</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">주문 대기 건수</div>
          <div className="stat-value">8건</div>
          <div className="stat-note">처리 필요</div>
        </div>
      </div>

      {/* 제안상품 탑 3 & 결제 대기 공구상품 */}
      <div className="content-row">
        <div className="content-card">
          <h2 className="card-title">제안상품 탑 3</h2>
          <div className="proposal-list">
            {topProposals.map((item) => (
              <div key={item.id} className="proposal-item">
                <div className="proposal-info">
                  <div className="proposal-name">{item.name}</div>
                  <div className="proposal-votes">투표수: {item.votes}개</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card">
          <h2 className="card-title">결제 대기 공구상품 건</h2>
          <div className="payment-list">
            {pendingPayments.map((item) => (
              <div key={item.id} className="payment-item">
                <div className="payment-info">
                  <div className="payment-name">{item.name}</div>
                  <div className="payment-count">결제 대기: {item.count}건</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 진행 중 공구 목록 */}
      <div className="list-section">
        <div className="list-header">
          <h2 className="list-title">진행 중 공구 목록</h2>
          <a 
            href="/admin/statistics" 
            className="list-link"
            onClick={(e) => {
              e.preventDefault();
              navigate('/admin/statistics');
            }}
          >
            전체 공구 통계 보기
          </a>
        </div>
        <div className="table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>공구 ID</th>
                <th>상품명</th>
                <th>참여수 / 최소 인원수</th>
                <th>현재 매출</th>
                <th>마감까지</th>
              </tr>
            </thead>
            <tbody>
              {ongoingGroupBuys.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.participants} / {item.minParticipants}</td>
                  <td>{item.revenue}</td>
                  <td>{item.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

