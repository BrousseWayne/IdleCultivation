import type { Stats } from "@/game/types/domain";
import { STAT_GLYPHS, MONEY_GLYPH } from "@/game/data/glyphs";

// Calligraphic text glyphs (font-glyph), tinted via className / currentColor.
// Same API as the old SVG icons: `size` maps to font-size in px.

export function Glyph({ char, className, size = 16, style }: { char: string; className?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <span
      className={`font-[family-name:var(--font-glyph)] leading-none select-none ${className ?? ""}`}
      style={{ fontSize: size, ...style }}
      aria-hidden
    >
      {char}
    </span>
  );
}

export function StatIcon({ stat, className, size }: { stat: Stats; className?: string; size?: number }) {
  return <Glyph char={STAT_GLYPHS[stat]} className={className} size={size} />;
}

export function CurrencyIcon({ className, size }: { className?: string; size?: number }) {
  return <Glyph char={MONEY_GLYPH} className={className} size={size} />;
}
