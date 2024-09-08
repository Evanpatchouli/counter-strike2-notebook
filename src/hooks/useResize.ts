import { useEffect, useState, RefObject } from "react";

function useResize(callback?: () => void, ref?: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (ref && ref.current) {
        setSize({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      } else {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
      callback?.();
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [callback, ref]);

  return size;
}

export default useResize;
