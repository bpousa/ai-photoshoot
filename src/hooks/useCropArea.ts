import { useState, useCallback } from 'react';
import { UseCropAreaProps, CropAreaState, ResizeHandle } from './useCropArea.types';
import { constrainCropArea } from '@/utils/cropUtils';

export function useCropArea({
  containerWidth,
  containerHeight,
  aspectRatio,
  initialArea,
  onChange
}: UseCropAreaProps) {
  const [area, setArea] = useState<CropAreaState>(
    initialArea || {
      x: 0,
      y: 0,
      width: containerWidth,
      height: containerWidth / aspectRatio
    }
  );

  const updateArea = useCallback(
    (newArea: CropAreaState) => {
      const constrained = constrainCropArea(
        newArea,
        containerWidth,
        containerHeight,
        aspectRatio
      );
      setArea(constrained);
      onChange?.(constrained);
    },
    [containerWidth, containerHeight, aspectRatio, onChange]
  );

  return {
    area,
    updateArea
  };
}