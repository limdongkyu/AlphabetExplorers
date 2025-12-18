# Google Analytics 및 동의 배너 테스트 가이드

## 1. Google Analytics 작동 확인 방법

### 방법 1: 브라우저 개발자 도구 (가장 빠른 방법)

#### Chrome/Edge 개발자 도구
1. **페이지 열기**: 웹사이트를 브라우저에서 엽니다
2. **개발자 도구 열기**: 
   - `F12` 또는 `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - 또는 우클릭 → "검사(Inspect)"
3. **Network 탭 확인**:
   - Network 탭 열기
   - 페이지 새로고침 (`F5` 또는 `Cmd+R`)
   - 필터에 `gtag` 또는 `analytics` 입력
   - 다음 요청이 보이면 Analytics가 작동 중:
     - `https://www.googletagmanager.com/gtag/js?id=G-7NMEJZVEB1`
     - `https://www.google-analytics.com/g/collect?...`
4. **Console 탭 확인**:
   - Console 탭 열기
   - 다음 명령어 입력하여 확인:
     ```javascript
     // dataLayer 확인
     console.log(window.dataLayer);
     
     // gtag 함수 확인
     console.log(typeof window.gtag);
     
     // Analytics 설정 확인
     window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
       console.log('Analytics Storage:', value);
     });
     ```

#### Safari 개발자 도구
1. Safari → 환경설정 → 고급 → "메뉴 막대에서 개발자용 메뉴 보기" 체크
2. 개발자 도구 열기 (`Cmd+Option+I`)
3. Network 탭에서 `gtag` 또는 `analytics` 검색

### 방법 2: Google Analytics 실시간 보고서 확인

1. **Google Analytics 계정 접속**:
   - https://analytics.google.com/ 접속
   - 해당 속성 선택 (G-7NMEJZVEB1)

2. **실시간 보고서 확인**:
   - 왼쪽 메뉴 → 보고서 → 실시간
   - 실시간 개요 클릭
   - 페이지를 새로고침하면 실시간으로 방문자 수가 증가해야 함

3. **확인 사항**:
   - 실시간 사용자: 1명 이상 표시 (본인 방문)
   - 최근 30분 이벤트: 페이지 조회 이벤트 표시
   - 페이지 조회: 현재 페이지 URL 표시

### 방법 3: Google Tag Assistant 사용 (Chrome 확장 프로그램)

1. **Chrome 웹 스토어에서 설치**:
   - "Google Tag Assistant Legacy" 검색 및 설치
   - 또는 "Google Tag Assistant" 설치

2. **사용 방법**:
   - 확장 프로그램 아이콘 클릭
   - "Enable" 클릭
   - 페이지 새로고침
   - Analytics 태그가 감지되면 녹색으로 표시됨

3. **확인 사항**:
   - Google Analytics 태그가 녹색으로 표시
   - 측정 ID가 `G-7NMEJZVEB1`로 표시
   - 에러가 없으면 정상 작동

### 방법 4: Chrome DevTools Application 탭

1. 개발자 도구 열기 (`F12`)
2. **Application 탭** 클릭
3. **Cookies** → 현재 도메인 선택
4. 다음 쿠키가 있으면 Analytics 작동 중:
   - `_ga` (Google Analytics 쿠키)
   - `_ga_7NMEJZVEB1` (측정 ID별 쿠키)
   - `_gid` (세션 쿠키)

### 방법 5: 코드로 직접 확인

브라우저 Console에서 다음 코드 실행:

```javascript
// 1. dataLayer 확인
console.log('DataLayer:', window.dataLayer);

// 2. gtag 함수 확인
console.log('gtag function:', typeof window.gtag);

// 3. Analytics 설정 확인
if (window.gtag) {
  window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
    console.log('✅ Analytics Storage Status:', value);
  });
  
  window.gtag('get', 'G-7NMEJZVEB1', 'ad_storage', (value) => {
    console.log('✅ Ad Storage Status:', value);
  });
}

// 4. 테스트 이벤트 전송
if (window.gtag) {
  window.gtag('event', 'test_event', {
    event_category: 'test',
    event_label: 'Analytics Test'
  });
  console.log('✅ Test event sent!');
}
```

