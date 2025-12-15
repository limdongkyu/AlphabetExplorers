'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { alphabetData, saveProgress, getLetterProgress, type AlphabetData } from '@/lib/alphabetData';
import { speakText, stopSpeaking, isSamsungBrowser } from '@/lib/tts';

export default function LearnPage() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<AlphabetData | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [visibleWordCount, setVisibleWordCount] = useState<number>(6); // 초기 6개 표시

  useEffect(() => {
    // 첫 번째 알파벳 자동 선택
    setSelectedLetter(alphabetData[0]);
  }, []);

  const handleLetterClick = (letter: AlphabetData, index: number) => {
    setSelectedLetter(letter);
    setCurrentLetterIndex(index);
    setShowDetail(true);
    setVisibleWordCount(6); // 알파벳 변경 시 6개로 초기화
    stopSpeaking(); // 이전 음성 중단
  };

  const handleSpeakLetter = (letter: string) => {
    const success = speakText(letter);
    if (!success && isSamsungBrowser()) {
      // 삼성 브라우저에서는 조용히 실패 (경고는 상단 배너에서 표시됨)
    }
  };

  const handleSpeakName = (name: string) => {
    const success = speakText(name);
    if (!success && isSamsungBrowser()) {
      // 삼성 브라우저에서는 조용히 실패 (경고는 상단 배너에서 표시됨)
    }
  };

  const handleComplete = () => {
    if (selectedLetter) {
      const progress = getLetterProgress(selectedLetter.uppercase);
      saveProgress(selectedLetter.uppercase, {
        completed: true,
        stars: Math.max(progress.stars, 3), // 완료하면 3점
      });
    }
  };

  const currentLetter = selectedLetter || alphabetData[currentLetterIndex];

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-8 safe-area-inset">
      {/* 헤더 */}
      <div className="mb-4 md:mb-6">
        <Link href="/" className="inline-block mb-3 md:mb-4">
          <button className="btn-secondary text-sm md:text-base">
            ← 홈으로
          </button>
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          알파벳 배우기
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base">
          알파벳을 클릭해서 배워보세요!
        </p>
      </div>

      {/* 알파벳 그리드 */}
      <div className="max-w-6xl mx-auto mb-6 md:mb-8">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
          {alphabetData.map((letter, index) => {
            const progress = getLetterProgress(letter.uppercase);
            const isCompleted = progress.completed;
            const isCurrent = selectedLetter?.uppercase === letter.uppercase;

            return (
              <button
                key={letter.uppercase}
                onClick={() => handleLetterClick(letter, index)}
                className={`
                  card p-3 sm:p-4 md:p-6 text-center relative min-h-[80px] sm:min-h-[100px]
                  ${isCurrent ? 'ring-2 sm:ring-4 ring-blue-500 scale-105 sm:scale-110' : ''}
                  ${isCompleted ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : 'bg-white'}
                  active:scale-95 transition-all duration-200 touch-manipulation
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* 별 표시 */}
                {isCompleted && (
                  <div className="absolute top-1 right-1 text-yellow-400 text-base sm:text-lg">
                    ⭐
                  </div>
                )}

                {/* 대문자 */}
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-blue-600">
                  {letter.uppercase}
                </div>

                {/* 소문자 */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">
                  {letter.lowercase}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 상세 정보 카드 */}
      {showDetail && currentLetter && (
        <div className="max-w-4xl mx-auto">
          <div className="card">
            {/* 알파벳 크게 표시 */}
            <div className="text-center mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <button
                  onClick={() => handleSpeakLetter(currentLetter.uppercase)}
                  className="flex flex-col items-center gap-2 active:scale-95 transition-transform touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="text-7xl sm:text-8xl md:text-9xl font-bold text-blue-600 bg-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                    {currentLetter.uppercase}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">대문자</span>
                </button>

                <div className="text-4xl sm:text-6xl font-bold text-gray-300 hidden sm:block">=</div>
                <div className="text-2xl font-bold text-gray-300 sm:hidden">↓</div>

                <button
                  onClick={() => handleSpeakLetter(currentLetter.lowercase)}
                  className="flex flex-col items-center gap-2 active:scale-95 transition-transform touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="text-7xl sm:text-8xl md:text-9xl font-bold text-purple-600 bg-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                    {currentLetter.lowercase}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">소문자</span>
                </button>
              </div>

              {/* 알파벳 이름 */}
              <div className="mb-3 md:mb-4">
                <button
                  onClick={() => handleSpeakName(currentLetter.name)}
                  className="btn-primary text-base md:text-lg"
                >
                  🔊 "{currentLetter.name}" 듣기
                </button>
              </div>
            </div>

            {/* 단어들 */}
            <div className="border-t-2 border-gray-200 pt-4 md:pt-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-center text-gray-700">
                {currentLetter.uppercase}로 시작하는 단어들
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {currentLetter.words.slice(0, Math.min(visibleWordCount, 30)).map((word, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const success = speakText(word.word);
                      if (!success && isSamsungBrowser()) {
                        // 삼성 브라우저에서는 조용히 실패 (경고는 상단 배너에서 표시됨)
                      }
                    }}
                    className="card p-3 md:p-4 active:scale-95 transition-transform text-center touch-manipulation min-h-[140px] sm:min-h-[160px]"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div className="text-4xl sm:text-5xl mb-2">{word.emoji}</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-600 mb-1">
                      {word.word}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">{word.korean}</div>
                  </button>
                ))}
              </div>

              {/* 더보기 버튼 */}
              {currentLetter.words.length > visibleWordCount && visibleWordCount < 30 && (
                <div className="text-center mt-6 md:mt-8">
                  <button
                    onClick={() => {
                      // 6개씩 추가하되 최대 30개까지만
                      const nextCount = Math.min(visibleWordCount + 6, 30);
                      setVisibleWordCount(nextCount);
                    }}
                    className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg md:text-xl hover:from-blue-600 hover:to-purple-600 transition-all active:scale-95 touch-manipulation shadow-lg"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    더보기 ({Math.min(currentLetter.words.length - visibleWordCount, 30 - visibleWordCount)}개 더 보기)
                  </button>
                </div>
              )}
            </div>

            {/* 완료 버튼 */}
            <div className="mt-8 text-center">
              <button
                onClick={handleComplete}
                className="btn-primary text-xl"
              >
                ✅ 이 알파벳 배우기 완료!
              </button>
            </div>

            {/* 이전/다음 버튼 */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => {
                  if (currentLetterIndex > 0) {
                    handleLetterClick(alphabetData[currentLetterIndex - 1], currentLetterIndex - 1);
                  }
                }}
                disabled={currentLetterIndex === 0}
                className="btn-secondary disabled:opacity-50"
              >
                ← 이전
              </button>
              <button
                onClick={() => {
                  if (currentLetterIndex < alphabetData.length - 1) {
                    handleLetterClick(alphabetData[currentLetterIndex + 1], currentLetterIndex + 1);
                  }
                }}
                disabled={currentLetterIndex === alphabetData.length - 1}
                className="btn-secondary disabled:opacity-50"
              >
                다음 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

