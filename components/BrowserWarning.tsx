'use client';

import { useState, useEffect } from 'react';
import { isSpeechSupported } from '@/lib/tts';

export default function BrowserWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Audio API 지원 여부만 체크 (대부분의 브라우저에서 지원)
    const supported = isSpeechSupported();
    if (!supported) {
      setShowWarning(true);
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
              오디오 재생이 불가능해요!
            </h3>
            <p className="text-sm md:text-base text-gray-800 mb-2">
              현재 브라우저에서 오디오를 재생할 수 없어요. 최신 브라우저로 업데이트해주세요! 📱
            </p>
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
  );
}