---

## 2. 동의 배너 확인 방법

### 방법 1: localStorage 초기화 (가장 간단)

1. **브라우저 Console 열기** (`F12` → Console 탭)
2. **다음 명령어 실행**:
   ```javascript
   // 동의 상태 삭제
   localStorage.removeItem('cookie-consent');
   localStorage.removeItem('cookie-consent-date');
   
   // 페이지 새로고침
   location.reload();
   ```
3. **결과 확인**: 페이지 하단에 동의 배너가 표시되어야 함

### 방법 2: 브라우저 쿠키 및 저장소 삭제

#### Chrome/Edge
1. 개발자 도구 열기 (`F12`)
2. **Application 탭** 클릭
3. **Local Storage** → 현재 도메인 선택
4. `cookie-consent` 및 `cookie-consent-date` 삭제
5. 페이지 새로고침

#### Safari
1. 개발자 도구 열기 (`Cmd+Option+I`)
2. **Storage 탭** 클릭
3. **Local Storage** → 도메인 선택
4. 항목 삭제 후 새로고침

### 방법 3: 시크릿/프라이빗 모드 사용

1. **시크릿/프라이빗 창 열기**:
   - Chrome: `Cmd+Shift+N` (Mac) / `Ctrl+Shift+N` (Windows)
   - Safari: `Cmd+Shift+N` (Mac)
   - Firefox: `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows)

2. **웹사이트 접속**: 시크릿 모드에서는 localStorage가 비어있으므로 배너가 표시됨

3. **주의**: 시크릿 모드에서는 확장 프로그램이 비활성화될 수 있음

### 방법 4: 코드로 강제 표시

브라우저 Console에서:

```javascript
// 동의 상태 삭제 및 배너 강제 표시
localStorage.removeItem('cookie-consent');
localStorage.removeItem('cookie-consent-date');

// React 컴포넌트가 마운트되도록 새로고침
location.reload();
```

---

## 3. 동의 상태별 Analytics 동작 확인

### 동의 전 상태 확인

1. **동의 상태 초기화** (위의 방법 1 참고)
2. **개발자 도구 Console에서 확인**:
   ```javascript
   // Analytics가 거부 상태인지 확인
   window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
     console.log('동의 전 Analytics Storage:', value); // 'denied'여야 함
   });
   ```
3. **Network 탭 확인**: Analytics 요청이 전송되지 않아야 함

### 동의 후 상태 확인

1. **동의 배너에서 "동의하고 계속하기" 클릭**
2. **페이지 새로고침 후 Console 확인**:
   ```javascript
   window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
     console.log('동의 후 Analytics Storage:', value); // 'granted'여야 함
   });
   ```
3. **Network 탭 확인**: Analytics 요청이 전송되어야 함
4. **Google Analytics 실시간 보고서**: 방문자 수가 증가해야 함

### 거부 후 상태 확인

1. **동의 배너에서 "거부" 클릭**
2. **Console 확인**:
   ```javascript
   window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
     console.log('거부 후 Analytics Storage:', value); // 'denied'여야 함
   });
   ```
3. **Network 탭**: Analytics 요청이 전송되지 않아야 함

---

## 4. 문제 해결 체크리스트

### Analytics가 작동하지 않을 때

- [ ] Google Analytics 측정 ID가 올바른지 확인 (`G-7NMEJZVEB1`)
- [ ] 브라우저에서 스크립트 차단이 없는지 확인
- [ ] 광고 차단 확장 프로그램 비활성화 (uBlock, AdBlock 등)
- [ ] 개발자 도구 Console에 에러가 없는지 확인
- [ ] Network 탭에서 `gtag` 스크립트가 로드되는지 확인
- [ ] 동의 상태 확인 (`localStorage.getItem('cookie-consent')`)

### 동의 배너가 표시되지 않을 때

- [ ] `CookieConsent` 컴포넌트가 `layout.tsx`에 추가되어 있는지 확인
- [ ] `localStorage`에 `cookie-consent` 키가 없는지 확인
- [ ] 브라우저 Console에 에러가 없는지 확인
- [ ] React 컴포넌트가 정상적으로 렌더링되는지 확인
- [ ] CSS에서 `z-index`가 충분히 높은지 확인 (50으로 설정됨)

### 동의 후에도 Analytics가 작동하지 않을 때

- [ ] 페이지 새로고침을 했는지 확인
- [ ] `localStorage`에 `cookie-consent: 'accepted'`가 저장되었는지 확인
- [ ] Consent Mode 설정이 올바른지 확인
- [ ] Network 탭에서 Analytics 요청이 전송되는지 확인

---

## 5. 빠른 테스트 스크립트

브라우저 Console에 붙여넣어 실행:

```javascript
// 전체 상태 확인 스크립트
console.log('=== Google Analytics 상태 확인 ===');

