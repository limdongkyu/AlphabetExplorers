'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 테마 타입 정의
export type Theme = 'default' | 'starcraft' | 'pokemon' | 'minecraft';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default');

  // 초기 로드 시 로컬 스토리지에서 테마 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('alphabetTheme') as Theme;
      // 스타크래프트 테마는 일시적으로 비활성화 - 기본 테마로 변경
      if (savedTheme === 'starcraft') {
        setThemeState('default');
        localStorage.setItem('alphabetTheme', 'default');
      } else if (savedTheme === 'default' || savedTheme === 'pokemon' || savedTheme === 'minecraft') {
        setThemeState(savedTheme);
      }
    }
  }, []);

  // 테마 변경 함수 (로컬 스토리지에 저장)
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('alphabetTheme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 테마별 배경 스타일 반환
export function getThemeStyles(theme: Theme) {
  switch (theme) {
    case 'starcraft':
      return {
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
        textColor: '#ffffff',
        primaryColor: '#00d4ff',
        secondaryColor: '#ff6b35',
        accentColor: '#ffd700',
      };
    case 'pokemon':
      return {
        background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%)',
        textColor: '#1f2937',
        primaryColor: '#ff6b6b',
        secondaryColor: '#4ecdc4',
        accentColor: '#ffe66d',
      };
    case 'minecraft':
      return {
        background: 'linear-gradient(135deg, #7cb342 0%, #8bc34a 50%, #9ccc65 100%)',
        textColor: '#1f2937',
        primaryColor: '#7cb342',
        secondaryColor: '#8bc34a',
        accentColor: '#9ccc65',
      };
    default:
      return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#1f2937',
        primaryColor: '#3b82f6',
        secondaryColor: '#f59e0b',
        accentColor: '#10b981',
      };
  }
}

