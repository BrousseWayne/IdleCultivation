import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore } from "@/game/stores/gameStore";
import { DAYS_PER_MONTH, MONTHS_PER_YEAR } from "@/game/engine/time";
import { PageHeader } from "@/ui/components/PageHeader";
import { Glyph } from "@/ui/components/StatIcon";
import { text } from "@/game/content/text";

function dateFromDay(day: number) {
  const d = Math.max(1, day) - 1;
  return {
    year: Math.floor(d / (MONTHS_PER_YEAR * DAYS_PER_MONTH)) + 1,
    month: Math.floor(d / DAYS_PER_MONTH) % MONTHS_PER_YEAR + 1,
    dayOfMonth: (d % DAYS_PER_MONTH) + 1,
  };
}

export const RenderCalendarPage = () => {
  const day = useGameStore((state) => state.day);
  const selectedMonth = useGameStore((state) => state.selectedMonth);
  const selectedYear = useGameStore((state) => state.selectedYear);
  const setSelectedYear = useGameStore((state) => state.setSelectedYear);
  const setSelectedMonth = useGameStore((state) => state.setSelectedMonth);
  const selectedDate = useGameStore((state) => state.selectedDate);
  const showDetailedView = useGameStore((state) => state.showDetailedView);
  const setSelectedDate = useGameStore((state) => state.setSelectedDate);
  const setShowDetailedView = useGameStore((state) => state.setShowDetailedView);

  const today = dateFromDay(day);
  const viewingCurrentMonth = selectedYear === today.year && selectedMonth === today.month;

  if (showDetailedView && selectedDate) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetailedView(false)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {text("page.recap.backToCalendar")}
          </Button>
          <h3 className="text-lg font-semibold text-ink">{text("page.recap.dayEvents", { day: selectedDate })}</h3>
        </div>
        <p className="text-ink-2 text-center py-8">{text("page.recap.empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        glyph="曆"
        title={text("page.recap.title")}
        color="text-accent-sky"
        subtitle={text("page.recap.subtitle")}
      />

      <div className="flex items-center gap-2 mb-4">
        <select
          value={selectedYear}
          onChange={(changeEvent) => setSelectedYear(Number(changeEvent.target.value))}
          className="bg-background border border-line-2 rounded px-2 py-1 text-xs text-ink"
        >
          {Array.from({ length: Math.max(today.year, 1) }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Year {i + 1}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(changeEvent) => setSelectedMonth(Number(changeEvent.target.value))}
          className="bg-background border border-line-2 rounded px-2 py-1 text-xs text-ink"
        >
          {Array.from({ length: MONTHS_PER_YEAR }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Month {i + 1}
            </option>
          ))}
        </select>
      </div>

      <Card className="bg-panel border-line">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base text-ink">
            <Glyph char="曆" size={16} className="text-accent-sky" />
            Year {selectedYear}, Month {selectedMonth}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {[
              text("page.recap.weekday.sun"),
              text("page.recap.weekday.mon"),
              text("page.recap.weekday.tue"),
              text("page.recap.weekday.wed"),
              text("page.recap.weekday.thu"),
              text("page.recap.weekday.fri"),
              text("page.recap.weekday.sat"),
            ].map((weekday) => (
              <div
                key={weekday}
                className="text-center text-xs font-semibold text-ink-2 p-1"
              >
                {weekday}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: DAYS_PER_MONTH }, (_, i) => {
              const dayOfMonth = i + 1;
              const isToday = viewingCurrentMonth && dayOfMonth === today.dayOfMonth;
              return (
                <button
                  key={dayOfMonth}
                  onClick={() => {
                    setSelectedDate(dayOfMonth);
                    setShowDetailedView(true);
                  }}
                  className={`
                      relative p-2 text-sm text-center rounded text-ink hover:bg-panel-2 transition-colors
                      ${isToday ? "bg-accent-sky/20 border border-accent-sky/50" : ""}
                    `}
                >
                  {dayOfMonth}
                  {isToday && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-accent-sky rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
