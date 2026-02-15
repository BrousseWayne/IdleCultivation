import { useState, useEffect } from "react";

export function useZoomDetector() {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const updateZoom = () => {
      const vvScale = window.visualViewport?.scale ?? 1;
      const dpr = window.devicePixelRatio || 1;
      const baselineDPR = 2;
      const zoomFromDPR = dpr / baselineDPR;

      const detectedZoom = Math.max(vvScale, zoomFromDPR);

      setZoomLevel(detectedZoom);
    };

    updateZoom();

    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", updateZoom);
      vv.addEventListener("scroll", updateZoom);
    }

    window.addEventListener("resize", updateZoom);

    const interval = setInterval(updateZoom, 500);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", updateZoom);
        vv.removeEventListener("scroll", updateZoom);
      }
      window.removeEventListener("resize", updateZoom);
      clearInterval(interval);
    };
  }, []);

  const normalizedZoom = Math.max(0, (zoomLevel - 1) / 1.5);

  return {
    zoomLevel,
    normalizedZoom,
    isZoomed: zoomLevel > 1.15,
  };
}
