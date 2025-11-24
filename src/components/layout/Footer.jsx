import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* 상단 링크 */}
      <div className="footer-top-links">
        <a href="/notice">공지사항</a>
        <a href="/faq">자주하는 질문</a>
        <a href="/inquiry">1:1 문의하기</a>
        <a href="/partnership">납품문의</a>
      </div>

      {/* 메인 푸터 영역 */}
      <div className="footer-main">
        <div className="footer-container">
          {/* 왼쪽: 로고 + 설명 */}
          <div className="footer-left">
            <div className="footer-logo-section">
              <div className="footer-logo">
                <img src="/logo-JOINus.png" alt="JOINus 로고" className="logo-image" />
              </div>
              <p className="footer-description">
                Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis 소개글 ..in suscipit turpis enim cursus vulputate amet. Lobortis mi platea aliquam senectus tempus mauris neque.
              </p>
            </div>
          </div>

          {/* 오른쪽: 고객센터 */}
          <div className="footer-right">
            <h3 className="customer-center-title">고객센터</h3>
            <p className="customer-center-phone">1234-5678</p>
            <p className="customer-center-info">
              고객센터 비공개 시간에는 1:1문의하기를 이용해주세요.
            </p>
          </div>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="footer-bottom">
        <p>Non Copyrighted © 2025 Design and upload by JOINus</p>
      </div>
    </footer>
  );
}

