'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { alphabetData, getProgress, resetProgress, type ProgressData } from '@/lib/alphabetData';

export default function ProgressPage() {
  const [progress, setProgress] = useState<ProgressData>({});
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [totalPracticed, setTotalPracticed] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const loadProgress = () => {
    const savedProgress = getProgress();
    setProgress(savedProgress);

    // 통계 계산
    const completed = Object.values(savedProgress).filter((p) => p.completed).length;
    const stars = Object.values(savedProgress).reduce((sum, p) => sum + (p.stars || 0), 0);
    const practiced = Object.values(savedProgress).filter((p) => p.practiced).length;

    setTotalCompleted(completed);
    setTotalStars(stars);
    setTotalPracticed(practiced);
  };

  useEffect(() => {
    loadProgress();
  }, []);

  const handleReset = () => {
    if (resetProgress()) {
      setShowResetConfirm(false);
      // 페이지 새로고침으로 모든 상태 업데이트
      window.location.reload();
    }
  };

  const getStarsDisplay = (stars: number) => {
    return '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  };

  const percentage = Math.round((totalCompleted / 26) * 100);

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-8 safe-area-inset">
      {/* 헤더 */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <Link href="/" className="inline-block">
            <button className="btn-secondary text-sm md:text-base">
              ← 홈으로
            </button>
          </Link>
          {/* 초기화 버튼 */}
          {(totalCompleted > 0 || totalPracticed > 0) && (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md text-sm md:text-base font-semibold active:scale-95 transform transition-all duration-200 min-h-[44px] touch-manipulation flex items-center gap-2"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span>🔄</span>
              <span className="hidden sm:inline">초기화</span>
            </button>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
          🌟 내 성취 보기
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base">
          열심히 배운 알파벳을 확인해보세요!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 전체 통계 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          {/* 완료 알파벳 수 */}
          <div className="card text-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-5xl mb-2">✅</div>
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {totalCompleted}
            </div>
            <div className="text-gray-600 font-medium">
              완료한 알파벳
            </div>
            <div className="text-sm text-gray-500 mt-1">
              / 26개
            </div>
          </div>

          {/* 총 별점 */}
          <div className="card text-center bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="text-5xl mb-2">⭐</div>
            <div className="text-4xl font-bold text-yellow-600 mb-1">
              {totalStars}
            </div>
            <div className="text-gray-600 font-medium">
              총 별점
            </div>
            <div className="text-sm text-gray-500 mt-1">
              최대 78개
            </div>
          </div>

          {/* 쓰기 연습 완료 */}
          <div className="card text-center bg-gradient-to-br from-green-50 to-teal-50">
            <div className="text-5xl mb-2">✍️</div>
            <div className="text-4xl font-bold text-green-600 mb-1">
              {totalPracticed}
            </div>
            <div className="text-gray-600 font-medium">
              쓰기 연습 완료
            </div>
            <div className="text-sm text-gray-500 mt-1">
              / 26개
            </div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">전체 진행률</h2>
          <div className="bg-gray-200 rounded-full h-8 md:h-10 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 h-full flex items-center justify-center text-white font-bold text-sm md:text-base transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 10 && `${percentage}%`}
            </div>
          </div>
          <p className="text-center mt-2 text-gray-600">
            {percentage === 100 
              ? '🎉 축하해요! 모든 알파벳을 마스터했어요!' 
              : `${percentage}% 완료! 화이팅! 💪`
            }
          </p>
        </div>

        {/* 알파벳별 진행 상황 */}
        <div className="card">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-center">알파벳별 성취</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
            {alphabetData.map((letter) => {
              const letterProgress = progress[letter.uppercase] || {
                completed: false,
                stars: 0,
                practiced: false,
              };

              return (
                <div
                  key={letter.uppercase}
                  className={`
                    p-3 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-200 min-h-[80px] sm:min-h-[100px]
                    ${letterProgress.completed
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400'
                      : 'bg-gray-100 border-2 border-gray-300'
                    }
                  `}
                >
                  {/* 알파벳 */}
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
                    {letter.uppercase}
                  </div>

                  {/* 완료 표시 */}
                  {letterProgress.completed && (
                    <div className="text-2xl mb-1">✅</div>
                  )}

                  {/* 별점 */}
                  {letterProgress.stars > 0 && (
                    <div className="text-sm mb-1">
                      {getStarsDisplay(letterProgress.stars)}
                    </div>
                  )}

                  {/* 쓰기 연습 완료 */}
                  {letterProgress.practiced && (
                    <div className="text-sm">✍️</div>
                  )}

                  {/* 미완료 */}
                  {!letterProgress.completed && !letterProgress.practiced && (
                    <div className="text-gray-400 text-sm">시작 전</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 격려 메시지 */}
        {percentage === 100 && (
          <div className="card mt-8 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 text-center">
            <div className="text-7xl mb-4">🎉🎊🎉</div>
            <h3 className="text-3xl font-bold mb-2 text-gray-800">
              완벽해요!
            </h3>
            <p className="text-xl text-gray-700">
              모든 알파벳을 배웠어요! 정말 대단해요! 👏
            </p>
          </div>
        )}

        {/* 학습 유도 버튼 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/learn" className="block">
            <button className="btn-primary w-full">
              📚 더 배우기
            </button>
          </Link>
          <Link href="/practice" className="block">
            <button className="btn-primary w-full">
              ✍️ 쓰기 연습
            </button>
          </Link>
          <Link href="/words" className="block">
            <button className="btn-primary w-full">
              🎯 단어 배우기
            </button>
          </Link>
        </div>
      </div>

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
            <div className="space-y-3">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-800 text-center">
                  초기화하면 다음 정보가 모두 삭제돼요:<br />
                  • 완료한 알파벳 ({totalCompleted}개)<br />
                  • 획득한 별점 ({totalStars}개)<br />
                  • 쓰기 연습 기록 ({totalPracticed}개)
                </p>
              </div>
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
        </div>
      )}
    </div>
  );
}

