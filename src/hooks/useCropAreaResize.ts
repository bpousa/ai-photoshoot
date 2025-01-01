import { useCallback } from 'react';
import { CropAreaState, ResizeHandle } from './useCropArea.types';

export function useCropAreaResize(
  area: CropAreaState,
  updateArea: (newArea: CropAreaState) => void,
  aspectRatio: number
) {
  const handleResize = useCallback(
    (handle: ResizeHandle, dx: number, dy: number) => {
      const newArea = { ...area };

      switch (handle) {
        case 'topLeft':
          newArea.x += dx;
          newArea.width -= dx;
          newArea.height = newArea.width / aspectRatio;
          break;
        case 'topRight':
          newArea.width += dx;
          newArea.height = newArea.width / aspectRatio;
          break;
        case 'bottomLeft':
          newArea.x += dx;
          newArea.width -= dx;
          newArea.height = newArea.width / aspectRatio;
          break;
        case 'bottomRight':
          newArea.width += dx;
          newArea.height = newArea.width / aspectRatio;
          break;
      }

      updateArea(newArea);
    },
    [area, updateArea, aspectRatio]
  );

  return {
    handleResize
  };
}