// 1. localStorage 확인
const consent = localStorage.getItem('cookie-consent');
const consentDate = localStorage.getItem('cookie-consent-date');
console.log('1. 동의 상태:', consent || '없음');
console.log('2. 동의 날짜:', consentDate || '없음');

// 2. gtag 함수 확인
console.log('3. gtag 함수:', typeof window.gtag);

// 3. dataLayer 확인
console.log('4. dataLayer:', window.dataLayer);

// 4. Analytics 설정 확인
if (window.gtag) {
  window.gtag('get', 'G-7NMEJZVEB1', 'analytics_storage', (value) => {
    console.log('5. Analytics Storage:', value);
  });
  window.gtag('get', 'G-7NMEJZVEB1', 'ad_storage', (value) => {
    console.log('6. Ad Storage:', value);
  });
} else {
  console.log('⚠️ gtag 함수가 없습니다!');
}

// 5. 쿠키 확인
console.log('7. Analytics 쿠키:', document.cookie.includes('_ga'));

// 6. 테스트 이벤트 전송
if (window.gtag && consent === 'accepted') {
  window.gtag('event', 'test_verification', {
    event_category: 'testing',
    event_label: 'Analytics Verification Test'
  });
  console.log('✅ 테스트 이벤트 전송 완료!');
}
```

---

## 6. 모바일 기기에서 확인하기

### iOS Safari
1. Safari에서 웹사이트 열기
2. 개발자 메뉴 활성화: 설정 → Safari → 고급 → 웹 검사기 활성화
3. Mac의 Safari에서 개발 → [기기 이름] → 페이지 선택
4. 위의 테스트 방법 동일하게 적용

### Android Chrome
1. Chrome에서 웹사이트 열기
2. USB 디버깅 활성화 (개발자 옵션)
3. PC에서 `chrome://inspect` 접속
4. 원격 디버깅 연결 후 테스트

---

## 7. 실제 배포 후 확인

### Vercel 배포 후
1. 배포된 URL 접속
2. 위의 방법 1 (개발자 도구)로 확인
3. Google Analytics 실시간 보고서 확인
4. 여러 기기/브라우저에서 테스트

### 확인해야 할 사항
- [ ] 동의 배너가 첫 방문 시 표시됨
- [ ] 동의 후 Analytics가 작동함
- [ ] 거부 후 Analytics가 비활성화됨
- [ ] 동의 상태가 유지됨 (페이지 이동 시)
- [ ] 모바일에서도 정상 작동함

---

## 참고 자료

- [Google Analytics 디버거](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)
- [Google Tag Assistant](https://tagassistant.google.com/)
- [Google Analytics 실시간 보고서](https://analytics.google.com/)
- [Consent Mode 문서](https://developers.google.com/tag-platform/devguides/consent)

