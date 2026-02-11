import { useEffect, useRef, useState } from "react";

export function useLerpNumber(target: number, speed = 0.1): number {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number>(0);
  const currentRef = useRef(target);

  useEffect(() => {
    const animate = () => {
      const diff = target - currentRef.current;
      if (Math.abs(diff) < 0.5) {
        currentRef.current = target;
        setDisplay(target);
        return;
      }
      currentRef.current += diff * speed;
      setDisplay(Math.round(currentRef.current));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, speed]);

  return display;
}
