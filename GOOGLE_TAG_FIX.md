# Google Tag Assistant 감지 문제 해결 가이드

## 문제 원인

Google Tag Assistant가 태그를 감지하지 못하는 주요 원인:

1. **Consent Mode의 `wait_for_update` 지연**
   - 태그 로드 전에 Assistant가 검사를 완료할 수 있음
   - 동의 전 태그 초기화 문제

2. **조건부 태그 로딩**
   - `gtag('config', ...)`가 클라이언트 조건문 안에 있어서
   - 서버 렌더링 시점에 태그가 제대로 초기화되지 않음

3. **스크립트 로딩 순서**
   - Consent Mode 설정이 태그 초기화 전에 완료되지 않음

## 해결 방법

### 변경 사항

1. **태그는 항상 로드** (Google Tag Assistant 감지를 위해)
   - Consent Mode로 데이터 수집만 제어
   - 태그 자체는 항상 초기화

2. **`gtag('config', ...)` 항상 실행**
   - 태그가 항상 감지되도록 보장
   - `send_page_view: false`로 동의 전 데이터 전송 방지

3. **동의 후 페이지뷰 전송**
   - 동의 시 `send_page_view: true`로 변경
   - 현재 페이지 뷰 전송

## 테스트 방법

### 1. Google Tag Assistant로 확인

1. **배포된 사이트 접속**
   - https://alphabet-explorers-1kv2ml5wp-limdongkyus-projects.vercel.app

2. **Google Tag Assistant 실행**
   - Chrome 확장 프로그램: "Tag Assistant Legacy"
   - 또는 Google Tag Assistant 웹사이트 사용

3. **확인 사항**:
   - ✅ Google Analytics 태그 감지됨
   - ✅ 측정 ID: `G-7NMEJZVEB1`
   - ✅ Consent Mode 설정 확인

### 2. 브라우저 개발자 도구로 확인

**Console 탭:**
```javascript
// 태그 확인
console.log('gtag:', typeof window.gtag); // 'function'이어야 함
console.log('dataLayer:', window.dataLayer.length); // 0보다 커야 함
```

**Network 탭:**
- 필터: `gtag` 또는 `analytics`
- 다음 요청 확인:
  - `https://www.googletagmanager.com/gtag/js?id=G-7NMEJZVEB1`
  - `https://www.google-analytics.com/g/collect?...` (동의 후)

### 3. Google Analytics 실시간 보고서

1. https://analytics.google.com/ 접속
2. 보고서 → 실시간
3. 페이지 새로고침 시 실시간 사용자 증가 확인

## 동의 전/후 동작

### 동의 전 (기본 상태)

- ✅ Google Analytics 태그 로드됨 (감지 가능)
- ✅ `gtag()` 함수 사용 가능
- ❌ 데이터 수집 안 함 (`analytics_storage: 'denied'`)
- ❌ 페이지뷰 전송 안 함 (`send_page_view: false`)

### 동의 후

- ✅ Google Analytics 태그 로드됨
- ✅ `gtag()` 함수 사용 가능
- ✅ 데이터 수집 시작 (`analytics_storage: 'granted'`)
- ✅ 페이지뷰 전송 시작 (`send_page_view: true`)

## 배포 확인 체크리스트

배포 후 확인해야 할 사항:

- [ ] Google Tag Assistant에서 태그 감지됨
- [ ] 개발자 도구 Console에서 `window.gtag` 함수 존재
- [ ] Network 탭에서 gtag.js 스크립트 로드 확인
- [ ] 동의 전: Analytics 요청이 전송되지 않음
- [ ] 동의 후: Analytics 요청이 전송됨
- [ ] Google Analytics 실시간 보고서에서 방문자 확인

## 문제가 계속되면

### 추가 확인 사항

1. **브라우저 확장 프로그램 비활성화**
   - 광고 차단기 (uBlock, AdBlock 등)
   - 개인정보 보호 확장 프로그램

2. **시크릿 모드에서 테스트**
   - 확장 프로그램 영향 제거

3. **캐시 클리어**
   - 브라우저 캐시 삭제
   - Vercel 배포 캐시 확인

4. **다른 브라우저에서 테스트**
   - Chrome, Firefox, Safari 등

### 로그 확인

**Console에서 실행:**
```javascript
// 전체 상태 확인
console.log('=== Google Analytics 상태 ===');
console.log('gtag:', typeof window.gtag);
console.log('dataLayer:', window.dataLayer);
console.log('동의 상태:', localStorage.getItem('cookie-consent'));

if (window.gtag) {
  window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
    console.log('Analytics Storage:', value);
  });
}
```

## 참고

- Google Tag Assistant는 태그가 로드되어야 감지 가능
- Consent Mode는 데이터 수집만 제어 (태그 자체는 항상 로드)
- 동의 전에도 태그는 로드되지만 데이터는 전송되지 않음

