import type { Currency } from "@/game/types/domain";

export const CURRENCY_VALUE: Record<Currency, number> = {
  Bronze: 1,
  Silver: 100,
  Gold: 10_000,
  Platinum: 1_000_000,
};

export function toCurrency(currency: Currency, amount: number): number {
  return amount * CURRENCY_VALUE[currency];
}
