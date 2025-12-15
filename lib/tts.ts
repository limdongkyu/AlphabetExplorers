// 현재 재생 중인 오디오 추적
let currentAudio: HTMLAudioElement | null = null;

// Web Speech API 사용 가능 여부 체크
const isWebSpeechSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
};

// 삼성 브라우저 체크 (더 넓은 범위로 체크)
export const isSamsungBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  // 다양한 삼성 브라우저 식별자 체크
  return (
    userAgent.includes('samsungbrowser') || 
    userAgent.includes('samsung internet') ||
    userAgent.includes('samsung') && userAgent.includes('mobile') && !userAgent.includes('chrome') ||
    (userAgent.includes('android') && userAgent.includes('samsung') && !userAgent.includes('chrome'))
  );
};

// Web Speech API를 사용한 TTS (1순위)
const speakWithWebSpeech = (text: string, lang: string = 'en-US'): boolean => {
  if (!isWebSpeechSupported()) return false;

  try {
    // 이전 음성 중단
    window.speechSynthesis.cancel();

    // 음성 엔진이 준비될 때까지 잠시 대기 (일부 브라우저에서 필요)
    // 이미 말하고 있으면 바로 진행
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // 조금 느리게 (아이들을 위해)
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 에러 핸들링 (더 자세한 정보 추출)
    utterance.onerror = (event: SpeechSynthesisErrorEvent | Event) => {
      // SpeechSynthesisErrorEvent 타입 체크
      const synthEvent = event as SpeechSynthesisErrorEvent;
      
      // 에러 정보 수집 (타입 안전하게)
      const errorInfo: {
        error?: string;
        type: string;
        charIndex?: number;
        charLength?: number;
        elapsedTime?: number;
        name?: string;
      } = {
        type: synthEvent.type || 'error',
      };
      
      // SpeechSynthesisErrorEvent의 속성들 (타입이 있을 때만)
      if ('error' in synthEvent) {
        errorInfo.error = synthEvent.error || 'unknown';
      }
      if ('charIndex' in synthEvent && synthEvent.charIndex !== undefined) {
        errorInfo.charIndex = synthEvent.charIndex;
      }
      if ('charLength' in synthEvent && synthEvent.charLength !== undefined) {
        errorInfo.charLength = synthEvent.charLength;
      }
      if ('elapsedTime' in synthEvent && synthEvent.elapsedTime !== undefined) {
        errorInfo.elapsedTime = synthEvent.elapsedTime;
      }
      if ('name' in synthEvent) {
        errorInfo.name = synthEvent.name;
      }
      
      // 개발 환경에서만 상세 로그 출력
      if (process.env.NODE_ENV === 'development') {
        console.warn('Web Speech API error (this is usually harmless):', errorInfo);
      }
      
      // 일반적으로 'network' 에러는 무시해도 됨 (일부 브라우저에서 정상 동작 중에도 발생)
      // 'not-allowed' 에러는 사용자가 권한을 거부한 경우
      if ('error' in synthEvent && synthEvent.error === 'not-allowed') {
        console.warn('Web Speech API: Permission denied by user');
      }
    };

    // 음성 재생 시작
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    // 개발 환경에서만 에러 로그 출력
    if (process.env.NODE_ENV === 'development') {
      console.error('Web Speech API failed:', error);
    }
    return false;
  }
};

// 모든 브라우저에서 작동하는 TTS 함수
export const speakText = (text: string, lang: string = 'en-US'): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    // 이전 재생 중단
    stopSpeaking();

    // 1순위: Web Speech API 사용 (대부분의 브라우저에서 작동)
    // 삼성 브라우저에서도 시도해봄 (일부 버전에서는 작동할 수 있음)
    if (isWebSpeechSupported()) {
      const success = speakWithWebSpeech(text, lang);
      if (success) {
        return true;
      }
    }

    // Web Speech API가 없거나 실패한 경우
    // 삼성 브라우저에서는 사용자에게 안내만 하고 실패 반환
    if (isSamsungBrowser()) {
      console.warn('Samsung Internet browser does not fully support Web Speech API');
      return false;
    }

    // 다른 브라우저에서도 Web Speech API가 실패한 경우
    console.warn('Web Speech API not available or failed');
    return false;
  } catch (error) {
    console.error('Failed to speak text:', error);
    return false;
  }
};

// 음성 재생 중단 함수
export const stopSpeaking = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  
  // Web Speech API도 중단 (혹시 사용 중인 경우)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// 브라우저 호환성 체크
export const isSpeechSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Web Speech API 지원 여부 체크
  if (isWebSpeechSupported()) {
    // 삼성 브라우저는 체크만 하고 실제로는 사용자에게 안내 필요
    return true; // 일단 true 반환 (시도는 해봄)
  }
  
  return false;
};

// 브라우저 이름 감지 (디버깅용)
export const getBrowserName = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (userAgent.includes('samsungbrowser') || userAgent.includes('samsung internet')) {
    return 'samsung';
  }
  if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    return 'chrome';
  }
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'safari';
  }
  if (userAgent.includes('firefox')) {
    return 'firefox';
  }
  if (userAgent.includes('edg')) {
    return 'edge';
  }
  
  return 'unknown';
};


