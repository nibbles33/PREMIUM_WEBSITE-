/** Geometry for an object-fit: contain image inside a container. */

export type ContainedImageRect = {
  offsetX: number;
  offsetY: number;
  renderedWidth: number;
  renderedHeight: number;
  scale: number;
};

export type ObjectPositionFraction = {
  x: number;
  y: number;
};

const DEFAULT_OBJECT_POSITION: ObjectPositionFraction = { x: 0.5, y: 0.5 };

/**
 * Compute the rendered pixel rectangle of a contain-fit image.
 * object-position is expressed as fractions along each free axis (0 = start, 0.5 = center, 1 = end).
 */
export function getContainedImageRect(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number,
  objectPosition: ObjectPositionFraction = DEFAULT_OBJECT_POSITION,
): ContainedImageRect {
  if (containerWidth <= 0 || containerHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
    return {
      offsetX: 0,
      offsetY: 0,
      renderedWidth: 0,
      renderedHeight: 0,
      scale: 1,
    };
  }

  const scale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
  const renderedWidth = imageWidth * scale;
  const renderedHeight = imageHeight * scale;
  const freeX = containerWidth - renderedWidth;
  const freeY = containerHeight - renderedHeight;

  return {
    offsetX: freeX * objectPosition.x,
    offsetY: freeY * objectPosition.y,
    renderedWidth,
    renderedHeight,
    scale,
  };
}

export type PointerImageCoords = {
  localX: number;
  localY: number;
  relX: number;
  relY: number;
  inside: boolean;
};

/** Map a viewport pointer position to coordinates within the rendered image rect. */
export function pointerToImageCoords(
  clientX: number,
  clientY: number,
  containerRect: DOMRect,
  imageRect: ContainedImageRect,
): PointerImageCoords {
  const localX = clientX - containerRect.left;
  const localY = clientY - containerRect.top;
  const relX = localX - imageRect.offsetX;
  const relY = localY - imageRect.offsetY;
  const inside =
    relX >= 0 &&
    relY >= 0 &&
    relX <= imageRect.renderedWidth &&
    relY <= imageRect.renderedHeight;

  return { localX, localY, relX, relY, inside };
}

/** Clamp lens center so the circle stays inside the container. */
export function clampLensCenter(
  localX: number,
  localY: number,
  containerWidth: number,
  containerHeight: number,
  radius: number,
): { x: number; y: number } {
  return {
    x: Math.max(radius, Math.min(containerWidth - radius, localX)),
    y: Math.max(radius, Math.min(containerHeight - radius, localY)),
  };
}

/** Background size/position for a circular magnifier lens. */
export function magnifierBackgroundStyle(
  relX: number,
  relY: number,
  renderedWidth: number,
  renderedHeight: number,
  lensRadius: number,
  zoom: number,
): { backgroundSize: string; backgroundPosition: string } {
  const bgW = renderedWidth * zoom;
  const bgH = renderedHeight * zoom;
  const bgX = lensRadius - relX * zoom;
  const bgY = lensRadius - relY * zoom;
  return {
    backgroundSize: `${bgW}px ${bgH}px`,
    backgroundPosition: `${bgX}px ${bgY}px`,
  };
}
