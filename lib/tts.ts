// 브라우저 호환성 체크 함수
export const isSpeechSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Web Speech API 지원 여부 체크
  if (!('speechSynthesis' in window)) {
    return false;
  }

  // 삼성 인터넷 브라우저 체크
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('samsungbrowser') || userAgent.includes('samsung internet')) {
    return false;
  }

  return true;
};

// 브라우저 이름 감지
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

// Text-to-Speech 유틸 함수
export const speakText = (text: string, lang: string = 'en-US'): boolean => {
  if (!isSpeechSupported()) {
    console.warn('Speech synthesis not supported in this browser');
    return false;
  }

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
      console.error('Speech synthesis error:', event);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Failed to speak text:', error);
    return false;
  }
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

