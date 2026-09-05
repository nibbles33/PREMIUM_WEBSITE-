"use client";

import { useCallback } from "react";

type CoverageTabItem = { id: string };

/** Arrow/Home/End keyboard navigation for coverage explorer tablists. */
export function useCoverageTabKeyboard<T extends CoverageTabItem>(
  items: T[],
  activeId: string,
  setActiveId: (id: string) => void,
  tabIdPrefix: string,
) {
  return useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const count = items.length;
      if (count === 0) return;

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = (index + 1) % count;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = (index - 1 + count) % count;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = count - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextItem = items[nextIndex];
      setActiveId(nextItem.id);
      document.getElementById(`${tabIdPrefix}-tab-${nextItem.id}`)?.focus();
    },
    [items, setActiveId, tabIdPrefix],
  );
}
