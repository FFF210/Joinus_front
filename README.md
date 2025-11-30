
## 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 프로젝트 구조

```
admin-portal/
├── src/
│   ├── components/
│   │   ├── common/        # 공통 컴포넌트
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Table.jsx
│   │   └── layout/        # 레이아웃 컴포넌트
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── CS.jsx
│   │   ├── GroupBuy.jsx
│   │   └── MyPage.jsx
│   ├── constants/         # 상수 정의
│   │   ├── orderStatus.js
│   │   └── categories.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 주요 기능

- **대시보드**: 주문 통계 및 최근 주문 현황
- **주문 관리**: 주문 상태별 필터링 및 관리
- **CS 관리**: 고객 문의 카테고리별 관리
- **공구 관리**: 공동구매 진행 상황 모니터링
- **마이페이지**: 사용자 정보 관리

## 기술 스택

- React 18.3
- React Router DOM 6.30
- Vite 7.2
- JavaScript (ES6+)
