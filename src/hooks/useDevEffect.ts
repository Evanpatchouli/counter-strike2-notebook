import { DependencyList, EffectCallback, useEffect } from "react";

export default function useDevEffect(effect: EffectCallback, deps?: DependencyList) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      effect();
    }
  }, deps);
}
