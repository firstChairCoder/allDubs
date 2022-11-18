import { useEffect } from "react";

type EffectCallback = () => void | (() => void);

export function useOnMount(onMount: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onMount, []);
}
