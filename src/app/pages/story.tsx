import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { storyEntries } from "../data/story";
import { storyEntryColors } from "../data/constant";

export const RenderStoryPage = () => {
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Your Story
        </h2>
        <p className="text-muted-foreground">Your journey so far</p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {storyEntries.map((entry, index) => (
          <Card key={index} className="bg-card border-border/50 py-0">
            <CardContent className="p-2">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-xs ${storyEntryColors[entry.type]}`}
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
