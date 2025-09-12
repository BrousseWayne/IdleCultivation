import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Target } from "lucide-react";
import { activeQuests, completedQuests } from "../data/data";

export function RenderQuestsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
          Quests
        </h2>
      </div>

      <div className="space-y-6">
        {/* Active Quests */}
        <Card className="bg-black border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-400" />
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
                    <h3 className="font-semibold text-purple-300">
                      {quest.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {quest.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-xs text-slate-500">
                        Progress: {quest.progress}%
                      </div>
                      <div className="text-xs text-yellow-400">
                        Reward: {quest.reward}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{quest.timeLeft}</div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{ width: `${quest.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Completed Quests */}
        <Card className="bg-black border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
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
                    <h3 className="font-semibold text-green-300 text-sm">
                      {quest.title}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Completed: {quest.completedDate}
                    </div>
                  </div>
                  <div className="text-xs text-green-400">{quest.reward}</div>
                </div>
                ß
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
