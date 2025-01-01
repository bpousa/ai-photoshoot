import { Point } from './dragUtils';

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function maintainAspectRatio(
  newWidth: number,
  newHeight: number,
  aspectRatio: number,
  isWidthConstrained: boolean
): { width: number; height: number } {
  if (isWidthConstrained) {
    return {
      width: newWidth,
      height: newWidth / aspectRatio
    };
  } else {
    return {
      width: newHeight * aspectRatio,
      height: newHeight
    };
  }
}

export function constrainCropArea(
  area: CropArea,
  containerWidth: number,
  containerHeight: number,
  aspectRatio: number
): CropArea {
  let { x, y, width, height } = area;

  // Ensure width and height maintain aspect ratio
  const dimensions = maintainAspectRatio(
    width,
    height,
    aspectRatio,
    width > height
  );
  width = dimensions.width;
  height = dimensions.height;

  // Constrain to container
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + width > containerWidth) x = containerWidth - width;
  if (y + height > containerHeight) y = containerHeight - height;

  return { x, y, width, height };
}