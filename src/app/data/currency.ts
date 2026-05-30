import type { Currency } from "../types/domain";

export const CURRENCY_VALUE: Record<Currency, number> = {
  Bronze: 1,
  Silver: 100,
  Gold: 10_000,
  Platinum: 1_000_000,
};

export function toSpiritStones(currency: Currency, amount: number): number {
  return amount * CURRENCY_VALUE[currency];
}
