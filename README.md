# 챙김 랜딩사이트

정부 혜택 탐색과 신청 준비 과정을 소개하는 모바일 PWA 프로젝트 랜딩사이트입니다.

챙김 랜딩사이트는 단순 기술 설명형 포트폴리오가 아니라, 실제 앱 화면 캡쳐를 중심으로 서비스 가치, 사용자 흐름, AI 추천 설계 원칙, 기술 구조, UX 개선 내용을 순서대로 보여주는 프로덕트형 케이스스터디 페이지입니다.

> 챙김은 자격 여부나 실제 신청 가능 여부를 보장하지 않습니다.  
> 최종 확인과 신청은 공식 기관 사이트에서 진행해야 합니다.

## Links

| 구분 | 링크 |
| --- | --- |
| Landing Demo | 준비 중 |
| App Demo | 준비 중 |
| GitHub | 준비 중 |
| README | 준비 중 |

## Preview

배포 후 랜딩사이트 대표 이미지를 추가할 예정입니다.

```md
![챙김 랜딩사이트 미리보기](./src/assets/images/preview.png)
```

## 프로젝트 개요

챙김은 나에게 맞는 정부 혜택을 찾고, 관심 혜택의 신청 준비 상태와 마감 일정을 한 곳에서 관리하는 모바일 앱형 PWA를 목표로 한 프로젝트입니다.

이 랜딩사이트는 챙김 앱의 기획 의도와 실제 구현 결과를 포트폴리오 관점에서 설명하기 위해 제작했습니다.

주요 전달 내용은 다음과 같습니다.

- 정부 혜택 정보가 여러 기관 사이트에 흩어져 있어 사용자가 직접 조건과 마감일을 확인해야 하는 문제
- 홈, 혜택 상세, 프로필 설정, 맞춤 추천, 신청 보드, 신청 일정으로 이어지는 사용자 여정
- AI가 자격을 판정하지 않고 추천 이유를 설명하는 보조 도구로만 동작하도록 제한한 설계
- 실제 앱 캡쳐본 기반의 화면 쇼케이스
- React, TypeScript, Tailwind CSS, Framer Motion 기반의 반응형 프로덕트 랜딩 구현
- 사용자 흐름, 기술 구조, UX 개선 히스토리를 함께 보여주는 케이스스터디 구성

## 주요 섹션

### 1. Hero

첫 화면에서는 큰 카피와 실제 홈 화면 목업으로 챙김의 서비스 가치를 먼저 전달합니다.

주요 구성:

- 앱 이름과 핵심 카피
- 홈 화면 iPhone 목업
- 추천 혜택, 마감 임박, 내 신청 보드 숫자 요약
- 주요 CTA 버튼
- React, TypeScript, PWA, Gemini API 등 기술 배지

핵심 카피:

```txt
놓치기 쉬운 정부 혜택,
이제 챙김이 정리해드릴게요.
```

### 2. 한눈에 보는 챙김

챙김이 제공하는 핵심 가치를 3개의 카드로 정리했습니다.

| 기능 | 설명 |
| --- | --- |
| 혜택 찾기 | 흩어진 정부 혜택을 카테고리와 검색으로 탐색합니다. |
| 신청 준비 | 관심 혜택을 저장하고 준비 상태와 체크리스트를 관리합니다. |
| 일정 관리 | 마감일이 있는 혜택을 D-Day 기준으로 확인합니다. |

### 3. WHY

정부 혜택 탐색 과정에서 사용자가 겪는 문제를 설명합니다.

주요 문제:

- 혜택 정보가 여러 기관 사이트에 흩어져 있음
- 내 조건과 맞는 혜택인지 판단하기 어려움
- 관심 혜택을 저장해도 신청 준비 상태를 관리하기 어려움
- 신청기한과 준비 서류를 놓치기 쉬움
- AI 추천이 자격 판정처럼 오해될 수 있음

핵심 문장:

```txt
혜택은 많지만,
내게 필요한 혜택은 찾기 어렵습니다.
```

### 4. Core Feature Sticky Showcase

데스크톱에서는 우측 iPhone 목업이 sticky로 고정되고, 좌측 기능 설명이 화면에 진입할 때마다 앱 화면이 전환되도록 구성했습니다.

