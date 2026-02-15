import { useEffect, useRef } from "react";
import { useZoomDetector } from "../hooks/useZoomDetector";

interface Particle {
  x: number;
  y: number;
  char: string;
  opacity: number;
  speed: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
}

const HEAVENLY_RUNES = ["天", "地", "玄", "黄", "宇", "宙", "洪", "荒", "日", "月", "盈", "昃", "辰", "宿", "列", "张"];

export function HeavenlyVeil() {
  const { normalizedZoom, zoomLevel } = useZoomDetector();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particleCount = Math.floor(10 + normalizedZoom * 40);

    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: HEAVENLY_RUNES[Math.floor(Math.random() * HEAVENLY_RUNES.length)],
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const intensity = Math.min(1, normalizedZoom);

      particlesRef.current.forEach((p) => {
        p.y -= p.speed * (1 + intensity * 2);
        p.rotation += p.rotationSpeed;
        p.opacity = Math.min(0.6, 0.1 + intensity * 0.5);

        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        const fontSize = (20 + intensity * 30) * p.scale;
        ctx.font = `${fontSize}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, fontSize);
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.9 - intensity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(255, 180, 50, ${0.7 - intensity * 0.2})`);
        gradient.addColorStop(1, `rgba(255, 140, 0, 0)`);

        ctx.shadowColor = "rgba(255, 215, 0, 0.8)";
        ctx.shadowBlur = 10 + intensity * 20;
        ctx.fillStyle = gradient;
        ctx.fillText(p.char, 0, 0);

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [normalizedZoom]);

  const intensity = Math.min(1, normalizedZoom * 1.2);
  const screenDistortion = intensity * 15;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          mixBlendMode: intensity > 0.3 ? "screen" : "normal",
          opacity: 0.4 + intensity * 0.6,
        }}
      />

      {intensity > 0.15 && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{
            background: `radial-gradient(circle at 50% 50%,
              transparent ${65 - intensity * 45}%,
              rgba(139, 92, 246, ${intensity * 0.2}) ${75 - intensity * 25}%,
              rgba(59, 130, 246, ${intensity * 0.3}) ${88 - intensity * 18}%,
              rgba(0, 0, 0, ${intensity * 0.6}) 100%)`,
          }}
        />
      )}

      {intensity > 0.3 && (
        <div
          className="fixed inset-0 pointer-events-none z-[9997]"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, ${intensity * 0.4}) 2px,
              rgba(0, 0, 0, ${intensity * 0.4}) 3px
            )`,
            animation: "scan-lines-fast 0.1s linear infinite",
            opacity: 0.6 + intensity * 0.4,
          }}
        />
      )}

      {intensity > 0.5 && (
        <div
          className="fixed inset-0 pointer-events-none z-[9996]"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              rgba(255, 0, 0, ${intensity * 0.03}),
              rgba(255, 0, 0, ${intensity * 0.03}) 1px,
              rgba(0, 255, 255, ${intensity * 0.03}) 1px,
              rgba(0, 255, 255, ${intensity * 0.03}) 2px
            )`,
            animation: "rgb-split 0.3s infinite",
          }}
        />
      )}

      {intensity > 0.7 && (
        <>
          <div
            className="fixed inset-0 pointer-events-none z-[9995]"
            style={{
              background: intensity > 0.85 ? `rgba(255, 255, 255, ${(intensity - 0.85) * 0.15})` : 'transparent',
              mixBlendMode: 'difference',
              animation: "reality-invert 0.2s infinite",
            }}
          />
          <div
            className="fixed inset-0 pointer-events-none z-[9994]"
            style={{
              background: `linear-gradient(
                ${intensity * 180}deg,
                transparent 0%,
                rgba(138, 43, 226, ${intensity * 0.2}) 25%,
                transparent 50%,
                rgba(255, 215, 0, ${intensity * 0.2}) 75%,
                transparent 100%
              )`,
              animation: "reality-wave 1s ease-in-out infinite",
            }}
          />
        </>
      )}
    </>
  );
}
