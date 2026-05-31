import { type ReactNode } from "react";

type EffectType = "sparkle" | "holographic" | "prismatic" | null;

interface EtherealEffectProps {
  children: ReactNode;
  effect: EffectType;
  className?: string;
}

export function EtherealEffect({ children, effect, className = "" }: EtherealEffectProps) {
  if (!effect) {
    return <>{children}</>;
  }

  const effectClass = effect ? `effect-${effect}` : "";

  return (
    <span className={`inline-block ${effectClass} ${className}`}>
      {children}
    </span>
  );
}
