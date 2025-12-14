'use client';

import { useState, useEffect } from 'react';
import { isSamsungBrowser, getBrowserName } from '@/lib/tts';

export default function BrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 삼성 브라우저에서만 경고 표시
    if (isSamsungBrowser()) {
      setShowWarning(true);
      // 모바일 기기 체크
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobile(/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
    }
  }, []);

  // 크롬 앱으로 열기 함수
  const openInChrome = () => {
    if (typeof window === 'undefined') return;

    const currentUrl = window.location.href;
    const userAgent = navigator.userAgent.toLowerCase();

    // Android 기기인 경우
    if (/android/i.test(userAgent)) {
      // Chrome Intent 스키마 사용
      // 크롬이 설치되어 있으면 열리고, 없으면 Play Store로 이동
      const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
      
      // 먼저 intent 시도
      const fallbackTimeout = setTimeout(() => {
        // 2초 후에도 페이지가 열리지 않으면 (크롬이 없는 경우) Play Store로 이동
        window.location.href = 'https://play.google.com/store/apps/details?id=com.android.chrome';
      }, 2000);

      // 페이지가 열리면 타이머 클리어
      window.addEventListener('blur', () => {
        clearTimeout(fallbackTimeout);
      });

      window.location.href = intentUrl;
    } 
    // iOS 기기인 경우
    else if (/iphone|ipad|ipod/i.test(userAgent)) {
      // Chrome iOS의 custom URL scheme 사용
      const chromeUrl = `googlechrome://${window.location.host}${window.location.pathname}${window.location.search}`;
      
      // 크롬이 설치되어 있으면 열리고, 없으면 App Store로 이동
      const fallbackTimeout = setTimeout(() => {
        window.location.href = 'https://apps.apple.com/app/apple-store/id535886823';
      }, 2000);

      window.addEventListener('blur', () => {
        clearTimeout(fallbackTimeout);
      });

      window.location.href = chromeUrl;
    }
    // 데스크톱인 경우
    else {
      // 데스크톱에서는 크롬 다운로드 페이지로 이동
      window.open('https://www.google.com/chrome/', '_blank');
    }
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 border-b-2 border-yellow-600 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">⚠️</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg">
              음성 기능이 제한적이에요!
            </h3>
            <p className="text-sm md:text-base text-gray-800 mb-2">
              삼성 인터넷 브라우저는 음성 기능을 완전히 지원하지 않아요. 
              🔊 버튼을 눌러도 소리가 나지 않을 수 있어요. 
              음성을 들으려면 <strong>크롬 브라우저</strong>를 사용해주세요! 📱
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {isMobile ? (
                <>
                  <button
                    onClick={openInChrome}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    📱 크롬으로 열기
                  </button>
                  <a
                    href={/android/i.test(navigator.userAgent.toLowerCase()) 
                      ? 'https://play.google.com/store/apps/details?id=com.android.chrome'
                      : 'https://apps.apple.com/app/apple-store/id535886823'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold hover:bg-gray-700 active:scale-95 transition-all"
                  >
                    크롬 다운로드
                  </a>
                </>
              ) : (
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                >
                  크롬 다운로드
                </a>
              )}
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-300 active:scale-95 transition-all"
              >
                알겠어요
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

