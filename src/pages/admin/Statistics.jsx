import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Statistics.css';

export default function Statistics() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: '주간',
    startDate: '2025-11-06',
    endDate: '2025-11-13',
    category: '전체'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 매출 통계 더미 데이터
  const revenueStats = {
    total: 6520000,
    average: 931429,
    previousPeriod: 5800000,
    growth: 12.4
  };

  // 일별 매출 데이터
  const dailyRevenue = [
    { date: '2025-11-06', revenue: 850000, orders: 45 },
    { date: '2025-11-07', revenue: 920000, orders: 52 },
    { date: '2025-11-08', revenue: 780000, orders: 38 },
    { date: '2025-11-09', revenue: 1110000, orders: 65 },
    { date: '2025-11-10', revenue: 950000, orders: 48 },
    { date: '2025-11-11', revenue: 1010000, orders: 58 },
    { date: '2025-11-12', revenue: 1240000, orders: 72 },
  ];

  // 상세 매출 내역
  const allRevenueDetails = [
    {
      id: 'GG-1024',
      productName: '친환경 텀블러 500ml',
      category: '생활용품',
      participants: 75,
      revenue: 1125000,
      date: '2025-11-13',
      status: '진행중'
    },
    {
      id: 'GG-1025',
      productName: '프리미엄 수건 세트',
      category: '생활용품',
      participants: 40,
      revenue: 640000,
      date: '2025-11-12',
      status: '진행중'
    },
    {
      id: 'GG-1026',
      productName: '해외 직구 커피머신',
      category: '가전/기타',
      participants: 18,
      revenue: 1980000,
      date: '2025-11-11',
      status: '진행중'
    },
    {
      id: 'GG-1023',
      productName: '유기농 샴푸 세트',
      category: '생활용품',
      participants: 120,
      revenue: 960000,
      date: '2025-11-10',
      status: '완료'
    },
    {
      id: 'GG-1022',
      productName: '스마트 워치',
      category: '가전/기타',
      participants: 85,
      revenue: 2550000,
      date: '2025-11-09',
      status: '완료'
    },
    {
      id: 'GG-1021',
      productName: '에어프라이어',
      category: '가전/기타',
      participants: 95,
      revenue: 2850000,
      date: '2025-11-08',
      status: '완료'
    },
    {
      id: 'GG-1020',
      productName: '무선 블루투스 이어폰',
      category: '가전/기타',
      participants: 150,
      revenue: 4500000,
      date: '2025-11-07',
      status: '완료'
    },
    {
      id: 'GG-1019',
      productName: '친환경 장바구니',
      category: '생활용품',
      participants: 200,
      revenue: 1200000,
      date: '2025-11-06',
      status: '완료'
    },
    {
      id: 'GG-1018',
      productName: '주방용 소형 블렌더',
      category: '주방/식기',
      participants: 60,
      revenue: 1800000,
      date: '2025-11-05',
      status: '완료'
    },
    {
      id: 'GG-1017',
      productName: '식품 세트',
      category: '식품',
      participants: 180,
      revenue: 1080000,
      date: '2025-11-04',
      status: '완료'
    },
    {
      id: 'GG-1016',
      productName: 'LED 조명',
      category: '가전/기타',
      participants: 110,
      revenue: 3300000,
      date: '2025-11-03',
      status: '완료'
    },
    {
      id: 'GG-1015',
      productName: '캐릭터 머그컵',
      category: '주방/식기',
      participants: 250,
      revenue: 750000,
      date: '2025-11-02',
      status: '완료'
    }
  ];

  // 필터링된 데이터
  const filteredDetails = allRevenueDetails.filter(item => {
    if (filters.category !== '전체' && item.category !== filters.category) {
      return false;
    }
    return true;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const revenueDetails = filteredDetails.slice(startIndex, endIndex);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    console.log('조회:', filters);
    // 실제 조회 로직
  };

  const formatCurrency = (amount) => {
    return `₩ ${amount.toLocaleString()}`;
  };

  return (
    <div className="statistics-page">
      {/* 헤더 */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">매출 통계</h1>
          <p className="page-description">
            기간별 매출 통계와 상세 내역을 확인할 수 있습니다.
          </p>
        </div>
        <div className="header-date">
          기준일: 2025-11-13
        </div>
      </div>

      {/* 필터 섹션 */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>기간</label>
            <select
              name="period"
              value={filters.period}
              onChange={handleFilterChange}
            >
              <option value="일간">일간</option>
              <option value="주간">주간</option>
              <option value="월간">월간</option>
            </select>
          </div>
          <div className="filter-group">
            <label>시작일</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>종료일</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="filter-group">
            <label>카테고리</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="전체">전체</option>
              <option value="생활용품">생활용품</option>
              <option value="식품">식품</option>
              <option value="주방/식기">주방/식기</option>
              <option value="가전/기타">가전/기타</option>
            </select>
          </div>
          <button className="search-button" onClick={handleSearch}>
            조회
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-label">총 매출</div>
          <div className="stat-value">{formatCurrency(revenueStats.total)}</div>
          <div className="stat-note">
            전 기간 대비 {revenueStats.growth > 0 ? '+' : ''}{revenueStats.growth}%
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">평균 일 매출</div>
          <div className="stat-value">{formatCurrency(revenueStats.average)}</div>
          <div className="stat-note">
            {filters.period === '주간' ? '주간' : filters.period === '월간' ? '월간' : '일간'} 평균
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">전 기간 매출</div>
          <div className="stat-value">{formatCurrency(revenueStats.previousPeriod)}</div>
          <div className="stat-note">
            비교 기준 기간
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">총 주문 건수</div>
          <div className="stat-value">{dailyRevenue.reduce((sum, day) => sum + day.orders, 0)}건</div>
          <div className="stat-note">
            선택 기간 내 주문 수
          </div>
        </div>
      </div>

      {/* 일별 매출 차트 */}
      <div className="chart-section">
        <h2 className="section-title">일별 매출 추이</h2>
        <div className="chart-container">
          <div className="chart-bars">
            {dailyRevenue.map((day, index) => {
              const maxRevenue = Math.max(...dailyRevenue.map(d => d.revenue));
              const height = (day.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="chart-bar-item">
                  <div className="bar-wrapper">
                    <div 
                      className="bar" 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="bar-label">{day.date.split('-')[2]}</div>
                  <div className="bar-value">{formatCurrency(day.revenue)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 상세 매출 내역 */}
      <div className="details-section">
        <div className="section-header">
          <h2 className="section-title">상세 매출 내역</h2>
          <span className="details-count">총 {filteredDetails.length}건</span>
        </div>
        <div className="table-container">
          <table className="revenue-table">
            <thead>
              <tr>
                <th>공구 ID</th>
                <th>상품명</th>
                <th>카테고리</th>
                <th>참여수</th>
                <th>매출</th>
                <th>날짜</th>
                <th>상태</th>
                <th>통계</th>
              </tr>
            </thead>
            <tbody>
              {revenueDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="product-name-cell">{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.participants}명</td>
                  <td className="revenue-cell">{formatCurrency(item.revenue)}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status-badge ${item.status === '완료' ? 'status-completed' : 'status-ongoing'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <a 
                      href={`/admin/statistics/product?groupbuy=${item.id}`}
                      className="detail-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/admin/statistics/product?groupbuy=${item.id}`);
                      }}
                    >
                      상세보기
                    </a>
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

