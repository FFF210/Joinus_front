import { useNavigate, useParams } from 'react-router-dom';
import './NoticeDetail.css';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 더미 공지사항 데이터
  const notice = {
    id: 1,
    category: '계획',
    title: 'CJONE 포인트 적립 시 유의사항 안내',
    date: '2025-11-20',
    views: 152,
    content: {
      intro: `안녕하세요, 공구멤버입니다.
공동구매 구매 시 CJ ONE 포인트 적립 가능 상품 이용 시에는 아래와같이, 확인 단계별 서비스 이용을 위해 약관 내용을 꼭 확인해 주세요.`,
      sections: [
        {
          title: 'CJ ONE 포인트 적립 가능',
          items: [
            '포인트 적립은 본인 고객의 경우만 가능합니다.',
            '공구신청 시 본인정보는 반드시 올바른 정보를 입력하여 데이터가 정확히 입력해야 CJ ONE 데이터 시스템 정보 관리됩니다.',
            '직접 참여팀을 완료 후 포인트 적용 시에는 자동으로 적립되나, 팀장 2개월 정도 계속 위치 없는 포인트 이외되오니 함께입니다.'
          ]
        },
        {
          title: 'CJ ONE 포인트 이용 유의 사항',
          items: [
            '공구정품 포인트나 재구매 서비스 공구 이하때 문제점이 구매는 본 적립 혜택은 제공되는 사항이 없어마하거나 결과중복 될 수 있습니다.',
            '적립률은 제도대로의 위치거나 포인트 변신 대출을 강력하기 바랍니다.',
            '적립대상 및 이와상품 규정 설수 정도되거나 변화될 경우작는 당부 공지닙 적립 사항이 취소될 수 있으므로 운영하십시기 바랍니다.'
          ]
        }
      ],
      footer: '감사합니다.\n공동구매 드림'
    },
    images: [
      {
        title: '[공지] 무가치의 서비스 안영콘링 제한 안내(11/20)',
        expanded: false
      },
      {
        title: '조이스소 공구 판매 공인 안내',
        expanded: false
      }
    ]
  };

  return (
    <div className="notice-detail-page">
      <div className="notice-detail-container">
        {/* 헤더 */}
        <div className="detail-header">
          <h1 className="page-title">공지사항</h1>
          <button className="back-button" onClick={() => navigate('/cs/notice')}>
            ← 뒤로가기
          </button>
        </div>

        {/* 공지 상세 카드 */}
        <div className="notice-card">
          {/* 제목 영역 */}
          <div className="notice-title-section">
            <span className="notice-category">{notice.category}</span>
            <h2 className="notice-title">{notice.title}</h2>
            <span className="notice-date">{notice.date}</span>
          </div>

          {/* 본문 영역 */}
          <div className="notice-body">
            {/* 인트로 */}
            <p className="notice-intro">{notice.content.intro}</p>

            {/* 섹션들 */}
            {notice.content.sections.map((section, index) => (
              <div key={index} className="notice-section">
                <h3 className="section-title">{section.title}</h3>
                <ul className="section-items">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 푸터 */}
            <p className="notice-footer">{notice.content.footer}</p>
          </div>
        </div>

        {/* 정부 이미지 섹션 */}
        <div className="government-images-section">
          <h3 className="images-title">정부 이미지</h3>
          <div className="image-accordions">
            {notice.images.map((img, index) => (
              <div key={index} className="accordion-item">
                <button className="accordion-header">
                  <span className="accordion-icon">
                    {img.expanded ? '▲' : '▼'}
                  </span>
                  <span className="accordion-title">{img.title}</span>
                  <span className="accordion-badge">공지</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 공지 목록 버튼 */}
        <div className="detail-footer">
          <button
            className="list-button"
            onClick={() => navigate('/cs/notice')}
          >
            공지 목록
          </button>
        </div>
      </div>
    </div>
  );
}

