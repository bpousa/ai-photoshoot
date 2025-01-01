import { useState, useEffect, useCallback } from 'react';
import { Point, getRelativePosition, constrainPosition } from '@/utils/dragUtils';

interface UseDragProps {
  containerRef: React.RefObject<HTMLElement>;
  onDragChange?: (position: Point) => void;
  initialPosition?: Point;
  elementWidth: number;
  elementHeight: number;
}

export function useDrag({
  containerRef,
  onDragChange,
  initialPosition = { x: 0, y: 0 },
  elementWidth,
  elementHeight
}: UseDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [dragStart, setDragStart] = useState<Point | null>(null);

  const handleDragStart = useCallback((event: MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    const pos = getRelativePosition(event, containerRef.current);
    setDragStart({
      x: pos.x - position.x,
      y: pos.y - position.y
    });
  }, [position, containerRef]);

  const handleDragMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !dragStart || !containerRef.current) return;

      const container = containerRef.current;
      const pos = getRelativePosition(event, container);
      
      const newPosition = constrainPosition(
        {
          x: pos.x - dragStart.x,
          y: pos.y - dragStart.y
        },
        container.clientWidth,
        container.clientHeight,
        elementWidth,
        elementHeight
      );

      setPosition(newPosition);
      onDragChange?.(newPosition);
    },
    [isDragging, dragStart, containerRef, elementWidth, elementHeight, onDragChange]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return {
    isDragging,
    position,
    handleDragStart
  };
}