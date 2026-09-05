/** Minimum pointer movement (px) before a rail treats the gesture as drag, not click. */
export const POINTER_DRAG_THRESHOLD_PX = 8;

export type PointerDragSession = {
  pending: boolean;
  active: boolean;
  startX: number;
  startY: number;
  pointerId: number;
  suppressClick: boolean;
};

export function createPointerDragSession(
  pointerId: number,
  clientX: number,
  clientY: number,
): PointerDragSession {
  return {
    pending: true,
    active: false,
    startX: clientX,
    startY: clientY,
    pointerId,
    suppressClick: false,
  };
}

export function idlePointerDragSession(): PointerDragSession {
  return {
    pending: false,
    active: false,
    startX: 0,
    startY: 0,
    pointerId: -1,
    suppressClick: false,
  };
}

/** Returns true once movement crosses the drag threshold. */
export function activatePointerDragIfNeeded(
  session: PointerDragSession,
  clientX: number,
  clientY: number,
): boolean {
  if (session.active || !session.pending) return session.active;

  const deltaX = clientX - session.startX;
  const deltaY = clientY - session.startY;
  if (
    Math.abs(deltaX) < POINTER_DRAG_THRESHOLD_PX &&
    Math.abs(deltaY) < POINTER_DRAG_THRESHOLD_PX
  ) {
    return false;
  }

  session.active = true;
  session.pending = false;
  session.suppressClick = true;
  return true;
}

/** Swallow the synthetic click that follows a completed drag gesture. */
export function suppressClickAfterDrag(container: HTMLElement | null) {
  if (!container) return;

  const blockClick = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    container.removeEventListener("click", blockClick, true);
  };

  container.addEventListener("click", blockClick, true);
  window.setTimeout(() => {
    container.removeEventListener("click", blockClick, true);
  }, 0);
}
