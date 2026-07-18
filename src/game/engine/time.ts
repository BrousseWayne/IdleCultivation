// The canonical clock. Every duration in the game derives from here —
// nothing else is allowed to hard-code a 24, 30 or 60.
//
import type { CalendarPeriod } from "@/game/types/gameEvents";

// One tick is one in-game hour. At speed ×1 the loop runs 24 ticks per real
// second, so one day passes per real second and one year per real minute
// (see docs/design/core-loop.md — pacing decisions, 2026-07).

export const TICKS_PER_SECOND = 24;

export const HOURS_PER_DAY = 24;
export const TICKS_PER_DAY = HOURS_PER_DAY; // 1 tick = 1 hour

export const DAYS_PER_MONTH = 30;
export const DAYS_PER_YEAR = 60;
export const MONTHS_PER_YEAR = DAYS_PER_YEAR / DAYS_PER_MONTH;

export function periodLengthInDays(period: CalendarPeriod): number {
  return period === "month" ? DAYS_PER_MONTH : DAYS_PER_YEAR;
}
