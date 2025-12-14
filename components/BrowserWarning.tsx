'use client';

import { useState, useEffect } from 'react';
import { isSamsungBrowser } from '@/lib/tts';

export default function BrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // 삼성 브라우저에서만 경고 표시
    const isSamsung = isSamsungBrowser();
    const userAgent = navigator.userAgent;
    const userAgentLower = userAgent.toLowerCase();
    const mobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgentLower);
    const android = /android/i.test(userAgentLower);
    
    // 디버깅용 - 항상 로그 출력
    console.log('Browser detection:', {
      userAgent: userAgent,
      isSamsung,
      isMobile: mobile,
      isAndroid: android,
      isChrome: userAgentLower.includes('chrome') && !userAgentLower.includes('edg'),
    });
    
    if (isSamsung) {
      setShowWarning(true);
      setIsMobile(mobile);
      setIsAndroid(android);
      console.log('⚠️ Samsung browser detected - showing warning banner');
    } else {
      console.log('✅ Not Samsung browser or detection failed');
    }
  }, []);

  // 크롬 앱으로 열기 함수
  const openInChrome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window === 'undefined') return;

    const currentUrl = window.location.href;
    const userAgent = navigator.userAgent.toLowerCase();

    // Android 기기인 경우
    if (isAndroid) {
      // Chrome Intent 스키마 사용 (올바른 형식)
      // 방법 1: 직접 URL로 intent 시도
      const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end`;
      
      // fallback을 위한 플래그
      let chromeOpened = false;
      
      // 페이지가 blur되면 크롬이 열린 것으로 간주
      const handleBlur = () => {
        chromeOpened = true;
        window.removeEventListener('blur', handleBlur);
      };
      
      window.addEventListener('blur', handleBlur);
      
      // hidden iframe을 사용하여 intent 시도 (더 안정적)
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.src = intentUrl;
        document.body.appendChild(iframe);

        // fallback: 2.5초 후에도 크롬이 열리지 않으면 Play Store로 이동
        setTimeout(() => {
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
          }
          window.removeEventListener('blur', handleBlur);
          
          if (!chromeOpened) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.android.chrome';
          }
        }, 2500);
      } catch (error) {
        // iframe 방법이 실패하면 직접 location으로 시도
        window.location.href = intentUrl;
        
        setTimeout(() => {
          if (!chromeOpened) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.android.chrome';
          }
        }, 2500);
      }
    } 
    // iOS 기기인 경우
    else if (/iphone|ipad|ipod/i.test(userAgent)) {
      // Chrome iOS의 custom URL scheme 사용
      const chromeUrl = `googlechrome://${window.location.host}${window.location.pathname}${window.location.search}`;
      
      // 크롬이 설치되어 있으면 열리고, 없으면 App Store로 이동
      const fallbackTimeout = setTimeout(() => {
        window.location.href = 'https://apps.apple.com/app/apple-store/id535886823';
      }, 2500);

      const handleBlur = () => {
        clearTimeout(fallbackTimeout);
        window.removeEventListener('blur', handleBlur);
      };

      window.addEventListener('blur', handleBlur);
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
              {/* Android 모바일인 경우: 크롬 열기 + 다운로드 버튼 모두 표시 */}
              {isMobile && isAndroid && (
                <>
                  <button
                    onClick={openInChrome}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all min-h-[44px] touch-manipulation"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    📱 크롬으로 열기
                  </button>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.android.chrome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-semibold hover:bg-gray-700 active:scale-95 transition-all min-h-[44px] touch-manipulation flex items-center justify-center"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    onClick={(e) => {
                      console.log('크롬 다운로드 링크 클릭됨');
                    }}
                  >
                    크롬 다운로드
                  </a>
                </>
              )}
              
              {/* iOS 모바일인 경우 */}
              {isMobile && !isAndroid && (
                <a
                  href="https://apps.apple.com/app/apple-store/id535886823"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all min-h-[44px] touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  크롬 다운로드
                </a>
              )}
              
              {/* 데스크톱인 경우 */}
              {!isMobile && (
                <a
                  href="https://www.google.com/chrome/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
                >
                  크롬 다운로드
                </a>
              )}
              
              {/* 항상 표시되는 닫기 버튼 */}
              <button
                onClick={() => {
                  console.log('경고 배너 닫기 클릭됨');
                  setShowWarning(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-300 active:scale-95 transition-all min-h-[44px] touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
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

