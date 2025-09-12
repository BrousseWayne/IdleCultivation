import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { storyEntries } from "./dataForPage9";

export const RenderStoryPage = () => {
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

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {storyEntries.map((entry, index) => (
          <Card key={index} className="bg-card border-border/50 py-0">
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
