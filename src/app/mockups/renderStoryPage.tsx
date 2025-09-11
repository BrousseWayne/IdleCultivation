import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const renderStoryPage = () => {
  const storyEntries = [
    {
      time: "Day 1, Morning",
      entry:
        "You awakened as a humble farmer in the Azure Mountain region. At 23 years old, your mortal body yearns for something greater than tilling fields.",
      type: "narrative",
    },
    {
      time: "Day 1, Afternoon",
      entry:
        "While working in the fields, you discovered a strange glowing stone. Upon touching it, visions of immortal cultivators filled your mind.",
      type: "discovery",
    },
    {
      time: "Day 2, Dawn",
      entry:
        "You traveled to the Azure Mountain Sect and begged the outer disciples for a chance to join. After demonstrating your determination, Elder Chen agreed to test your spiritual roots.",
      type: "journey",
    },
    {
      time: "Day 3, Evening",
      entry:
        "Your spiritual roots were deemed 'acceptable' - not genius level, but sufficient for cultivation. You were accepted as an outer disciple.",
      type: "achievement",
    },
    {
      time: "Day 5, Night",
      entry:
        "You ventured into the Whispering Forest and hunted 47 Spirit Rabbits, earning your first combat experience and 340 Spirit Stones.",
      type: "combat",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Chronicle of Immortality
        </h2>
        <p className="text-muted-foreground">
          The narrative of your journey from mortal to immortal
        </p>
      </div>

      {/* Reduced spacing between story entries from space-y-3 to space-y-2 */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {storyEntries.map((entry, index) => (
          <Card key={index} className="bg-card border-border/50 py-0">
            {/* Reduced card padding from p-3 to p-2 */}
            <CardContent className="p-2">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      entry.type === "narrative"
                        ? "border-purple-500/50 text-purple-400"
                        : entry.type === "discovery"
                        ? "border-yellow-500/50 text-yellow-400"
                        : entry.type === "journey"
                        ? "border-blue-500/50 text-blue-400"
                        : entry.type === "achievement"
                        ? "border-green-500/50 text-green-400"
                        : "border-red-500/50 text-red-400"
                    }`}
                  >
                    {entry.time}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {entry.entry}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
