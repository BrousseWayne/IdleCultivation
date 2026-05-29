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
  hue: number;
}

const HEAVENLY_RUNES = ["天", "地", "玄", "黄", "宇", "宙", "洪", "荒", "日", "月", "盈", "昃", "辰", "宿", "列", "張", "寒", "來", "暑", "往"];
const JADE = { r: 45, g: 212, b: 191 };
const GOLD = { r: 255, g: 215, b: 0 };
const MIN_PARTICLES = 12;
const MAX_PARTICLES_ZOOM_MULTIPLIER = 45;

export function HeavenlyVeil() {
  const { normalizedZoom } = useZoomDetector();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const glitchOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const targetCount = Math.floor(MIN_PARTICLES + normalizedZoom * MAX_PARTICLES_ZOOM_MULTIPLIER);
    while (particlesRef.current.length < targetCount) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        char: HEAVENLY_RUNES[Math.floor(Math.random() * HEAVENLY_RUNES.length)],
        opacity: Math.random() * 0.2 + 0.15,
        speed: Math.random() * 0.4 + 0.25,
        scale: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        hue: Math.random() * 30 - 15,
      });
    }

    const animate = () => {
      const intensity = Math.min(1.2, normalizedZoom);
      const corruption = Math.max(0, intensity - 0.6);

      if (corruption > 0.3 && Math.random() < corruption * 0.15) {
        glitchOffsetRef.current = {
          x: (Math.random() - 0.5) * corruption * 20,
          y: (Math.random() - 0.5) * corruption * 15,
        };
      } else if (Math.random() < 0.7) {
        glitchOffsetRef.current.x *= 0.8;
        glitchOffsetRef.current.y *= 0.8;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.y -= p.speed * (1 + intensity * 2.5);
        p.rotation += p.rotationSpeed * (1 + corruption * 2);
        p.opacity = Math.min(0.7, 0.15 + intensity * 0.55);

        if (p.y < -60) {
          p.y = canvas.height + 60;
          p.x = Math.random() * canvas.width;
          p.char = HEAVENLY_RUNES[Math.floor(Math.random() * HEAVENLY_RUNES.length)];
        }

        ctx.save();
        ctx.translate(
          p.x + glitchOffsetRef.current.x * p.scale,
          p.y + glitchOffsetRef.current.y * p.scale
        );
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity * (1 - corruption * 0.3);

        const fontSize = (22 + intensity * 35) * p.scale;
        ctx.font = `${Math.floor(fontSize)}px "Noto Serif SC", serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const colorMix = corruption > 0.5 ? corruption : 0;
        const baseColor = {
          r: GOLD.r * (1 - colorMix) + 255 * colorMix,
          g: GOLD.g * (1 - colorMix) + 50 * colorMix,
          b: GOLD.b * (1 - colorMix) + 255 * colorMix,
        };

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, fontSize * 0.8);
        gradient.addColorStop(0, `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${0.95 - corruption * 0.2})`);
        gradient.addColorStop(0.4, `rgba(${baseColor.r * 0.9}, ${baseColor.g * 0.8}, ${baseColor.b * 0.6}, ${0.75 - corruption * 0.15})`);
        gradient.addColorStop(1, `rgba(${baseColor.r * 0.7}, ${baseColor.g * 0.5}, ${baseColor.b * 0.3}, 0)`);

        const glowColor = corruption > 0.6
          ? `rgba(${255 * Math.random()}, ${255 * Math.random()}, ${255 * Math.random()}, ${corruption})`
          : `rgba(${JADE.r}, ${JADE.g}, ${JADE.b}, ${0.6 + corruption * 0.4})`;

        ctx.shadowColor = glowColor;
        ctx.shadowBlur = (12 + intensity * 28) * (1 + corruption);
        ctx.fillStyle = gradient;
        ctx.fillText(p.char, 0, 0);

        if (corruption > 0.5) {
          ctx.shadowBlur = 2;
          ctx.globalAlpha *= 0.4;
          ctx.fillText(p.char, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6);
        }

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

  const intensity = Math.min(1, normalizedZoom * 1.1);
  const corruption = Math.max(0, (intensity - 0.5) * 2);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          mixBlendMode: intensity > 0.35 ? "screen" : "normal",
          opacity: Math.min(1, 0.5 + intensity * 0.5),
          filter: corruption > 0.6 ? `hue-rotate(${corruption * 60}deg) saturate(${1 + corruption * 0.5})` : undefined,
        }}
      />

      {intensity > 0.2 && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{
            background: `radial-gradient(ellipse at 50% 45%,
              transparent ${Math.max(15, 68 - intensity * 50)}%,
              rgba(88, 28, 135, ${intensity * 0.15}) ${Math.max(40, 78 - intensity * 30)}%,
              rgba(30, 58, 138, ${intensity * 0.25}) ${Math.max(60, 90 - intensity * 20)}%,
              rgba(0, 0, 0, ${Math.min(0.85, intensity * 0.7)}) 100%)`,
          }}
        />
      )}

      {intensity > 0.35 && (
        <>
          <div
            className="fixed inset-0 pointer-events-none z-[9997]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                rgba(0, 0, 0, ${Math.min(0.5, intensity * 0.45)}) 1px,
                transparent 2px
              )`,
              animation: "crt-scanlines 0.08s linear infinite",
              opacity: Math.min(1, 0.5 + intensity * 0.5),
            }}
          />
          <div
            className="fixed inset-0 pointer-events-none z-[9997]"
            style={{
              background: `linear-gradient(
                0deg,
                transparent 0%,
                rgba(${JADE.r}, ${JADE.g}, ${JADE.b}, ${intensity * 0.03}) 50%,
                transparent 100%
              )`,
              animation: "phosphor-glow 4s ease-in-out infinite",
            }}
          />
        </>
      )}

      {intensity > 0.55 && (
        <div
          className="fixed inset-0 pointer-events-none z-[9996]"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              rgba(255, 30, 60, ${corruption * 0.08}) 0px,
              transparent 1px,
              transparent 2px,
              rgba(30, 255, 255, ${corruption * 0.08}) 3px,
              transparent 4px
            )`,
            animation: "chromatic-drift 0.25s ease-in-out infinite",
          }}
        />
      )}

      {intensity > 0.75 && (
        <>
          <div
            className="fixed inset-0 pointer-events-none z-[9995]"
            style={{
              background: corruption > 0.85
                ? `rgba(255, 255, 255, ${(corruption - 0.8) * 0.25})`
                : 'transparent',
              mixBlendMode: 'exclusion',
              animation: "void-flash 0.12s steps(2, end) infinite",
            }}
          />
          <div
            className="fixed inset-0 pointer-events-none z-[9994]"
            style={{
              background: `repeating-linear-gradient(
                ${corruption * 45}deg,
                transparent,
                transparent 4px,
                rgba(139, 92, 246, ${corruption * 0.06}) 4px,
                rgba(139, 92, 246, ${corruption * 0.06}) 8px
              )`,
              animation: "reality-tear 0.35s ease-in-out infinite",
            }}
          />
        </>
      )}
    </>
  );
}
