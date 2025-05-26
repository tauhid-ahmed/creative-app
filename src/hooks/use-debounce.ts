"use client";

import { useRef, useCallback } from "react";

type Callback<Args extends unknown[]> = (...args: Args) => void;

export function useDebounce<Args extends unknown[]>(
  callback: Callback<Args>,
  delay: number
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounced;
}