모바일에서는 sticky 구조를 제거하고, 각 기능 설명 아래에 실제 앱 캡쳐 이미지를 배치했습니다.

주요 기능:

- 내 조건에 맞는 혜택을 먼저 확인
- 혜택 상세에서 지원 내용과 신청 방법 확인
- 관심 혜택을 신청 보드에서 관리
- 마감일을 일정 화면에서 확인

### 5. Screens Showcase

실제 챙김 PWA에서 캡쳐한 핵심 화면을 사용자 여정 순서대로 정리했습니다. 좌측의 화면 카드를 선택하면 우측 iPhone 목업에 해당 실제 앱 화면 캡쳐가 표시됩니다.

| 라벨 | 화면 | 설명 |
| --- | --- | --- |
| A | 홈 | 추천 혜택, 마감 임박, 내 신청 보드 현황을 한눈에 보여주는 대시보드 |
| B | 혜택 상세 | 공공데이터의 긴 설명을 사용자 질문형 구조로 재구성한 상세 화면 |
| C | 프로필 설정 | 조건 매칭 추천을 위한 기본 정보를 입력하는 화면 |
| D | 맞춤 추천 | 조건 매칭 점수와 추천 이유를 확인하는 화면 |
| E | 신청 보드 | 저장한 혜택의 신청 준비 상태와 체크리스트를 관리하는 화면 |
| F | 신청 일정 | 저장한 혜택의 신청기한을 일정 형태로 확인하는 화면 |

Screens Showcase는 코드로 화면을 재현한 시뮬레이터가 아니라, 실제 챙김 PWA 화면 캡쳐본을 기반으로 구성했습니다.

### 6. User Journey / AI Principle

사용자 여정과 AI 추천 설계 원칙을 단계형 카드와 연결선 애니메이션으로 표현했습니다.

사용자 여정:

```txt
홈에서 추천 혜택 확인
  ↓
혜택 상세에서 대상/지원내용 확인
  ↓
관심 혜택 저장
  ↓
신청 보드에서 준비 상태 관리
  ↓
신청 일정에서 마감일 확인
  ↓
공식 사이트에서 최종 신청
```

AI 추천 설계 원칙:

```txt
사용자 프로필 입력
  ↓
Backend Rule-based Scoring
  ↓
조건 매칭 점수 계산
  ↓
Gemini API 추천 이유 생성
  ↓
참고용 추천 결과 제공
  ↓
공식 기관 사이트에서 최종 확인
```

핵심 원칙:

```txt
AI는 판단자가 아니라,
이해를 돕는 설명 도구로 사용했습니다.
```

### 7. Tech Architecture

챙김 랜딩사이트에서는 앱의 기술 구조도 함께 설명합니다.

```txt
Frontend
React / TypeScript / Tailwind CSS / Zustand
  ↓
HTTP Client
Axios 기반 API 요청
  ↓
Backend API
Express / TypeScript / JWT Middleware
  ↓
Business Logic
Auth / Benefits / SavedBenefits / Profile / AI Recommendation
  ↓
Database
Prisma / MySQL
  ↓
External API
GOV24 Public Data API / Gemini API
```

### 8. UX Improvements

실제 앱 화면을 보며 발견한 UX 문제와 개선 내용을 정리했습니다.

| 개선 항목 | Before | After |
| --- | --- | --- |
| 혜택 상세 | 공공데이터 원문 중심 | 사용자 질문형 정보 구조 |
| AI 추천 점수 | 추천 점수 | 조건 매칭 점수 |
| 비회원 마이페이지 | 0건 / 설정 완료 / 설정됨처럼 실제 값처럼 보임 | 로그인 후 확인 / 로그인 후 설정 / 로그인 후 관리 |
| 회원가입 | 단순 입력 폼 | 실시간 검증, 약관 동의, 버튼 비활성화, 중복 요청 방지 |
| 모달/토스트 | 앱 컨테이너 밖으로 벗어남 | max-width 430px 기준으로 오버레이 정렬 |

### 9. Design System

챙김은 정부 혜택 정보를 다루는 서비스이기 때문에, 신뢰감과 안정감을 주는 블루 기반 디자인 시스템을 사용했습니다.

Brand Colors:

