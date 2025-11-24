import { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import './TopBannerCarousel.css';

// 우리 프로젝트용 배너 데이터
const items = [
  {
    src: '/TopBannerCarousel/banner-main.png',      // 공구 메인 홍보 이미지
    altText: '지금 가장 인기 있는 공동구매',
    caption: '지금 가장 인기 있는 공동구매',
    key: 1,
  },
  {
    src: '/TopBannerCarousel/banner-new.jpg',       // 신규 공구 이미지
    altText: '오늘 새로 열린 공구',
    caption: '오늘 새로 열린 공구',
    key: 2,
  },
  {
    src: '/TopBannerCarousel/banner-propose.png',   // 제안 유도 이미지
    altText: '원하는 상품이 없나요? 직접 제안해보세요',
    caption: '원하는 상품이 없나요? 직접 제안해보세요',
    key: 3,
  },
  {
    src: '/TopBannerCarousel/banner-notice.png',    // 공지사항 이미지
    altText: '서비스 안내 및 공지사항',
    caption: '서비스 안내 및 공지사항',
    key: 4,
  },
];

function TopBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key}
    >
      <img src={item.src} alt={item.altText} className="d-block w-100" />
      <CarouselCaption
        captionText={item.altText}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <div className="top-banner">
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
    </div>
  );
}

export default TopBannerCarousel;