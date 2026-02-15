import { useMemo, useEffect, useRef } from "react";
import { useZoomDetector } from "../hooks/useZoomDetector";
import { EventBus } from "../services";

interface ObfuscatedLifespanProps {
  value: number;
  className?: string;
}

const GLITCH_CHARS = ["▓", "▒", "░", "◆", "◇", "◈", "※"];
const RUNE_CHARS = ["天", "地", "玄", "黄", "宇", "宙"];
const VOID_CHARS = ["█", "▆", "▄", "▂"];

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

  const intensity = Math.min(2.2, normalizedZoom * 0.95);
  const corruption = Math.min(1, Math.max(0, (intensity - 0.3) * 0.85));
  const glowStrength = 5 + intensity * 22;
  const chromatic = intensity * 11;

  const displayValue = useMemo(() => {
    if (corruption < 0.25) return value.toString();

    const str = value.toString();
    const time = Date.now();

    return str.split('').map((char, i) => {
      const phase = Math.sin(i * 2.5 + time / 450) * 0.18;
      const localCorruption = Math.min(1, corruption + phase);

      if (localCorruption < 0.35) return char;
      if (localCorruption < 0.55) {
        return Math.random() > 0.6 ? char : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      if (localCorruption < 0.75) {
        return RUNE_CHARS[Math.floor(Math.random() * RUNE_CHARS.length)];
      }
      return VOID_CHARS[Math.floor(Math.random() * VOID_CHARS.length)];
    }).join('');
  }, [value, corruption]);

  const jadeGlow = `0 0 ${glowStrength * 1.8}px rgba(45, 212, 191, ${Math.min(1, 0.7 - corruption * 0.45)})`;
  const goldGlow = `0 0 ${glowStrength * 2.4}px rgba(255, 215, 0, ${Math.min(1, 0.65 - corruption * 0.4)})`;
  const violetGlow = `0 0 ${glowStrength * 3}px rgba(139, 92, 246, ${Math.min(1, 0.5 - corruption * 0.35)})`;

  return (
    <span className={`relative inline-block ${className}`} style={{ position: 'relative', display: 'inline-block', minWidth: '1.5em' }}>
      <span
        className="absolute inset-0"
        style={{
          color: `rgba(255, 215, 0, ${0.45 - corruption * 0.25})`,
          transform: `translate(${chromatic * 0.9}px, ${chromatic * 0.35}px) scale(${1 + intensity * 0.18})`,
          filter: `blur(${1.8 + intensity * 5.5}px)`,
          opacity: Math.max(0, 0.65 - corruption * 0.45),
          textShadow: goldGlow,
        }}
      >
        {displayValue}
      </span>

      <span
        className="absolute inset-0"
        style={{
          color: `rgba(139, 92, 246, ${0.4 - corruption * 0.2})`,
          transform: `translate(-${chromatic * 0.75}px, -${chromatic * 0.5}px) scale(${1 + intensity * 0.14})`,
          filter: `blur(${2.2 + intensity * 6.5}px)`,
          opacity: Math.max(0, 0.55 - corruption * 0.35),
          textShadow: violetGlow,
        }}
      >
        {displayValue}
      </span>

      <span
        className="absolute inset-0"
        style={{
          background: `linear-gradient(125deg, rgba(255, 255, 255, ${0.12 - corruption * 0.08}), rgba(45, 212, 191, ${0.18 - corruption * 0.1}) 35%, rgba(255, 215, 0, ${0.15 - corruption * 0.09}) 65%, rgba(139, 92, 246, ${0.12 - corruption * 0.08}))`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `blur(${0.6 + intensity * 2}px)`,
          opacity: corruption < 0.7 ? 0.85 : 0.4,
          textShadow: `${jadeGlow}, ${goldGlow}`,
        }}
      >
        {displayValue}
      </span>

      <span
        className="relative z-10"
        style={{
          background: corruption > 0.65
            ? `linear-gradient(${(Date.now() / 8) % 360}deg, rgba(255, 40, 80, 0.95), rgba(40, 255, 255, 0.95) 33%, rgba(255, 255, 40, 0.95) 66%, rgba(255, 40, 255, 0.95))`
            : `linear-gradient(145deg, rgba(255, 255, 255, ${0.92 - intensity * 0.48}), rgba(45, 212, 191, ${0.85 - intensity * 0.42}), rgba(139, 92, 246, ${0.75 - intensity * 0.38}))`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `blur(${intensity * 3.5}px) brightness(${1.25 + intensity * 0.65}) ${corruption > 0.75 ? `invert(${(corruption - 0.7) * 2.5}) saturate(${1 + corruption})` : ''}`,
          textShadow: `${jadeGlow}, ${goldGlow}, ${violetGlow}, ${chromatic * 1.4}px ${chromatic * 0.7}px ${glowStrength * 1.2}px rgba(255, 215, 0, ${0.6 - corruption * 0.35}), -${chromatic * 1.4}px -${chromatic * 0.7}px ${glowStrength * 1.2}px rgba(138, 43, 226, ${0.6 - corruption * 0.35})`,
          letterSpacing: `${intensity * 6.5}px`,
          transform: corruption > 0.65
            ? `scale(${1 + corruption * 0.45}) rotate(${Math.sin(Date.now() / 85) * corruption * 12}deg) skew(${Math.cos(Date.now() / 95) * corruption * 8}deg)`
            : undefined,
          opacity: Math.max(0.08, 1 - corruption * 0.75),
          animation: intensity > 1.3
            ? "fate-shatter 0.12s ease-in-out infinite, void-breathe 0.25s ease-in-out infinite"
            : intensity > 0.7
            ? "fate-shatter 0.35s ease-in-out infinite, void-breathe 1s ease-in-out infinite"
            : "void-breathe 2.8s ease-in-out infinite",
        }}
      >
        {displayValue}
      </span>
    </span>
  );
}
