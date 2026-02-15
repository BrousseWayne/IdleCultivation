import { useEffect, useRef } from "react";
import { useZoomDetector } from "../hooks/useZoomDetector";
import { EventBus } from "../services";

interface ObfuscatedLifespanProps {
  value: number;
  className?: string;
}

export function ObfuscatedLifespan({ value, className = "" }: ObfuscatedLifespanProps) {
  const { normalizedZoom, zoomLevel } = useZoomDetector();
  const hasEmittedEvent = useRef(false);

  useEffect(() => {
    if (zoomLevel > 1.3 && !hasEmittedEvent.current) {
      hasEmittedEvent.current = true;
      EventBus.emit({
        type: "player:peered_at_fate",
        zoomLevel,
      });
    }
  }, [zoomLevel]);

  const intensity = Math.min(1.5, normalizedZoom * 0.9);
  const glowPower = 4 + intensity * 16;
  const dispersion = intensity * 8;
  const corruption = intensity > 1 ? (intensity - 1) * 2 : 0;

  return (
    <span className={`relative inline-block ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <span
        className="absolute inset-0"
        style={{
          color: 'rgba(255, 215, 0, 0.4)',
          transform: `translate(${dispersion}px, ${dispersion * 0.3}px) scale(${1 + intensity * 0.15})`,
          filter: `blur(${1 + intensity * 3}px)`,
          opacity: 0.5 + intensity * 0.3,
          textShadow: `0 0 ${glowPower * 1.5}px rgba(255, 215, 0, 0.9)`,
        }}
      >
        {value}
      </span>

      <span
        className="absolute inset-0"
        style={{
          color: 'rgba(138, 43, 226, 0.3)',
          transform: `translate(-${dispersion * 0.7}px, -${dispersion * 0.5}px) scale(${1 + intensity * 0.1})`,
          filter: `blur(${1.5 + intensity * 4}px)`,
          opacity: 0.4 + intensity * 0.4,
          textShadow: `0 0 ${glowPower * 2}px rgba(138, 43, 226, 0.8)`,
        }}
      >
        {value}
      </span>

      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg,
            rgba(255, 215, 0, ${0.3 + intensity * 0.4}),
            rgba(255, 140, 0, ${0.2 + intensity * 0.3}))`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `blur(${0.5 + intensity * 2}px) brightness(${1.3 + intensity * 0.7})`,
          textShadow: `
            0 0 ${glowPower}px rgba(255, 215, 0, 0.8),
            0 0 ${glowPower * 2}px rgba(255, 140, 0, 0.6),
            0 0 ${glowPower * 3}px rgba(255, 100, 0, 0.4)
          `,
          animation: "divine-shimmer 3s ease-in-out infinite",
        }}
      >
        {value}
      </span>

      <span
        className="relative z-10"
        style={{
          background: corruption > 0.5
            ? `linear-gradient(${corruption * 360}deg,
                rgba(255, 0, 0, 0.9),
                rgba(0, 255, 255, 0.9),
                rgba(255, 255, 0, 0.9))`
            : `linear-gradient(135deg,
                rgba(255, 255, 255, ${0.9 - intensity * 0.4}),
                rgba(45, 212, 191, ${0.8 - intensity * 0.3}),
                rgba(139, 92, 246, ${0.7 - intensity * 0.3}))`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `blur(${intensity * 2}px) brightness(${1.2 + intensity * 0.5}) ${corruption > 0.5 ? `invert(${corruption * 0.5})` : ''}`,
          textShadow: `
            0 0 ${glowPower * 2}px rgba(45, 212, 191, 0.6),
            0 0 ${glowPower * 4}px rgba(139, 92, 246, 0.4),
            ${dispersion}px ${dispersion * 0.5}px ${glowPower}px rgba(255, 215, 0, 0.5),
            -${dispersion}px -${dispersion * 0.5}px ${glowPower}px rgba(138, 43, 226, 0.5)
          `,
          letterSpacing: `${intensity * 4}px`,
          transform: corruption > 0.5 ? `scale(${1 + corruption * 0.3}) rotate(${corruption * 5}deg)` : undefined,
          animation: intensity > 1
            ? "reality-fracture 0.2s ease-in-out infinite, divine-pulse 0.5s ease-in-out infinite"
            : intensity > 0.5
            ? "reality-fracture 0.5s ease-in-out infinite, divine-pulse 1.5s ease-in-out infinite"
            : "divine-pulse 2.5s ease-in-out infinite",
        }}
      >
        {value}
      </span>
    </span>
  );
}
