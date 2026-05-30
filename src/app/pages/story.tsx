import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { storyEntries } from "../data/story";
import { storyEntryColors } from "../data/constant";
import { PageHeader } from "../components/PageHeader";
import { text, K } from "../content/text";

export const RenderStoryPage = () => {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={BookOpen}
        title={text(K.pageStoryTitle)}
        color="text-accent-violet"
        subtitle={text(K.pageStorySubtitle)}
      />

      {storyEntries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-slate-500">
          <BookOpen className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">{text(K.pageStoryEmpty)}</p>
        </div>
      )}

      <div className="space-y-2">
        {storyEntries.map((entry, index) => (
          <div
            key={index}
            className={`border-l-2 ${storyEntryColors[entry.type]} pl-3 py-1.5`}
          >
            <div className="flex items-start gap-2">
              <Badge
                variant="outline"
                className={`text-xs shrink-0 font-[family-name:var(--font-display)] ${storyEntryColors[entry.type]}`}
              >
                {entry.time}
              </Badge>
              <p className="text-sm leading-relaxed text-slate-300">
                {entry.entry}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
