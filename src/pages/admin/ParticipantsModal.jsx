import React, { useState, useEffect } from 'react';
import { myAxios } from '../../config';
import NotificationSendModal from './NotificationSendModal'; 
import './ParticipantsModal.css';

const ParticipantsModal = ({ productId, productName, onClose }) => {  
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);  

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        setLoading(true);
        const response = await myAxios().get(`/admin/gbProduct/${productId}/participants`);
        setParticipants(response.data);
      } catch (error) {
        console.error('참여인원 조회 실패:', error);
        alert('참여인원 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [productId]);

  
  // ========================================
  // 알림 발송 모달 열기
  // ========================================
  const handleOpenNotificationModal = () => {
    if (participants.length === 0) {
      alert('참여인원이 없어 알림을 발송할 수 없습니다.');
      return;
    }
    setShowNotificationModal(true);
  };

  
  const handleSendNotification = async ({ title, content }) => {
  try {
    console.log('========== 알림 발송 시작 ==========');
    console.log('공구 ID:', productId);
    console.log('공구명:', productName);
    console.log('참여자 수:', participants.length);
    console.log('제목:', title);
    console.log('내용:', content);
    
    //  참여자 username 확인
    const usernames = participants.map(p => p.customerName);
    console.log('참여자 이름들:', usernames);
    
    await myAxios().post(`/admin/gbProduct/${productId}/notify`, {
      title,
      content
    });
    
    alert(`알림이 ${participants.length}명에게 발송되었습니다!`);
    setShowNotificationModal(false);
    
  } catch (error) {
    console.error('알림 발송 실패:', error);
    console.error('응답:', error.response?.data);
    alert('알림 발송에 실패했습니다.');
  }
};


  return (
    <>
      <div className="participants-modal-overlay" onClick={onClose}>
        <div className="participants-modal-content" onClick={(e) => e.stopPropagation()}>
          
          {/* 헤더 */}
          <div className="participants-modal-header">
            <h2>참여인원 목록</h2>
            <button className="participants-modal-close-btn" onClick={onClose}>×</button>
          </div>

          {/* 바디 */}
          <div className="participants-modal-body">
            {loading ? (
              <div className="participants-modal-loading">로딩 중...</div>
            ) : participants.length === 0 ? (
              <div className="participants-modal-empty">
                <p>참여한 인원이 없습니다.</p>
              </div>
            ) : (
              <>
                {/* 요약 */}
                <div className="participants-modal-summary">
                  <span>총 참여인원: <strong>{participants.length}명</strong></span>
                  <button 
                    className="participants-modal-notify-btn"
                    onClick={handleOpenNotificationModal}
                  >
                    📢 알림 발송
                  </button>
                </div>

                {/* 테이블 */}
                <div className="participants-modal-table-wrapper">
                  <table className="participants-modal-table">
                    <thead>
                      <tr>
                        <th>주문번호</th>
                        <th>주문일</th>
                        <th>주문자명</th>
                        <th>옵션명</th>
                        <th>수량</th>
                        <th>결제금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.map((p, index) => (
                        <tr key={`${p.orderId}-${index}`}>
                          <td>{p.orderId}</td>
                          <td>{new Date(p.orderDate).toLocaleDateString('ko-KR')}</td>
                          <td>{p.customerName}</td>
                          <td>{p.optionName || '-'}</td>
                          <td>{p.quantity}</td>
                          <td>{p.paymentAmount?.toLocaleString()}원</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* 푸터 */}
          <div className="participants-modal-footer">
            <button className="participants-modal-close-footer-btn" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 알림 발송 모달 */}
      {showNotificationModal && (
        <NotificationSendModal
          productId={productId}
          productName={productName}
          onClose={() => setShowNotificationModal(false)}
          onSend={handleSendNotification}
        />
      )}
    </>
  );
};

export default ParticipantsModal;