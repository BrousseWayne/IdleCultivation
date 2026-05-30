import { useState, useEffect, useRef } from "react";

const ZOOM_THRESHOLD_ZOOMED = 1.15;
const ZOOM_NORMALIZATION_FACTOR = 1.5;

export function useZoomDetector() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const debounceTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updateZoom = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        const vvScale = window.visualViewport?.scale ?? 1;
        setZoomLevel(vvScale);
      }, 50);
    };

    updateZoom();

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateZoom);
      vv.addEventListener("scroll", updateZoom);
    }

    window.addEventListener("resize", updateZoom);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", updateZoom);
        vv.removeEventListener("scroll", updateZoom);
      }
      window.removeEventListener("resize", updateZoom);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const normalizedZoom = Math.max(0, (zoomLevel - 1) / ZOOM_NORMALIZATION_FACTOR);

  return {
    zoomLevel,
    normalizedZoom,
    isZoomed: zoomLevel > ZOOM_THRESHOLD_ZOOMED,
  };
}
