import { Button } from "@/components/ui/button";
import { Badge, Calendar, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore } from "../stores/gameStore";
import { events } from "../data/story";
import { currentDay, daysInMonth } from "../data/constant";

const getCalendarTitle = (
  calendarView,
  selectedDecade,
  selectedEra,
  selectedMonth,
  selectedYear
) => {
  switch (calendarView) {
    case "era":
      return `Era ${selectedEra} (Years ${(selectedEra - 1) * 1000 + 1}-${
        selectedEra * 1000
      })`;
    case "decade":
      return `Era ${selectedEra}, Decade ${selectedDecade} (Years ${
        (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + 1
      }-${(selectedEra - 1) * 1000 + selectedDecade * 10})`;
    case "year":
      return `Year ${
        (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + selectedYear
      }`;
    case "month":
      return `Year ${
        (selectedEra - 1) * 1000 + (selectedDecade - 1) * 10 + selectedYear
      }, Month ${selectedMonth}`;
    default:
      return "Calendar";
  }
};

export const RenderCalendarPage = () => {
  const calendarView = useGameStore((s) => s.calendarView);
  const selectedDecade = useGameStore((s) => s.selectedDecade);
  const selectedEra = useGameStore((s) => s.selectedEra);
  const selectedMonth = useGameStore((s) => s.selectedMonth);
  const selectedYear = useGameStore((s) => s.selectedYear);
  const showDetailedView = useGameStore((s) => s.showDetailedView);
  const selectedDate = useGameStore((s) => s.selectedDate);
  const setShowDetailedView = useGameStore((s) => s.setShowDetailedView);
  const setSelectedEra = useGameStore((s) => s.setSelectedEra);
  const setSelectedDecade = useGameStore((s) => s.setSelectedDecade);
  const setSelectedYear = useGameStore((s) => s.setSelectedYear);
  const setSelectedMonth = useGameStore((s) => s.setSelectedMonth);
  const setCalendarView = useGameStore((s) => s.setCalendarView);
  const setSelectedDate = useGameStore((s) => s.setSelectedDate);
  if (showDetailedView && selectedDate) {
    const dayEvents = events.filter((e) => e.date === selectedDate);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetailedView(false)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Calendar
          </Button>
          <h3 className="text-lg font-semibold">Day {selectedDate} Events</h3>
        </div>
        <div className="space-y-2">
          {dayEvents.length > 0 ? (
            dayEvents.map((event, index) => (
              <Card
                key={index}
                className={`border-border/50 ${
                  event.type === "future"
                    ? "bg-accent-violet/10 border-accent-violet/30"
                    : "bg-muted/30"
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{event.activity}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.result}
                      </p>
                    </div>
                    <Badge
                      variant={
                        event.type === "future" ? "secondary" : "outline"
                      }
                    >
                      {event.type === "future" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No events recorded for this day
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-sky mb-2">
          Cultivation Chronicle
        </h2>
        <p className="text-muted-foreground">
          Navigate through eons of your immortal journey
        </p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Button
            variant={calendarView === "era" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("era")}
            className="text-xs"
          >
            Era
          </Button>
          <Button
            variant={calendarView === "decade" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("decade")}
            className="text-xs"
          >
            Decade
          </Button>
          <Button
            variant={calendarView === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("year")}
            className="text-xs"
          >
            Year
          </Button>
          <Button
            variant={calendarView === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setCalendarView("month")}
            className="text-xs"
          >
            Month
          </Button>
        </div>

        <div className="h-4 w-px bg-slate-700"></div>

        {calendarView !== "era" && (
          <select
            value={selectedEra}
            onChange={(e) => setSelectedEra(Number(e.target.value))}
            className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Era {i + 1}
              </option>
            ))}
          </select>
        )}

        {(calendarView === "year" || calendarView === "month") && (
          <select
            value={selectedDecade}
            onChange={(e) => setSelectedDecade(Number(e.target.value))}
            className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
          >
            {Array.from({ length: 100 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Decade {i + 1}
              </option>
            ))}
          </select>
        )}

        {calendarView === "month" && (
          <>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Year {i + 1}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-black border border-slate-700/50 rounded px-2 py-1 text-xs"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Month {i + 1}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <Card className="bg-card border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4 text-accent-sky" />
            {getCalendarTitle(
              calendarView,
              selectedDecade,
              selectedEra,
              selectedMonth,
              selectedYear
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-slate-400 p-1"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasEvent = events.some((e) => e.date === day);
              const isCurrentDay = day === currentDay;
              const hasUpcomingEvent = events.some(
                (e) => e.date === day && e.type === "future"
              );

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDate(day);
                    setShowDetailedView(true);
                  }}
                  className={`
                      relative p-2 text-sm rounded hover:bg-slate-800/50 transition-colors
                      ${
                        isCurrentDay
                          ? "bg-accent-sky/20 border border-accent-sky/50"
                          : ""
                      }
                      ${hasEvent ? "font-semibold" : ""}
                    `}
                >
                  {day}
                  {isCurrentDay && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-accent-sky rounded-full"></div>
                  )}
                  {hasEvent && (
                    <div
                      className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                        hasUpcomingEvent ? "bg-accent-violet" : "bg-slate-300"
                      }`}
                    ></div>
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
