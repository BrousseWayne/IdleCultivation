import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Target } from "lucide-react";
import { activeQuests, completedQuests } from "../data/quests";

export function RenderQuestsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-6 h-6 text-accent-violet" />
        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-accent-violet">
          Quests
        </h2>
      </div>

      <div className="space-y-6">
        <Card className="bg-black border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent-gold" />
              Active Quests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-accent-violet">
                      {quest.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {quest.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-xs text-slate-500">
                        Progress: <span className="font-mono">{quest.progress}%</span>
                      </div>
                      <div className="text-xs text-accent-gold">
                        Reward: {quest.reward}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{quest.timeLeft}</div>
                </div>
                <Progress
                  value={quest.progress}
                  className="h-1.5 bg-slate-800 [&>div]:bg-accent-violet mt-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-black border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent-emerald" />
              Completed Quests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {completedQuests.map((quest) => (
              <div
                key={quest.id}
                className="p-2 rounded-lg bg-slate-900/30 border border-slate-700/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-accent-emerald text-sm">
                      {quest.title}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Completed: {quest.completedDate}
                    </div>
                  </div>
                  <div className="text-xs text-accent-emerald">{quest.reward}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
