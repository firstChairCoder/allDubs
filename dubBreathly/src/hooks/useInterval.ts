import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, interval = 1000) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const callbackRef = useRef<any>(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      callbackRef.current && callbackRef.current();
    };

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
}
