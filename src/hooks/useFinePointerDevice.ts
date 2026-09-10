"use client";

import { useEffect, useState } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/** True when the device supports hover with a fine pointer (desktop mouse/trackpad). */
export function useFinePointerDevice(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER_QUERY);
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return enabled;
}

export { FINE_POINTER_QUERY };
