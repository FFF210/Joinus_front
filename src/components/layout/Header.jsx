import { useState } from 'react';
import './Header.css';

export default function Header({ user = { nickname: 'NickName' } }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="header">
      {/* 상단 링크 */}
      <div className="header-top">
        <div className="header-top-container">
          <div className="header-links">
            <a href="/profile">(주)J{user.nickname} 님</a>
            <a href="/logout">로그아웃</a>
            <a href="/mypage">마이페이지</a>
            <a href="/cart">장바구니</a>
            <a href="/customer">고객센터</a>
            <a href="/delivery">배송조회</a>
            <a href="/partnership">납품문의</a>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="header-main">
        <div className="header-main-container">
          {/* 로고 */}
          <div className="header-logo">
            <img src="/logo-JOINus.png" alt="JOINus 로고" className="logo-image" />
          </div>

          {/* 네비게이션 */}
          <nav className="header-nav">
            <a href="/groupbuy">공동 구매</a>
            <a href="/proposals">제안 목록</a>
          </nav>

          {/* 검색바 */}
          <div className="header-search">
            <input
              type="text"
              placeholder="상품명, 키워드로를 검색하세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <span className="search-icon">🔍</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
