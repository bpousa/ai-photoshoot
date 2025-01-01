import { useCallback } from 'react';
import { CropAreaState } from './useCropArea.types';

export function useCropAreaMove(
  area: CropAreaState,
  updateArea: (newArea: CropAreaState) => void
) {
  const handleMove = useCallback(
    (dx: number, dy: number) => {
      updateArea({
        ...area,
        x: area.x + dx,
        y: area.y + dy
      });
    },
    [area, updateArea]
  );

  return {
    handleMove
  };
}