'use client';

import { useRef, useEffect, useState } from 'react';
import { getStrokeOrder, type Stroke } from '@/lib/strokeOrder';

interface CanvasDrawingProps {
  letter: string; // 대문자 또는 소문자
  onComplete?: () => void; // 쓰기 완료 콜백
  strokeColor?: string; // 선 색상
  showStrokeOrder?: boolean; // 획순 표시 여부
}

export default function CanvasDrawing({ 
  letter, 
  onComplete,
  strokeColor = '#3b82f6', // 기본 파란색
  showStrokeOrder = true // 기본적으로 획순 표시
}: CanvasDrawingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef<{ width: number; height: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showOrder, setShowOrder] = useState(showStrokeOrder);

  // 화살표 그리기 헬퍼 함수
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    arrowSize: number = 15
  ) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    // 화살표 선 그리기
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    
    // 화살표 머리 그리기
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle - Math.PI / 6),
      toY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle + Math.PI / 6),
      toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  // 획순 번호와 화살표 표시
  const drawStrokeOrder = (ctx: CanvasRenderingContext2D, width: number, height: number, strokes: Stroke[]) => {
    if (!showOrder || strokes.length === 0) return;

    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      
      const startPoint = stroke.points[0];
      const endPoint = stroke.points[stroke.points.length - 1];
      const secondPoint = stroke.points[1] || endPoint; // 두 번째 점 (방향 확인용)
      
      const startX = startPoint.x * width;
      const startY = startPoint.y * height;
      const endX = endPoint.x * width;
      const endY = endPoint.y * height;
      const secondX = secondPoint.x * width;
      const secondY = secondPoint.y * height;

      // 획 경로 그리기 (빨간색 점선)
      ctx.strokeStyle = '#ef4444'; // 빨간색
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash([8, 4]); // 점선 패턴
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      for (let i = 1; i < stroke.points.length; i++) {
        const point = stroke.points[i];
        ctx.lineTo(point.x * width, point.y * height);
      }
      ctx.stroke();
      ctx.setLineDash([]); // 점선 해제

      // 화살표 그리기 - 시작점 근처 (방향 명확하게)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      
      // 시작점에서 두 번째 점 방향으로 화살표 그리기
      const arrowStartDistance = 35; // 시작점에서 약간 떨어진 위치
      const totalDistance = Math.sqrt(Math.pow(secondX - startX, 2) + Math.pow(secondY - startY, 2));
      
      if (totalDistance > 0) {
        // 시작점 근처에 화살표 그리기
        const arrowStartX = startX + (arrowStartDistance / totalDistance) * (secondX - startX);
        const arrowStartY = startY + (arrowStartDistance / totalDistance) * (secondY - startY);
        const arrowEndX = startX + (Math.min(arrowStartDistance + 50, totalDistance * 0.7) / totalDistance) * (secondX - startX);
        const arrowEndY = startY + (Math.min(arrowStartDistance + 50, totalDistance * 0.7) / totalDistance) * (secondY - startY);
        
        drawArrow(ctx, arrowStartX, arrowStartY, arrowEndX, arrowEndY, 20);
      }
      
      // 끝점 근처에도 화살표 그리기 (긴 획의 경우)
      const totalStrokeDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      if (totalStrokeDistance > 100) {
        const arrowDistance = 40;
        const angle = Math.atan2(endY - startY, endX - startX);
        const arrowStartX = endX - arrowDistance * Math.cos(angle);
        const arrowStartY = endY - arrowDistance * Math.sin(angle);
        
        drawArrow(ctx, arrowStartX, arrowStartY, endX, endY, 18);
      }

      // 시작점에 순서 번호 표시 (흰색 원 배경) - 화살표 뒤에 그려서 위에 표시
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(startX, startY, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // 번호 텍스트
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(stroke.order.toString(), startX, startY);
    });
  };

  // 캔버스 초기화 및 기본 요소 그리기
  const initializeCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
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

    // 글자 가이드 그리기 (진한 회색으로)
    ctx.fillStyle = '#d1d5db'; // 더 진한 회색으로 변경
    ctx.font = `bold ${Math.min(width, height) * 0.6}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, width / 2, height / 2);
  };

  // 캔버스 크기 설정 (한 번만)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasSizeRef.current) return; // 이미 크기가 설정되어 있으면 스킵

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
    
    // 크기 저장
    canvasSizeRef.current = { width, height };

    // 기본 요소 그리기
    initializeCanvas(ctx, width, height);
  }, []); // 한 번만 실행

  // 글자 변경 시 캔버스 다시 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasSizeRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSizeRef.current;
    
    // 기본 요소 다시 그리기
    initializeCanvas(ctx, width, height);

    // 획순 표시
    if (showOrder) {
      const strokes = getStrokeOrder(letter);
      if (strokes.length > 0) {
        drawStrokeOrder(ctx, width, height, strokes);
      }
    }
  }, [letter, showOrder]);

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
    if (!canvas || !canvasSizeRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSizeRef.current;
    
    // 기본 요소 다시 그리기
    initializeCanvas(ctx, width, height);

    // 획순 다시 그리기
    if (showOrder) {
      const strokes = getStrokeOrder(letter);
      if (strokes.length > 0) {
        drawStrokeOrder(ctx, width, height, strokes);
      }
    }

    setHasDrawn(false);
  };

  const strokes = getStrokeOrder(letter);
  const hasStrokeOrder = strokes.length > 0;

  return (
    <div className="w-full">
      {/* 획순 표시 토글 버튼 */}
      {hasStrokeOrder && (
        <div className="mb-3 text-center">
          <button
            onClick={() => {
              setShowOrder(!showOrder);
            }}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-sm font-semibold transition-all active:scale-95 touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {showOrder ? '👁️ 획순 숨기기' : '👁️ 획순 보기'}
          </button>
          {showOrder && (
            <p className="text-xs text-gray-600 mt-1">
              숫자 순서대로 따라 그려보세요 ✏️
            </p>
          )}
        </div>
      )}

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

