import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Notice.css';

export default function NoticePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notice');

  // 공지사항 더미 데이터
  const noticeList = [
    { id: 1, title: '시스템 점검 안내', date: '2025-01-15', views: 152 },
    { id: 2, title: '설 연휴 배송 안내', date: '2025-01-14', views: 203 },
    { id: 3, title: '개인정보 처리방침 변경 안내', date: '2025-01-10', views: 89 },
    { id: 4, title: '신규 결제 수단 추가 안내', date: '2025-01-08', views: 145 },
    { id: 5, title: '고객센터 운영시간 변경', date: '2025-01-05', views: 178 },
  ];

  // FAQ 더미 데이터
  const faqList = [
    { id: 1, question: '배송은 얼마나 걸리나요?', answer: '주문 후 평균 2-3일 소요됩니다.' },
    { id: 2, question: '환불은 어떻게 하나요?', answer: '마이페이지에서 주문 취소 후 환불 신청 가능합니다.' },
    { id: 3, question: '공동구매는 어떻게 참여하나요?', answer: '원하는 상품의 공구 참여하기 버튼을 클릭하세요.' },
    { id: 4, question: '회원 탈퇴는 어떻게 하나요?', answer: '마이페이지 > 설정에서 회원 탈퇴가 가능합니다.' },
  ];

  // 1:1 문의 더미 데이터
  const inquiryList = [
    { id: 1, title: '배송 지연 문의', status: '답변 완료', date: '2025-01-15' },
    { id: 2, title: '상품 불량 문의', status: '답변 대기', date: '2025-01-14' },
    { id: 3, title: '결제 오류 문의', status: '답변 완료', date: '2025-01-13' },
  ];

  return (
    <div className="notice-page">
      <div className="notice-container">
        <h1 className="page-title">고객센터</h1>

        {/* 탭 메뉴 */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'notice' ? 'active' : ''}`}
            onClick={() => setActiveTab('notice')}
          >
            공지사항
          </button>
          <button
            className={`tab ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button
            className={`tab ${activeTab === 'inquiry' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiry')}
          >
            1:1 문의
          </button>
        </div>

        {/* 공지사항 탭 */}
        {activeTab === 'notice' && (
          <div className="tab-content">
            <div className="notice-list">
              <table className="notice-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성일</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  {noticeList.map((notice, index) => (
                    <tr 
                      key={notice.id}
                      onClick={() => navigate(`/cs/notice/${notice.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{noticeList.length - index}</td>
                      <td className="title-cell">{notice.title}</td>
                      <td>{notice.date}</td>
                      <td>{notice.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQ 탭 */}
        {activeTab === 'faq' && (
          <div className="tab-content">
            <div className="faq-list">
              {faqList.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div className="faq-question">
                    <span className="faq-icon">Q</span>
                    <span>{faq.question}</span>
                  </div>
                  <div className="faq-answer">
                    <span className="faq-icon">A</span>
                    <span>{faq.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 1:1 문의 탭 */}
        {activeTab === 'inquiry' && (
          <div className="tab-content">
            <div className="inquiry-list">
              <table className="inquiry-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>상태</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiryList.map((inquiry, index) => (
                    <tr key={inquiry.id}>
                      <td>{inquiryList.length - index}</td>
                      <td className="title-cell">{inquiry.title}</td>
                      <td>
                        <span className={`status ${inquiry.status === '답변 완료' ? 'completed' : 'pending'}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td>{inquiry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

