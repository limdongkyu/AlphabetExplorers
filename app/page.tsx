'use client';

import { resetProgress } from '@/lib/alphabetData';
import { getThemeStyles, useTheme } from '@/lib/theme';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeStyles = getThemeStyles(theme);

  const loadProgress = () => {
    // LocalStorage에서 진행 상황 불러오기
    const savedProgress = localStorage.getItem('alphabetProgress');
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      const completedCount = Object.values(data).filter((v: any) => v.completed).length;
      setProgress(Math.round((completedCount / 26) * 100));
    } else {
      setProgress(0);
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleReset = () => {
    if (resetProgress()) {
      setProgress(0);
      setShowResetConfirm(false);
      // 페이지 새로고침으로 모든 상태 업데이트
      window.location.reload();
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 safe-area-inset transition-all duration-500"
      style={{ background: themeStyles.background }}
    >
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          알파벳 탐험대
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-2">
          Alphabet Explorers
        </p>
        <p className="text-base md:text-lg text-gray-600 mt-3 md:mt-4">
          🎈 재미있게 배우는 알파벳 여행을 시작해요!
        </p>
      </div>

      {/* 진행 상황 표시 */}
      {progress > 0 && (
        <div className="w-full max-w-md mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg relative">
            <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500"
                style={{ width: `${progress}%` }}
              >
                {progress > 15 && `${progress}%`}
              </div>
            </div>
            <p className="text-center mt-2 text-gray-600 font-medium">
              학습 진행률: {progress}%
            </p>
            {/* 초기화 버튼 */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="absolute -top-2 -right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg text-xs md:text-sm font-semibold transition-all active:scale-95 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
              title="학습 진행률 초기화"
            >
              🔄
            </button>
          </div>
        </div>
      )}

      {/* 초기화 확인 모달 */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
              ⚠️ 초기화 확인
            </h3>
            <p className="text-center text-gray-600 mb-6 text-base md:text-lg">
              모든 학습 진행 상황을 초기화하시겠어요?<br />
              <span className="text-red-600 font-semibold">이 작업은 되돌릴 수 없어요!</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 btn-secondary"
              >
                취소
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-3 text-lg font-bold rounded-full shadow-lg bg-red-500 text-white hover:bg-red-600 active:scale-95 transform transition-all duration-200 min-h-[48px] touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 메뉴 버튼들 */}
      <div className="w-full max-w-2xl space-y-3 md:space-y-4">
        <Link href="/learn" className="block">
          <button className="btn-primary w-full">
            📚 알파벳 배우기
          </button>
        </Link>

        <Link href="/practice" className="block">
          <button className="btn-primary w-full">
            ✍️ 쓰기 연습하기
          </button>
        </Link>

        <Link href="/words" className="block">
          <button className="btn-primary w-full">
            🎯 단어 배우기
          </button>
        </Link>

        <Link href="/progress" className="block">
          <button className="btn-secondary w-full">
            🌟 내 성취 보기
          </button>
        </Link>
      </div>

      {/* 테마 전환 버튼 */}
      <div className="mt-8 mb-4">
        <div className="flex items-center gap-3 bg-white/90 dark:bg-gray-800/90 rounded-full px-4 py-2 shadow-lg">
          <span className="text-base md:text-lg font-bold" style={{ color: '#fbbf24' }}>
            테마:
          </span>
          <button
            onClick={() => setTheme('default')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              theme === 'default'
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            기본 모드
          </button>
          {/* 스타크래프트 테마는 일시적으로 비활성화 */}
          {/* <button
            onClick={() => setTheme('starcraft')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              theme === 'starcraft'
                ? 'bg-cyan-500 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            🎮 스타크래프트
          </button> */}
          <button
            onClick={() => setTheme('pokemon')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              theme === 'pokemon'
                ? 'bg-yellow-400 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            ⚡ 포켓몬스터
          </button>
          <button
            onClick={() => setTheme('minecraft')}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              theme === 'minecraft'
                ? 'bg-green-500 text-white shadow-md scale-105'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            🎮 마인크래프트
          </button>
        </div>
      </div>

      {/* 하단 장식 요소 */}
      <div className="mt-8 text-center" style={{ color: themeStyles.textColor }}>
        <p className="text-base md:text-lg font-semibold mb-3 opacity-90">
          함께 배우면 더 즐거워요! 😊
        </p>
        <p className="text-sm md:text-base font-medium opacity-80">
          © {new Date().getFullYear()} jisubpapa
        </p>
      </div>
    </div>
  );
}

