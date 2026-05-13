# Quarkus 프로젝트 — League of Legends 클론 (학번: 이름)

자바웹프로그래밍 수업의 주차별 실습 결과물을 정리한 저장소.

기술 스택: **Quarkus + Hibernate ORM Panache + MySQL + Bootstrap 5**

## 주차별 수업 내용

### 2주차 — Quarkus 환경 구축 & HTML 기본
- Quarkus dev 모드 실행 및 정적 리소스 서빙 구조 이해
- `META-INF/resources/index.html`로 LoL 메인 화면 초안 제작 (Bootstrap 도입)

### 3주차 — 챔피언 카드 & 모달
- 아트록스 카드 리디자인, 부트스트랩 모달로 상세 페이지 분리
- DevServices 비활성화로 Windows PATH 이슈 우회 (`quarkus.oidc.devservices.enabled=false`)

### 4주차 — 다운로드 페이지 & JS 로컬화
- LoL 스타일 다운로드 히어로 섹션 (Jinx 스플래시 배경, 황금 그라데이션 버튼)
- Bootstrap JS 번들을 로컬로 옮겨 CDN 의존도 감소

### 7주차 — 검색 기능
- 네비바 검색 폼 → `#searchResults` 섹션 토글
- 카테고리 사이드바(챔피언/뉴스), `switchCategory()` JS 로직, 키워드 헤더 표시

### 9주차 — JS 기능 추가 + MySQL 연동
- 다크/라이트 모드 토글 (`toggle.js` + `body.light-mode` CSS)
- DB 전환: H2 → **MySQL** (`quarkus-jdbc-mysql`, `quarkus-rest-jackson` 의존성, `jdbc:mysql://localhost:3306/lol`)
- `Champion` 엔티티 + `ChampionResource` REST API + `DataSeeder`로 11명 챔피언 시드
- 확인 URL: <http://localhost:8080/champions>, Dev UI Database View

### 10주차 — 로그인 / 로그아웃
- `org.acme.login` 패키지: `User` (PanacheEntity), `AuthResource`, `SessionConfig`
- 흐름: `/login` (GET, login.html 반환) → `/login_check` (POST, DB 검증, 세션 저장) → `/after_login` (세션 체크) → `/logout` (세션 파기)
- 임시 계정: `guest / 123123` (DataSeeder)
- Vert.x `SessionHandler` + `LocalSessionStore` (1시간 timeout, HttpOnly 쿠키)
- 추가 과제: 로그인/회원 페이지에도 다크/라이트 토글 & 동일 네비바 적용

## 실행 방법

1. MySQL 8.x 설치 후 root 계정 비밀번호를 `123123`으로 설정
2. MySQL CLI에서 `CREATE DATABASE lol;`
3. `mvn quarkus:dev` 실행 → <http://localhost:8080/>
4. Dev UI: <http://localhost:8080/q/dev/>

## 디렉토리 구조

```
src/main/
├── java/org/acme/
│   ├── Champion.java              # 챔피언 엔티티
│   ├── ChampionResource.java      # /champions REST API
│   ├── GreetingResource.java
│   ├── StartWebSocket.java
│   ├── common/DataSeeder.java     # 초기 데이터 시드 (guest 계정 + 챔피언 11명)
│   └── login/
│       ├── User.java              # 사용자 엔티티
│       ├── AuthResource.java      # 로그인/로그아웃 엔드포인트
│       └── SessionConfig.java     # Vert.x 세션 핸들러 등록
└── resources/
    ├── application.properties     # MySQL 연결 정보
    └── META-INF/resources/
        ├── index.html             # 메인 페이지
        ├── css/main.css           # 공통 스타일 + 라이트 모드
        ├── js/
        │   ├── test.js            # 검색 기능
        │   └── toggle.js          # 다크/라이트 모드 토글
        ├── login/                 # 로그인 / 로그인 완료 페이지
        ├── main_page_sub/         # 다운로드 페이지
        └── modals/                # 챔피언 상세 모달
```
