import type { Stats, Currency } from "../types/domain";

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

export function BronzeIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <circle cx="8" cy="8" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.4" />
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

export function GoldIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1 L10 5.5 L15 6 L11.5 9.5 L12.5 14.5 L8 12 L3.5 14.5 L4.5 9.5 L1 6 L6 5.5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function PlatinumIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1 L11.5 3 L14 6.5 L14 9.5 L11.5 13 L8 15 L4.5 13 L2 9.5 L2 6.5 L4.5 3 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M8 4 L10 5.5 L11 7.5 L11 8.5 L10 10.5 L8 12 L6 10.5 L5 8.5 L5 7.5 L6 5.5 Z"
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
  currency: Currency;
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

export function CurrencyIcon({ currency, className, size }: CurrencyIconProps) {
  switch (currency) {
    case "Bronze":
      return <BronzeIcon className={className} size={size} />;
    case "Silver":
      return <SilverIcon className={className} size={size} />;
    case "Gold":
      return <GoldIcon className={className} size={size} />;
    case "Platinum":
      return <PlatinumIcon className={className} size={size} />;
  }
}
