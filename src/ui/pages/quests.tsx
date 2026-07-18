import { CheckCircle, Clock } from "lucide-react";
import { activeQuests, completedQuests } from "@/game/data/quests";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/ui/components/PageHeader";
import { Glyph } from "@/ui/components/StatIcon";
import { text } from "@/game/content/text";

export function RenderQuestsPage() {
  const hasContent = activeQuests.length > 0 || completedQuests.length > 0;

  return (
    <div className="space-y-4">
      <PageHeader
        glyph="務"
        title={text("page.quests.title")}
        color="text-accent-violet"
      />

      {!hasContent && (
        <div className="flex flex-col items-center justify-center py-16 text-ink-2">
          <Glyph char="務" size={44} className="mb-3 opacity-30" />
          <p className="text-sm">{text("page.quests.empty")}</p>
        </div>
      )}

      {activeQuests.length > 0 && (
        <Card className="bg-panel border-line">
          <CardHeader>
            <CardTitle className="text-lg text-ink flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-gold" />
              {text("page.quests.section.active")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeQuests.map((quest) => (
              <div key={quest.id} className="p-3 rounded-lg bg-panel-2 border border-line-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-accent-violet">{quest.title}</h3>
                    <p className="text-sm text-ink-2 mt-1">{quest.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-xs text-ink-2">
                        {text("page.quests.label.progress")} <span className="font-mono">{quest.progress}%</span>
                      </div>
                      <div className="text-xs text-accent-gold">{text("page.quests.label.reward")} {quest.reward}</div>
                    </div>
                  </div>
                  <div className="text-xs text-ink-2">{quest.timeLeft}</div>
                </div>
                <Progress value={quest.progress} className="h-1.5 bg-panel-2 [&>div]:bg-accent-violet mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {completedQuests.length > 0 && (
        <Card className="bg-panel border-line">
          <CardHeader>
            <CardTitle className="text-lg text-ink flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-jade" />
              {text("page.quests.section.completed")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {completedQuests.map((quest) => (
              <div key={quest.id} className="p-2 rounded-lg bg-panel-2 border border-line">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-accent-jade text-sm">{quest.title}</h3>
                    <div className="text-xs text-ink-2">{text("page.quests.label.completed")} {quest.completedDate}</div>
                  </div>
                  <div className="text-xs text-accent-jade">{quest.reward}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
