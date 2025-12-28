import { useState, useEffect } from 'react';
import GroupBuyCard from '../../components/common/GroupBuyCard';
import ProposalCard from '../../components/common/ProposalCard';
import './MainPage.css';
import TopBannerCarousel from './TopBannerCarousel';
import { useNavigate } from 'react-router-dom';
import { getMainPageData } from '../../services/mainPageApi';
import { transformGbProduct, transformProposal } from '../../utils/searchDataTransform';

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 배너 슬라이드
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    { image: '/mainbanner.png', link: null }, // 링크 없음
    { image: '/venderBanner.jpg', link: '/partnership' } // Partnership 페이지로
  ];

  // API에서 가져온 데이터 상태
  const [deadlineSoonItems, setDeadlineSoonItems] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [ongoingItems, setOngoingItems] = useState([]);
  const [proposalItems, setProposalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleBannerClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000); // 10초마다 변경

    return () => clearInterval(interval);
  }, []);


  // 데이터 로딩
  useEffect(() => {
    const fetchMainPageData = async () => {
      setIsLoading(true);
      try {
        const data = await getMainPageData();

        // 백엔드 데이터를 프론트엔드 형식으로 변환
        setDeadlineSoonItems((data.deadlineSoon || []).map(transformGbProduct));
        setPopularItems((data.popular || []).map(transformGbProduct));
        setOngoingItems((data.ongoing || []).map(transformGbProduct));
        setProposalItems((data.popularProposals || []).map(transformProposal));
      } catch (error) {
        console.error('메인 페이지 데이터 로딩 실패:', error);
        // 에러 시 빈 배열로 설정
        setDeadlineSoonItems([]);
        setPopularItems([]);
        setOngoingItems([]);
        setProposalItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMainPageData();
  }, []);
  // 각 섹션별 클릭 핸들러 (더보기용)
  const handleDeadlineSoonClick = () => {
    navigate('/gbProductList?type=deadline-soon&sort=deadline');
  };

  const handlePopularClick = () => {
    navigate('/gbProductList?type=popular&sort=wish');
  };

  const handleOngoingClick = () => {
    navigate('/gbProductList?type=ongoing');
  };

  const handleProposalClick = () => {
    navigate('/proposalsList?type=popular');
  };

  //  배너 변경 핸들러
  const goToPrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const goToBanner = (index) => {
    setCurrentBanner(index);
  };


  return (
    <div className="mainpage-container">
      {/* 배너 슬라이드 */}
      <div className="banner-wrapper">
        <div className="banner-slider">
          {/* 배너 이미지들 */}
          <div
            className="banner-track"
            style={{
              transform: `translateX(-${currentBanner * 100}%)`,
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {banners.map((banner, index) => (
              <div
                key={index}
                className="banner-slide"
                onClick={() => handleBannerClick(banner.link)}
                style={{ cursor: banner.link ? 'pointer' : 'default' }}
              >
                <img src={banner.image} alt={`Banner ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* 이전/다음 버튼 */}
          <button
            className="banner-nav-btn prev"
            onClick={goToPrevBanner}
            aria-label="이전 배너"
          >
            ‹
          </button>
          <button
            className="banner-nav-btn next"
            onClick={goToNextBanner}
            aria-label="다음 배너"
          >
            ›
          </button>

          {/* 인디케이터 (점) */}
          <div className="banner-indicators">
            {banners.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentBanner === index ? 'active' : ''}`}
                onClick={() => goToBanner(index)}
                aria-label={`배너 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="main-content">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>로딩 중...</div>
        ) : (
          <>
            {/* 마감 임박 */}
            <section className="section">
              <div className="mainpage-section-header">
                <h2>마감 임박</h2>
                <a
                  href="#"
                  className="more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeadlineSoonClick();
                  }}
                >
                  더보기
                </a>
              </div>
              <div className="card-grid">
                {deadlineSoonItems.length > 0 ? deadlineSoonItems.map(item => (
                  <GroupBuyCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    status={item.status}
                    // description={item.description}
                    price={item.price}
                    rating={item.rating}
                    currentParticipants={item.currentParticipants}
                    maxParticipants={item.maxParticipants}
                    deadlineTime={item.deadlineTime}
                    productId={item.id}
                    isProposal={false}
                  />
                )) : <div style={{ textAlign: 'center', padding: '20px' }}>데이터가 없습니다.</div>}
              </div>
            </section>

            {/* 인기공구 */}
            <section className="section">
              <div className="mainpage-section-header">
                <h2>인기 공구</h2>
                <a
                  href="#"
                  className="more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePopularClick();
                  }}
                >
                  더보기
                </a>
              </div>
              <div className="card-grid">
                {popularItems.length > 0 ? popularItems.map(item => (
                  <GroupBuyCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    status={item.status}
                    // description={item.description}
                    price={item.price}
                    rating={item.rating}
                    currentParticipants={item.currentParticipants}
                    maxParticipants={item.maxParticipants}
                    productId={item.id}
                    isProposal={false}
                  />
                )) : <div style={{ textAlign: 'center', padding: '20px' }}>데이터가 없습니다.</div>}
              </div>
            </section>

            {/* 진행중 공구 */}
            <section className="section">
              <div className="mainpage-section-header">
                <h2>진행중 공구</h2>
                <a
                  href="#"
                  className="more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOngoingClick();
                  }}
                >
                  더보기
                </a>
              </div>
              <div className="card-grid">
                {ongoingItems.length > 0 ? ongoingItems.map(item => (
                  <GroupBuyCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    status={item.status}
                    // description={item.description}
                    price={item.price}
                    rating={item.rating}
                    currentParticipants={item.currentParticipants}
                    maxParticipants={item.maxParticipants}
                    progress={item.progress}
                    deadlineTime={item.deadlineTime}
                    productId={item.id}
                    isProposal={false}
                  />
                )) : <div style={{ textAlign: 'center', padding: '20px' }}>데이터가 없습니다.</div>}
              </div>
            </section>

            {/* 인기 제안 */}
            <section className="section">
              <div className="mainpage-section-header">
                <h2>인기 제안</h2>
                <a
                  href="#"
                  className="more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleProposalClick();
                  }}
                >
                  더보기
                </a>
              </div>
              <div className="card-grid">
                {proposalItems.length > 0 ? proposalItems.map(item => (
                  <ProposalCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    price={item.price}
                    voteCount={item.currentParticipants || 0}
                    productId={item.id}
                  />
                )) : <div style={{ textAlign: 'center', padding: '20px' }}>데이터가 없습니다.</div>}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}