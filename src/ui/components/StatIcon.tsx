import type { Stats } from "@/game/types/domain";

type IconProps = {
  className?: string;
  size?: number;
};

export function StrengthIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <rect
        x="4"
        y="4"
        width="8"
        height="8"
        transform="rotate(0 8 8)"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="6"
        y="6"
        width="4"
        height="4"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

export function DexterityIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 2 L14 12 L2 12 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M8 5 L11 10 L5 10 Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

export function SilverIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1 L13 4.5 L13 11.5 L8 15 L3 11.5 L3 4.5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M8 4 L11 6 L11 10 L8 12 L5 10 L5 6 Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

type StatIconProps = {
  stat: Stats;
  className?: string;
  size?: number;
};

type CurrencyIconProps = {
  className?: string;
  size?: number;
};

export function StatIcon({ stat, className, size }: StatIconProps) {
  switch (stat) {
    case "Strength":
      return <StrengthIcon className={className} size={size} />;
    case "Dexterity":
      return <DexterityIcon className={className} size={size} />;
  }
}

// Single silver coin — currency collapsed to one denomination.
export function CurrencyIcon({ className, size }: CurrencyIconProps) {
  return <SilverIcon className={className} size={size} />;
}
