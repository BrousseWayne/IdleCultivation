import { ChevronDown, Minus, Plus } from "lucide-react";
import { activityData } from "../data/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGameState } from "../contexts/gameStateContext";

export const RenderActivitiesPage = () => {
  const {
    maxTimePoints,
    setTimePoints,
    activities,
    setActivities,
    collapsedCategories,
    setCollapsedCategories,
  } = useGameState();
  const categorizeActivities = () => {
    const categories = {
      work: [] as typeof activityData,
      training: [] as typeof activityData,
      study: [] as typeof activityData,
      social: [] as typeof activityData,
      life: [] as typeof activityData,
      hobby: [] as typeof activityData,
      adventure: [] as typeof activityData,
    };

    activityData.forEach((activity) => {
      categories[activity.category as keyof typeof categories].push(activity);
    });

    return categories;
  };

  const toggleCategory = (categoryName: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const categories = categorizeActivities();

  const updateActivity = (key: string, change: number) => {
    const activity = activityData.find((a) => a.key === key);
    if (!activity) return;

    const newValue = Math.max(
      0,
      activities[key as keyof typeof activities] + change
    );
    const currentTotal = Object.entries(activities).reduce(
      (sum, [actKey, value]) => {
        const actData = activityData.find((a) => a.key === actKey);
        return (
          sum +
          (actKey === key
            ? newValue * activity.cost
            : value * (actData?.cost || 0))
        );
      },
      0
    );

    if (currentTotal <= maxTimePoints) {
      setActivities((prev) => ({ ...prev, [key]: newValue }));
      setTimePoints(maxTimePoints - currentTotal);
    }
  };
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Daily Activities
        </h2>
        <p className="text-muted-foreground">
          Manage your time and cultivation path wisely
        </p>
      </div>

      {Object.entries(categories).map(([categoryName, categoryActivities]) => (
        <div key={categoryName} className="space-y-2">
          {/* Made category headers clickable to toggle collapse */}
          <button
            onClick={() => toggleCategory(categoryName)}
            className="flex items-center gap-2 text-lg font-semibold text-purple-300 capitalize hover:text-purple-200 transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                collapsedCategories[categoryName] ? "-rotate-90" : ""
              }`}
            />
            {categoryName}
          </button>
          {!collapsedCategories[categoryName] && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {categoryActivities.map((activity) => (
                <Card key={activity.key} className="bg-card border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <activity.icon className="w-4 h-4 text-purple-400" />
                      {activity.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-semibold">
                        Cost
                      </span>
                      <span className="font-mono text-purple-400 text-xs">
                        {activity.cost}h
                      </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-semibold">
                        Reward
                      </span>
                      <span className="font-mono text-violet-400 text-xs">
                        {activity.reward}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-semibold">
                        Allocated
                      </span>
                      <span className="font-mono text-orange-400 text-xs">
                        {activities[activity.key as keyof typeof activities]}h
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-1 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateActivity(activity.key, -1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateActivity(activity.key, 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
