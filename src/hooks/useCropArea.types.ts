export interface CropAreaState {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UseCropAreaProps {
  containerWidth: number;
  containerHeight: number;
  aspectRatio: number;
  initialArea?: CropAreaState;
  onChange?: (area: CropAreaState) => void;
}

export type ResizeHandle = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';