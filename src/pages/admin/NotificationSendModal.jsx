import React, { useState } from 'react';
import './NotificationSendModal.css';

const NotificationSendModal = ({ productId, productName, onClose, onSend }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    onSend({ title, content });
  };

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div className="notification-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* 헤더 */}
        <div className="notification-modal-header">
          <h2>알림 발송하기</h2>
          <button className="notification-modal-close-btn" onClick={onClose}>×</button>
        </div>

        {/* 바디 */}
        <div className="notification-modal-body">
          
          {/* 공구명 표시 */}
          <div className="notification-modal-field">
            <label>공구 상품</label>
            <div className="notification-modal-product-info">
              <strong>{productName}</strong> (ID: {productId})
            </div>
          </div>

          {/* 제목 */}
          <div className="notification-modal-field">
            <label>제목 *</label>
            <input 
              type="text"
              placeholder="알림 제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="notification-modal-input"
              maxLength={100}
            />
          </div>

          {/* 내용 */}
          <div className="notification-modal-field">
            <label>내용 *</label>
            <textarea 
              placeholder="발송할 알림의 상세 내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="notification-modal-textarea"
              rows={6}
              maxLength={500}
            />
            <small className="notification-modal-hint">
              {content.length}/500자
            </small>
          </div>

        </div>

        {/* 푸터 */}
        <div className="notification-modal-footer">
          <button 
            className="notification-modal-btn secondary" 
            onClick={onClose}
          >
            취소
          </button>
          <button 
            className="notification-modal-btn primary" 
            onClick={handleSend}
          >
            발송
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSendModal;