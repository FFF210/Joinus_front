# JOINus – Frontend

JOINus는 해외 공동구매 서비스의 정체성을 직관적으로 담은 이름으로,
*“함께 참여하고, 함께 구매한다”*는 의미를 전달하고자 지은 프로젝트명입니다.

## 🌍 해외 공동구매 웹 서비스

### 소비자 페이지
<img width="300" height="400" alt="스크린샷 2026-01-08 141803" src="https://github.com/user-attachments/assets/dff6e7bf-45da-4fe2-a5c6-11c950d96e2f" />
<img width="260" height="400" alt="스크린샷 2026-01-08 141850" src="https://github.com/user-attachments/assets/5a25378a-ca30-4c2f-a6ff-65a4b2fb9c56" />



### 관리자 페이지
<img width="320" height="480" alt="스크린샷 2026-01-08 142030" src="https://github.com/user-attachments/assets/5a7f7bc2-cb38-403c-babc-9298d3ac4bac" />
<img width="355" height="480" alt="스크린샷 2026-01-08 142113" src="https://github.com/user-attachments/assets/911aa1e7-698d-483d-b41f-fa5a3e866395" />

<img width="800" height="650" alt="스크린샷 2026-01-08 142006" src="https://github.com/user-attachments/assets/54f9da6a-b7b4-469c-8050-facc35c076a2" />



---

## 📌 프로젝트 소개

**JoinUs**는 사용자가 상품을 제안하고 투표를 통해 공동구매가 성사되는  
해외 공동구매 플랫폼 웹 서비스입니다.

본 저장소는 **React 기반 프론트엔드 SPA**로,  
소비자와 관리자가 사용하는 모든 화면과 사용자 인터랙션을 담당합니다.

- **개발 인원**: 4명  
- **개발 기간**: 2025.11 ~ 2025.12

---

## 👥 팀 구성 및 역할
<img width="1360" height="765" alt="image" src="https://github.com/user-attachments/assets/58ec43dd-46bb-4ac1-be0f-d0e3d0908224" />

---

## 🖥 주요 사용자 흐름
- 소비자: 공구 탐색 → 참여 → 주문/결제 → 배송 조회 → 리뷰 작성
- (원하는 공구 상품이 없을 시) 제안 탐색 및 제안 작성 → 투표 → 관리자 심사를 통해 공구 전환
- 관리자: 제안 심사 → 공구 등록 → 진행 상태 관리 → 주문/배송 처리

---

## 🛠 기술 스택 (Frontend)
<img width="1859" height="417" alt="image" src="https://github.com/user-attachments/assets/ec457568-6e65-411f-bc90-8978199c1e75" />

- React (SPA 기반 UI 구현)
- React Router (클라이언트 사이드 라우팅)
- Axios (REST API 통신)
- JavaScript (ES6+)

---

## 🎯 프론트엔드 구현 포인트

### 1. SPA 구조 및 라우팅 설계
- React Router를 활용한 소비자 / 관리자 영역 분리
- 공구 상태에 따라 접근 가능한 화면 제어

### 2. 관리자 중심의 복잡한 UI 구현
- 공구 등록/수정, 옵션 관리 등 복잡한 관리자 폼 구성
- 옵션 그룹/항목의 동적 추가·삭제
- 상태 변경에 따른 버튼/입력 영역 조건부 렌더링

### 3. 관리자용 가격 산정 보조 UI
- 공구 상품 등록 시 관리자의 가격 책정을 돕는 계산 보조 UI 구
- 원가/환율/배송비/인원/수수료 등 입 기반으로 참고용 예상 가격 계산
- 가격 구성 요소를 단계별로 시각화하여 이해도 향상

### 4. API 연동 및 비동기 처리
- Axios 기반 REST API 연동
- 조회 조건(페이지네이션, 필터링, 정렬)에 따른 UI 상태 관리
- 알림 목록 조회 및 읽음 처리 UI 구현

---

## 백엔드 연동
- Spring Boot 기반 REST API와 Axios로 통신
- API 응답 구조에 맞춰 화면 상태 분기 처리

🔗 [Backend Repository](https://github.com/FFF210/Joinus_back)


---
## ▶ 실행 방법

```bash
npm install
npm run dev
npm run build
