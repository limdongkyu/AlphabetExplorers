// 현재 재생 중인 오디오 추적
let currentAudio: HTMLAudioElement | null = null;

// 언어 코드 매핑
const getLanguageCode = (lang: string = 'en-US'): string => {
  // 'en-US' -> 'en', 'ko-KR' -> 'ko'
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('ko')) return 'ko';
  return 'en'; // 기본값
};

// 모든 브라우저에서 작동하는 TTS 함수 (Google Translate TTS 사용)
export const speakText = (text: string, lang: string = 'en-US'): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    // 이전 재생 중단
    stopSpeaking();

    // 텍스트 인코딩
    const encodedText = encodeURIComponent(text);
    const languageCode = getLanguageCode(lang);

    // Google Translate TTS URL (무료, API 키 불필요)
    // 여러 도메인 중 하나를 랜덤하게 선택하여 사용 제한 회피
    const domains = [
      'translate.google.com',
      'translate.google.com.vn',
      'translate.google.co.kr'
    ];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    
    const ttsUrl = `https://${randomDomain}/translate_tts?ie=UTF-8&tl=${languageCode}&client=tw-ob&q=${encodedText}`;

    // 오디오 생성 및 재생
    const audio = new Audio(ttsUrl);
    
    // 오디오 설정
    audio.volume = 1.0;
    audio.playbackRate = 0.8; // 조금 느리게 (아이들을 위해)

    // 에러 핸들링
    audio.onerror = (error) => {
      console.error('TTS audio error:', error);
      currentAudio = null;
    };

    // 재생 완료 시 정리
    audio.onended = () => {
      currentAudio = null;
    };

    // 재생 시작
    currentAudio = audio;
    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
      currentAudio = null;
    });

    return true;
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

// 브라우저 호환성 체크 (이제 항상 true, 모든 브라우저 지원)
export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined';
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