| 역할 | 색상 | HEX |
| --- | --- | --- |
| Primary | Chaengim Blue | `#5B78F0` |
| Background | App Background | `#F6F7FB` |
| Surface | Card White | `#FFFFFF` |
| Text Primary | Main Text | `#2F3441` |
| Text Secondary | Sub Text | `#8B909E` |
| Border | Default Border | `#ECEEF5` |

Components:

- Primary Button
- Secondary Button
- Benefit Card
- Status Badge
- Input
- Bottom Navigation
- Modal
- BottomSheet
- Toast
- Empty State
- iPhone Mockup
- Screen Selection Card

Interactions:

- Button tap scale
- Page fade-up
- Section reveal
- Card stagger reveal
- Sticky phone transition
- Toast motion
- Count-up number
- Flowchart node reveal

## 적용한 인터랙션

챙김 랜딩사이트의 모션은 사용자의 시선을 자연스럽게 유도하는 데 집중했습니다.

공공서비스 성격에 맞지 않는 과한 3D 회전이나 bounce 효과는 사용하지 않고, transform과 opacity 기반의 가벼운 인터랙션만 적용했습니다.

- Hero 텍스트 fade-up
- iPhone 목업 floating
- 섹션별 scroll reveal
- 카드 stagger reveal
- A~F 화면 선택 전환
- Sticky phone showcase
- 주요 숫자 count-up
- Flowchart 노드/연결선 순차 등장
- CTA 버튼 tap/hover 미세 인터랙션
- prefers-reduced-motion 대응

## 핵심 구현 포인트

### 실제 앱 화면 캡쳐 기반 Showcase

랜딩사이트의 앱 화면은 임의로 재현한 UI가 아니라, 실제 챙김 PWA에서 캡쳐한 화면 이미지를 사용했습니다.

이를 통해 포트폴리오 검토자가 실제 앱 화면과 랜딩사이트의 설명을 함께 확인할 수 있도록 구성했습니다.

### Sticky Phone Showcase

데스크톱 환경에서는 기능 설명이 스크롤될 때 우측 iPhone 목업이 고정되고, 현재 기능에 맞는 앱 화면이 자연스럽게 전환되도록 구현했습니다.

모바일 환경에서는 sticky 구조를 제거하고 각 기능 설명 아래에 실제 화면 이미지를 배치해 사용성을 유지했습니다.

### Screens Showcase A~F 전환

A~F 화면 카드를 클릭하면 선택 상태가 변경되고, 우측 iPhone 목업에 해당 화면 이미지가 표시되도록 구현했습니다.

선택된 카드는 blue border와 shadow로 강조하고, 이미지 전환은 Framer Motion 기반 fade transition으로 처리했습니다.

### Count-up Number

Hero와 주요 데이터 영역의 숫자에 count-up 애니메이션을 적용했습니다.

예시:

- 추천 혜택 3건
- 마감 임박 2건
- 내 신청 보드 2건
- 핵심 화면 6개

`prefers-reduced-motion` 환경에서는 애니메이션 없이 최종 숫자를 바로 표시합니다.

### AI 추천 표현 제한

챙김의 AI 추천은 자격 판정이나 수급 가능성 보장이 아니라, 조건 매칭 결과를 이해하기 쉽게 설명하는 보조 흐름으로 표현했습니다.

추천 후보는 백엔드의 Rule-based Scoring으로 계산하고, Gemini API는 추천 이유 생성에만 사용하는 구조를 설명했습니다.

## 접근성 대응

- 화면 선택 카드는 `button` 요소로 구성
- 선택 상태는 `aria-selected`로 표시
- CTA에는 `focus-visible` ring 제공
- 모션 민감 사용자를 위해 `prefers-reduced-motion` 대응
- 모바일에서는 sticky/parallax 효과를 줄여 사용성 유지

## 기술 스택

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- lucide-react

### 개발 도구

- ESLint
- TypeScript project references
- Vite production build

## 폴더 구조

현재 랜딩사이트의 주요 구현은 `src/App.tsx`에 통합되어 있습니다.

```txt
src/
  App.tsx
  App.css
  index.css
  main.tsx
  assets/
    images/
      app_icon.png
      hero_banner.png
      screens/
        home.png
        detail.png
        profile.png
        recommend.png
        board.png
        schedule.png
```

