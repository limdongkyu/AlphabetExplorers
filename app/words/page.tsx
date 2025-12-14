'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { alphabetData, type AlphabetData, type Word } from '@/lib/alphabetData';
import { speakText, isSamsungBrowser } from '@/lib/tts';

export default function WordsPage() {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetData | null>(null);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  useEffect(() => {
    // 첫 번째 알파벳 자동 선택
    setSelectedLetter(alphabetData[0]);
  }, []);

  const handleLetterClick = (letter: AlphabetData) => {
    setSelectedLetter(letter);
    setSelectedWord(null);
  };

  const handleWordClick = (word: Word) => {
    setSelectedWord(word);
    const success = speakText(word.word);
    if (!success && isSamsungBrowser()) {
      // 삼성 브라우저에서는 조용히 실패 (경고는 상단 배너에서 표시됨)
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-8 safe-area-inset">
      {/* 헤더 */}
      <div className="mb-4 md:mb-6">
        <Link href="/" className="inline-block mb-3 md:mb-4">
          <button className="btn-secondary text-sm md:text-base">
            ← 홈으로
          </button>
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
          🎯 단어 배우기
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base">
          알파벳을 선택하고 단어를 배워보세요!
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 알파벳 선택 */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4 text-center">알파벳 선택</h2>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
            {alphabetData.map((letter) => {
              const isSelected = selectedLetter?.uppercase === letter.uppercase;

              return (
                <button
                  key={letter.uppercase}
                  onClick={() => handleLetterClick(letter)}
                  className={`
                    p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl font-bold text-xl sm:text-2xl md:text-3xl
                    transition-all duration-200 min-h-[48px] sm:min-h-[56px]
                    active:scale-95 touch-manipulation
                    ${isSelected
                      ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white scale-105 sm:scale-110 shadow-lg'
                      : 'bg-white text-gray-700 active:bg-gray-100'
                    }
                  `}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {letter.uppercase}
                </button>
              );
            })}
          </div>
        </div>

        {/* 선택된 알파벳 정보 */}
        {selectedLetter && (
          <div className="card mb-8">
            <div className="text-center mb-4 md:mb-6">
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 md:mb-4">
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-blue-600 bg-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                  {selectedLetter.uppercase}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl">➕</div>
                <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-purple-600 bg-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                  {selectedLetter.lowercase}
                </div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700">
                "{selectedLetter.name}"로 시작하는 단어들
              </p>
            </div>

            {/* 단어 카드들 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
              {selectedLetter.words.map((word, index) => {
                const isSelected = selectedWord?.word === word.word;

                return (
                  <button
                    key={index}
                    onClick={() => handleWordClick(word)}
                    className={`
                      card p-4 md:p-6 text-center transition-all duration-300 min-h-[200px] sm:min-h-[240px]
                      active:scale-95 touch-manipulation
                      ${isSelected 
                        ? 'ring-2 sm:ring-4 ring-pink-500 scale-100 sm:scale-105 bg-gradient-to-br from-pink-50 to-orange-50' 
                        : 'active:shadow-2xl'
                      }
                    `}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    {/* 이모지 */}
                    <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 md:mb-4 transform transition-transform active:scale-110">
                      {word.emoji}
                    </div>

                    {/* 영어 단어 */}
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-blue-600">
                      {word.word}
                    </div>

                    {/* 한국어 뜻 */}
                    <div className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
                      {word.korean}
                    </div>

                    {/* 소리 재생 버튼 */}
                    <div className="mt-3 md:mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const success = speakText(word.word);
                          if (!success && isSamsungBrowser()) {
                            // 삼성 브라우저에서는 조용히 실패 (경고는 상단 배너에서 표시됨)
                          }
                        }}
                        className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-full active:bg-blue-600 transition-colors min-h-[44px] touch-manipulation text-sm sm:text-base"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        🔊 듣기
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 학습 팁 */}
        <div className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <h3 className="text-2xl font-bold mb-3 text-center text-gray-800">
            💡 학습 팁
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-2xl">1️⃣</span>
              <span>단어를 클릭하면 영어 소리를 들을 수 있어요!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">2️⃣</span>
              <span>단어와 그림을 함께 기억하면 더 쉬워요!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-2xl">3️⃣</span>
              <span>부모님과 함께 소리내어 따라 읽어보세요!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

