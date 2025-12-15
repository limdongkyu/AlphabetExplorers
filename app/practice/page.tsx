'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { alphabetData, saveProgress, getLetterProgress, type AlphabetData } from '@/lib/alphabetData';
import { starcraftAlphabetData } from '@/lib/starcraftData';
import { pokemonAlphabetData } from '@/lib/pokemonData';
import { useTheme, getThemeStyles } from '@/lib/theme';
import CanvasDrawing from '@/components/CanvasDrawing';

export default function PracticePage() {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const currentAlphabetData = 
    theme === 'starcraft' ? starcraftAlphabetData : 
    theme === 'pokemon' ? pokemonAlphabetData : 
    alphabetData;
  
  const [currentLetter, setCurrentLetter] = useState<AlphabetData>(currentAlphabetData[0]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [practiceType, setPracticeType] = useState<'uppercase' | 'lowercase'>('uppercase');
  const [practiceCount, setPracticeCount] = useState(0);

  useEffect(() => {
    setCurrentLetter(currentAlphabetData[0]);
    setCurrentLetterIndex(0);
  }, [theme]);

  const handleLetterSelect = (letter: AlphabetData, index: number) => {
    setCurrentLetter(letter);
    setCurrentLetterIndex(index);
    setPracticeCount(0);
  };

  const handlePracticeComplete = () => {
    setPracticeCount(prev => prev + 1);
    
    // 3번 이상 연습하면 완료 처리
    if (practiceCount >= 2) {
      saveProgress(currentLetter.uppercase, {
        practiced: true,
      });
    }
  };

  const progress = getLetterProgress(currentLetter.uppercase);

  return (
    <div 
      className="min-h-screen p-3 md:p-4 lg:p-8 safe-area-inset transition-all duration-500"
      style={{ background: themeStyles.background }}
    >
      {/* 헤더 */}
      <div className="mb-4 md:mb-6">
        <Link href="/" className="inline-block mb-3 md:mb-4">
          <button className="btn-secondary text-sm md:text-base">
            ← 홈으로
          </button>
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✍️ 쓰기 연습하기
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base">
          화면을 손가락이나 마우스로 그려서 연습해보세요!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 알파벳 선택 */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-center">알파벳 선택</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
            {currentAlphabetData.map((letter, index) => {
              const letterProgress = getLetterProgress(letter.uppercase);
              const isSelected = currentLetter.uppercase === letter.uppercase;

              return (
                <button
                  key={letter.uppercase}
                  onClick={() => handleLetterSelect(letter, index)}
                  className={`
                    p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl font-bold text-xl sm:text-2xl md:text-3xl
                    transition-all duration-200 min-h-[48px] sm:min-h-[56px]
                    active:scale-95 touch-manipulation
                    ${isSelected 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105 sm:scale-110 shadow-lg' 
                      : letterProgress.practiced
                        ? 'bg-yellow-100 text-yellow-700 active:bg-yellow-200'
                        : 'bg-white text-gray-700 active:bg-gray-100'
                    }
                  `}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {letter.uppercase}
                  {letterProgress.practiced && <span className="block text-xs mt-1">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* 대소문자 선택 */}
        <div className="mb-4 md:mb-6 text-center">
          <div className="inline-flex gap-1 sm:gap-2 bg-white rounded-full p-1 sm:p-2 shadow-md">
            <button
              onClick={() => setPracticeType('uppercase')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg transition-all min-h-[44px] touch-manipulation ${
                practiceType === 'uppercase'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 active:bg-gray-100'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              대문자
            </button>
            <button
              onClick={() => setPracticeType('lowercase')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg transition-all min-h-[44px] touch-manipulation ${
                practiceType === 'lowercase'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 active:bg-gray-100'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              소문자
            </button>
          </div>
        </div>

        {/* 쓰기 연습 영역 */}
        <div className="card max-w-2xl mx-auto mb-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {practiceType === 'uppercase' ? currentLetter.uppercase : currentLetter.lowercase}
            </h2>
            <p className="text-gray-600">
              아래 화면에 {practiceType === 'uppercase' ? '대문자' : '소문자'}를 그려보세요!
            </p>
          </div>

          <CanvasDrawing
            letter={practiceType === 'uppercase' ? currentLetter.uppercase : currentLetter.lowercase}
            onComplete={handlePracticeComplete}
            strokeColor={practiceType === 'uppercase' ? '#3b82f6' : '#a855f7'}
          />

          {/* 연습 횟수 */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-6 py-3">
              <span className="text-lg font-semibold text-blue-700">
                연습 횟수: {practiceCount}번
              </span>
              {practiceCount >= 3 && (
                <span className="text-2xl">🎉</span>
              )}
            </div>
            {practiceCount >= 3 && (
              <p className="mt-2 text-green-600 font-bold">
                완벽해요! 이 알파벳 쓰기를 마스터했어요! ⭐
              </p>
            )}
          </div>
        </div>

        {/* 이전/다음 버튼 */}
        <div className="flex justify-between max-w-2xl mx-auto">
          <button
            onClick={() => {
              if (currentLetterIndex > 0) {
                handleLetterSelect(currentAlphabetData[currentLetterIndex - 1], currentLetterIndex - 1);
              }
            }}
            disabled={currentLetterIndex === 0}
            className="btn-secondary disabled:opacity-50"
          >
            ← 이전 알파벳
          </button>
          <button
            onClick={() => {
              if (currentLetterIndex < currentAlphabetData.length - 1) {
                handleLetterSelect(currentAlphabetData[currentLetterIndex + 1], currentLetterIndex + 1);
              }
            }}
            disabled={currentLetterIndex === currentAlphabetData.length - 1}
            className="btn-secondary disabled:opacity-50"
          >
            다음 알파벳 →
          </button>
        </div>
      </div>
    </div>
  );
}

