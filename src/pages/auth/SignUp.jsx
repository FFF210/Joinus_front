import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myAxios } from '../../config';
import './SignUp.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    email: '',
    address: '',
    detailAddress: '',
    referrer: '',  // 추천인 ID
    agreeMarketing: false  // 체크박스는 boolean
  });
  
  // 아이디 중복 확인 상태
  const [userIdChecked, setUserIdChecked] = useState(false);  // 중복 확인 했는지
  const [userIdAvailable, setUserIdAvailable] = useState(null);  // 사용 가능한지
  const [userIdMessage, setUserIdMessage] = useState('');  // 메시지
  const [isCheckingUserId, setIsCheckingUserId] = useState(false);  // 중복 확인 중인지

  // 입력 필드 변경 핸들러 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // 아이디 변경 시 중복 확인 상태 초기화
    if (name === 'userId') {
      setUserIdChecked(false);
      setUserIdAvailable(null);
      setUserIdMessage('');
    }
  };

  // 아이디 중복 확인 함수
  const handleCheckUserId = async () => {
    if (!formData.userId.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }

    setIsCheckingUserId(true);
    try {
      const response = await myAxios().post('/doubleUsername', {
        username: formData.userId
      });

      const exist = response.data; // true면 이미 존재, false면 사용 가능
      setUserIdChecked(true);
      setUserIdAvailable(!exist); // exist가 false면 사용 가능
      setUserIdMessage(exist ? '이미 사용 중인 아이디입니다.' : '사용 가능한 아이디입니다.');
    } catch (error) {
      console.error('아이디 중복 확인 실패:', error);
      alert('아이디 중복 확인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsCheckingUserId(false);
    }
  };

  // 주소 찾기 버튼 클릭 핸들러 (나중에 API 연동)
  const handleAddressSearch = () => {
    // TODO: 다음 우편번호 API 연동
    console.log('주소 찾기 클릭');
    // 임시로 알림만 표시
    alert('주소 찾기 기능은 백엔드 연동 시 구현됩니다.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 아이디 중복 확인 검증
    if (!userIdChecked || !userIdAvailable) {
      alert('아이디 중복 확인을 해주세요.');
      return;
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await myAxios().post('/join', {
        username: formData.userId, // userId → username (아이디)
        name: formData.name, // name (이름)
        nickname: formData.nickname, // nickname (닉네임)
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || null,
        detailAddress: formData.detailAddress || null,
        recommenderUsername: formData.referrer || null,
      });

      const data = response.data;
      console.log('회원가입 성공:', data);
      //  추천인 여부에 따라 다른 메시지
    if (formData.referrer && formData.referrer.trim()) {
      alert('회원가입이 완료되었습니다.\n회원가입 기념(1000P) + 추천인 기입 보너스(500P)로 1500포인트 지급되었습니다! 🎉');
    } else {
      alert('회원가입이 완료되었습니다.\n회원가입 기념 1000포인트 지급되었습니다! 🎉');
    }
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="signup-title">회원가입</h1>
        <p className="signup-subtitle">필수 정보를 입력하여 공동구매 서비스를 이용해 보세요.</p>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* 아이디 */}
          <div className="form-group">
            <label htmlFor="userId" className="form-label">아이디</label>
            <div className="user-id-input-wrapper">
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
              <button
                type="button"
                className="check-button"
                onClick={handleCheckUserId}
                disabled={isCheckingUserId || !formData.userId.trim()}
              >
                {isCheckingUserId ? '확인 중...' : '중복 확인'}
              </button>
            </div>
            {userIdChecked && (
              <span className={`user-id-message ${userIdAvailable ? 'success' : 'error'}`}>
                {userIdMessage}
              </span>
            )}
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="이름"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 닉네임 */}
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

          {/* 비밀번호 */}
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

          {/* 비밀번호 확인 */}
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

          {/* 연락처 */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">연락처</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              placeholder="01012345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* 이메일 */}
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

          {/* 주소 */}
          {/* <div className="form-group">
            <label htmlFor="address" className="form-label">주소</label>
            <div className="address-input-wrapper">
              <input
                type="text"
                id="address"
                name="address"
                className="form-input address-input"
                placeholder="기본 주소"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="address-search-button"
                onClick={handleAddressSearch}
              >
                주소 찾기
              </button>
            </div>
          </div> */}

          {/* 상세주소 */}
          {/* <div className="form-group">
            <label htmlFor="detailAddress" className="form-label">상세주소</label>
            <input
              type="text"
              id="detailAddress"
              name="detailAddress"
              className="form-input full-width"
              placeholder="상세주소"
              value={formData.detailAddress}
              onChange={handleChange}
            />
          </div> */}

          {/* 성별 */}
          {/* <div className="form-group">
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
          </div> */}

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

