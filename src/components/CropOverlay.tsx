import React from 'react';

interface CropOverlayProps {
  x: number;
  y: number;
  width: number;
  height: number;
  onResize: (corner: string, dx: number, dy: number) => void;
  onMove: (dx: number, dy: number) => void;
}

export function CropOverlay({
  x,
  y,
  width,
  height,
  onResize,
  onMove
}: CropOverlayProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - x,
      y: e.clientY - y
    });
  };

  return (
    <div
      className="absolute border-2 border-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Corner handles */}
      <div className="absolute -left-1 -top-1 w-3 h-3 bg-white rounded-full" />
      <div className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full" />
      <div className="absolute -left-1 -bottom-1 w-3 h-3 bg-white rounded-full" />
      <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-white rounded-full" />
    </div>
  );
}