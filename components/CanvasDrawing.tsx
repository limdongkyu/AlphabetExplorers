'use client';

import { useRef, useEffect, useState } from 'react';

interface CanvasDrawingProps {
  letter: string; // 대문자 또는 소문자
  onComplete?: () => void; // 쓰기 완료 콜백
  strokeColor?: string; // 선 색상
}

export default function CanvasDrawing({ 
  letter, 
  onComplete,
  strokeColor = '#3b82f6' // 기본 파란색
}: CanvasDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    ctx.scale(dpr, dpr);

    // 캔버스 초기화
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // 가이드 라인 그리기 (점선)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 글자 가이드 그리기 (회색으로 흐리게)
    ctx.fillStyle = '#f1f5f9';
    ctx.font = `bold ${Math.min(width, height) * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, width / 2, height / 2);
  }, [letter]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // 모바일 터치 시 스크롤 방지
    if ('touches' in e) {
      e.preventDefault();
    }

    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - rect.left
      : e.clientX - rect.left;
    const y = 'touches' in e
      ? e.touches[0].clientY - rect.top
      : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    // 모바일 터치 시 스크롤 방지
    if ('touches' in e) {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e
      ? e.touches[0].clientX - rect.left
      : e.clientX - rect.left;
    const y = 'touches' in e
      ? e.touches[0].clientY - rect.top
      : e.clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // 모바일에서는 더 두껍게 (터치 친화적)
    const isMobile = 'touches' in e || window.innerWidth < 768;
    ctx.lineWidth = isMobile ? 12 : 8;
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing && hasDrawn && onComplete) {
      // 약간의 딜레이 후 완료 콜백 호출
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // 가이드 라인 다시 그리기
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 글자 가이드 다시 그리기
    ctx.fillStyle = '#f1f5f9';
    ctx.font = `bold ${Math.min(width, height) * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, width / 2, height / 2);

    setHasDrawn(false);
  };

  return (
    <div className="w-full">
      <div className="relative bg-white rounded-2xl md:rounded-3xl shadow-xl p-3 md:p-8 mb-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-64 md:h-96 border-2 border-dashed border-gray-300 rounded-xl md:rounded-2xl"
          style={{ 
            cursor: 'crosshair',
            touchAction: 'none', // 스크롤 방지
            WebkitTouchCallout: 'none', // iOS 롱프레스 메뉴 방지
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
        />
      </div>
      <button
        onClick={clearCanvas}
        className="btn-secondary w-full"
      >
        🗑️ 지우기
      </button>
    </div>
  );
}

