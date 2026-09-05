#!/usr/bin/env node
/** Unit checks for object-fit: contain magnifier coordinate math. */

function getContainedImageRect(containerWidth, containerHeight, imageWidth, imageHeight, objectPosition = { x: 0.5, y: 0.5 }) {
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

function pointerToImageCoords(clientX, clientY, containerRect, imageRect) {
  const localX = clientX - containerRect.left;
  const localY = clientY - containerRect.top;
  const relX = localX - imageRect.offsetX;
  const relY = localY - imageRect.offsetY;
  const inside =
    relX >= 0 && relY >= 0 && relX <= imageRect.renderedWidth && relY <= imageRect.renderedHeight;
  return { localX, localY, relX, relY, inside };
}

function magnifierBackgroundStyle(relX, relY, renderedWidth, renderedHeight, lensRadius, zoom) {
  const bgW = renderedWidth * zoom;
  const bgH = renderedHeight * zoom;
  return {
    backgroundSize: `${bgW}px ${bgH}px`,
    backgroundPosition: `${lensRadius - relX * zoom}px ${lensRadius - relY * zoom}px`,
  };
}

function clampLensCenter(localX, localY, containerWidth, containerHeight, radius) {
  return {
    x: Math.max(radius, Math.min(containerWidth - radius, localX)),
    y: Math.max(radius, Math.min(containerHeight - radius, localY)),
  };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const rect = getContainedImageRect(400, 400, 1600, 900);
assert(Math.abs(rect.renderedWidth - 400) < 0.01, "width should fill container");
assert(Math.abs(rect.renderedHeight - 225) < 0.01, "height should letterbox");
assert(Math.abs(rect.offsetY - 87.5) < 0.01, "vertical centering offset");

const containerRect = { left: 100, top: 50, width: 400, height: 400 };
const center = pointerToImageCoords(300, 250, containerRect, rect);
assert(center.inside, "center of image should be inside");
assert(Math.abs(center.relX - 200) < 0.01, "relX at horizontal center");
assert(Math.abs(center.relY - 112.5) < 0.01, "relY at vertical center of rendered image");

const letterbox = pointerToImageCoords(300, 60, containerRect, rect);
assert(!letterbox.inside, "point above image should be outside");

const bg = magnifierBackgroundStyle(200, 112.5, rect.renderedWidth, rect.renderedHeight, 100, 1.9);
assert(bg.backgroundSize === "760px 427.5px", `bg size: ${bg.backgroundSize}`);
assert(bg.backgroundPosition === "-280px -113.75px", `bg pos: ${bg.backgroundPosition}`);

const clamped = clampLensCenter(10, 10, 400, 400, 100);
assert(clamped.x === 100 && clamped.y === 100, "lens should clamp to radius inset");

console.log("OK magnifier coordinate math");
