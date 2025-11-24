import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: '',
    gender: '',
    agreeMarketing: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입:', formData);
    // 회원가입 로직
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">회원가입</h1>
        <p className="signup-subtitle">필수 정보를 입력하여 공동구매 서비스를 이용해 보세요.</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* 아이디 & 닉네임 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="userId" className="form-label">아이디</label>
              <input
                type="text"
                id="userId"
                name="userId"
                className="form-input"
                placeholder="아이디"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nickname" className="form-label">닉네임</label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="form-input"
                placeholder="닉네임"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 비밀번호 & 비밀번호 확인 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm" className="form-label">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                className="form-input"
                placeholder="비밀번호 확인"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 연락처 & 이메일 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">연락처</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* 주소 */}
          <div className="form-group">
            <label htmlFor="address" className="form-label">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              placeholder="기본 주소"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* 상세주소 & 성별 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="detailAddress" className="form-label">상세주소</label>
              <input
                type="text"
                id="detailAddress"
                name="detailAddress"
                className="form-input"
                placeholder="상세주소"
                value={formData.detailAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">성별</label>
              <div className="gender-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="남성"
                    checked={formData.gender === '남성'}
                    onChange={handleChange}
                  />
                  <span>남성</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="여성"
                    checked={formData.gender === '여성'}
                    onChange={handleChange}
                  />
                  <span>여성</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="선택 안 함"
                    checked={formData.gender === '선택 안 함'}
                    onChange={handleChange}
                  />
                  <span>선택 안 함</span>
                </label>
              </div>
            </div>
          </div>

          {/* 추천인 ID */}
          <div className="form-group">
            <label htmlFor="referrer" className="form-label">추천인 ID (선택)</label>
            <input
              type="text"
              id="referrer"
              name="referrer"
              className="form-input"
              placeholder="추천인의 아이디 입력"
              onChange={handleChange}
            />
          </div>

          {/* 버튼들 */}
          <div className="form-buttons">
            <button type="submit"
             className="submit-button"
             >
              완료
            </button>
            {/* <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/login')}
            >
              취소 / 로그인 화면으로
            </button> */}
          </div>

          {/* 로그인 링크 */}
          <div className="login-prompt">
            <span>이미 회원이신가요?</span>
            <a href="/login" className="login-link" onClick={() => navigate('/login')}>로그인 하러 가기</a>
          </div>
        </form>
      </div>
    </div>
  );
}

