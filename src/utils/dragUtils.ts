export interface Point {
  x: number;
  y: number;
}

export function getRelativePosition(event: MouseEvent | React.MouseEvent, element: HTMLElement): Point {
  const rect = element.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

export function constrainPosition(
  position: Point,
  containerWidth: number,
  containerHeight: number,
  elementWidth: number,
  elementHeight: number
): Point {
  return {
    x: Math.max(0, Math.min(position.x, containerWidth - elementWidth)),
    y: Math.max(0, Math.min(position.y, containerHeight - elementHeight))
  };
}