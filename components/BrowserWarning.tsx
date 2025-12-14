'use client';

import { useState, useEffect } from 'react';
import { isSpeechSupported, getBrowserName } from '@/lib/tts';

export default function BrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [browserName, setBrowserName] = useState<string>('');

  useEffect(() => {
    const supported = isSpeechSupported();
    if (!supported) {
      setShowWarning(true);
      setBrowserName(getBrowserName());
    }
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 border-b-2 border-yellow-600 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">⚠️</div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1 text-base md:text-lg">
              음성 기능이 작동하지 않아요!
            </h3>
            <p className="text-sm md:text-base text-gray-800 mb-2">
              {browserName === 'samsung' 
                ? '삼성 인터넷 브라우저는 음성 기능을 지원하지 않아요. ' 
                : '현재 브라우저는 음성 기능을 지원하지 않아요. '
              }
              음성을 들으려면 <strong>크롬 브라우저</strong>를 사용해주세요! 📱
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.android.chrome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all"
              >
                크롬 다운로드
              </a>
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

