'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // localStorage에서 동의 상태 확인
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // 동의 상태가 없으면 배너 표시
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // 동의 저장
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Google Analytics 동의 업데이트
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied', // 광고는 사용하지 않으므로 거부
      });
      
      // 동의 후 페이지뷰 전송 활성화 및 현재 페이지 전송
      window.gtag('config', 'G-7NMEJZVEB1', {
        send_page_view: true,
      });
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
    
    // 페이지 리로드하여 Analytics 활성화
    window.location.reload();
  };

  const handleReject = () => {
    // 거부 저장
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setShowBanner(false);
    
    // Google Analytics 비활성화
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white shadow-2xl border-t-2 border-blue-500">
      <div className="max-w-4xl mx-auto">
        {/* 메인 배너 */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
            🍪 쿠키 및 개인정보 사용 동의
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
            이 웹사이트는 사용자 경험을 개선하고 서비스를 제공하기 위해 Google Analytics를 사용하여 
            <strong>쿠키 및 유사한 기술</strong>을 사용합니다. 
            <br className="hidden md:block" />
            수집되는 데이터는{' '}
            <Link 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              Google의 개인정보 보호정책
            </Link>
            에 따라 처리됩니다.
          </p>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            <strong>수집 목적:</strong> 웹사이트 방문 통계, 사용자 행동 분석 (광고 개인화 없음)
          </p>
        </div>

        {/* 상세 정보 토글 */}
        {showDetails && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-bold mb-2 text-gray-800">📋 상세 정보</h4>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
              <li>
                <strong>• 사용 쿠키:</strong> Google Analytics (측정 및 분석용)
              </li>
              <li>
                <strong>• 데이터 수집:</strong> 페이지 조회수, 방문 시간, 기기 정보, 브라우저 정보
              </li>
              <li>
                <strong>• 제3자 공유:</strong> Google Analytics로만 전송되며, 광고 목적으로는 사용되지 않습니다
              </li>
              <li>
                <strong>• 데이터 보관:</strong> Google Analytics 정책에 따라 관리됩니다
              </li>
              <li>
                <strong>• 동의 철회:</strong> 언제든지 쿠키 설정에서 동의를 철회할 수 있습니다
              </li>
            </ul>
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                Google이 데이터를 사용하는 방법에 대한 자세한 내용은{' '}
                <Link 
                  href="https://business.safety.google/data-responsibility/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Google의 데이터 책임 사이트
                </Link>
                를 참조하세요.
              </p>
            </div>
          </div>
        )}

        {/* 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-full font-bold text-base md:text-lg hover:bg-blue-600 active:scale-95 transition-all shadow-lg"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            ✅ 동의하고 계속하기
          </button>
          <button
            onClick={handleReject}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold text-base md:text-lg hover:bg-gray-300 active:scale-95 transition-all"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            ❌ 거부
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm md:text-base hover:bg-gray-200 active:scale-95 transition-all"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {showDetails ? '▲ 간단히 보기' : '▼ 자세히 보기'}
          </button>
        </div>

        {/* 동의 철회 안내 */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          쿠키 동의를 변경하려면 브라우저 설정에서 쿠키를 삭제하거나{' '}
          <button
            onClick={() => {
              localStorage.removeItem('cookie-consent');
              localStorage.removeItem('cookie-consent-date');
              window.location.reload();
            }}
            className="text-blue-600 hover:underline font-semibold"
          >
            여기를 클릭
          </button>
          하세요.
        </p>
      </div>
    </div>
  );
}