기능이 더 커질 경우 다음처럼 컴포넌트와 상수 파일을 분리할 수 있습니다.

```txt
src/
  components/
    AppMockup.tsx
    CountUpNumber.tsx
    RevealSection.tsx
    ScreensShowcase.tsx
    StickyPhoneShowcase.tsx
    Flowchart.tsx
  constants/
    motion.ts
    appScreens.ts
```

## 실제 앱 화면 캡쳐

랜딩에 사용한 화면은 `src/assets/images/screens`에 저장되어 있습니다.

| 파일명 | 화면 |
| --- | --- |
| `home.png` | 홈 |
| `detail.png` | 혜택 상세 |
| `profile.png` | 맞춤 프로필 설정 |
| `recommend.png` | AI 맞춤 추천 |
| `board.png` | 신청 보드 |
| `schedule.png` | 신청 일정 |

## 실행 방법

### 사전 준비

- Node.js 20+
- npm

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

기본 Vite 개발 서버:

```txt
http://localhost:5173
```

## 검증 명령

```bash
npm run lint
npm run build
```

최근 확인 결과:

- `npm run lint` 통과
- `npm run build` 통과

## 구현 시 고려한 점

### 사용자 가치 우선 구조

초반부는 기술 설명보다 “무엇을 해결하는 서비스인지”를 먼저 보여주도록 구성했습니다.

기술 구조와 UX 개선 내역은 후반부에 배치해 포트폴리오 검토자가 서비스 가치와 구현 근거를 자연스럽게 따라갈 수 있도록 했습니다.

### 실제 화면 중심 구성

랜딩사이트의 앱 화면은 실제 챙김 PWA 캡쳐본을 사용했습니다.

이를 통해 랜딩사이트가 단순 디자인 시안이 아니라 실제 구현된 앱을 소개하는 포트폴리오 페이지임을 보여줍니다.

### AI 추천 책임 범위 분리

AI 추천은 자격 판정이나 수급 보장이 아니라, 조건 매칭 결과를 이해하기 쉽게 설명하는 보조 도구로 표현했습니다.

정부 혜택 관련 서비스 특성상 사용자가 AI 추천을 최종 판단으로 오해하지 않도록 “공식 기관 사이트에서 최종 확인” 문구를 유지했습니다.

### 반응형과 접근성

- 모바일에서는 sticky phone 구조를 사용하지 않습니다.
- 클릭형 화면 선택 카드는 `button` 요소와 `aria-selected`를 사용합니다.
- CTA는 `focus-visible` ring을 제공합니다.
- `prefers-reduced-motion` 환경에서는 주요 애니메이션을 줄입니다.
- 모션은 transform과 opacity 중심으로 구성했습니다.

## 한계와 다음 단계

- 실제 서비스 운영 단계에서는 공식 데이터 최신성 검증, API 오류 대응, 실제 기기별 PWA QA가 추가로 필요합니다.
- GitHub, Demo, README CTA 링크는 실제 배포/저장소 URL 확정 후 교체가 필요합니다.
- 랜딩사이트는 서비스 소개용 웹페이지이며, 실제 정부 혜택 신청을 대행하지 않습니다.
- 챙김 앱은 자격 여부나 수급 가능성을 보장하지 않으며, 최종 확인과 신청은 공식 기관 사이트에서 진행해야 합니다.
- 추후 Service Worker, 설치 배너, Push Notification 등 PWA 고도화 내용을 별도 섹션으로 확장할 수 있습니다.

## 포트폴리오에서 강조할 점

챙김 랜딩사이트는 앱의 기능을 단순히 나열하는 페이지가 아니라, 다음 흐름을 보여주는 프로덕트형 케이스스터디입니다.

```txt
문제 정의
  ↓
서비스 가치 제안
  ↓
실제 앱 화면
  ↓
사용자 여정
  ↓
AI 추천 설계 원칙
  ↓
기술 아키텍처
  ↓
UX 개선 히스토리
  ↓
디자인 시스템
```

핵심 메시지:

```txt
챙김은 정부 혜택을 단순히 보여주는 앱이 아니라,
사용자가 혜택을 찾고, 저장하고,
신청 준비 상태와 마감 일정을 관리할 수 있도록 설계한
모바일 PWA 프로젝트입니다.
```
