// 현재 재생 중인 오디오 추적
let currentAudio: HTMLAudioElement | null = null;

// Web Speech API 사용 가능 여부 체크
const isWebSpeechSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
};

// 삼성 브라우저 체크
const isSamsungBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('samsungbrowser') || userAgent.includes('samsung internet');
};

// Web Speech API를 사용한 TTS (1순위)
const speakWithWebSpeech = (text: string, lang: string = 'en-US'): boolean => {
  if (!isWebSpeechSupported()) return false;

  try {
    // 이전 음성 중단
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // 조금 느리게 (아이들을 위해)
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // 에러 핸들링
    utterance.onerror = (event) => {
      console.error('Web Speech API error:', event);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Web Speech API failed:', error);
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

// 삼성 브라우저 체크 함수 export
export { isSamsungBrowser };

