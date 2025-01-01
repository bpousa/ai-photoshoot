import React from 'react';

interface PhotoCropperProps {
  imageUrl: string;
  aspectRatio?: number;
  onCrop: (croppedData: { x: number; y: number; width: number; height: number }) => void;
}

export function PhotoCropper({ imageUrl, aspectRatio = 1, onCrop }: PhotoCropperProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-gray-100"
        style={{ aspectRatio: String(aspectRatio) }}
      >
        <img
          src={imageUrl}
          alt="Image to crop"
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Crop Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
          <button
            onClick={() => onCrop({ x: 0, y: 0, width: 100, height: 100 })}
            className="px-4 py-2 bg-white rounded-lg text-sm font-medium"
          >
            Crop
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}