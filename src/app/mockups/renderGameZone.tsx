import { useGameState } from "./gameStateContext";
import { RenderActivitiesPage } from "./renderActivitiesPage";
import { RenderCalendarPage } from "./renderCalendarPage";
import { RenderExplorePage } from "./renderExplorePage";
import { RenderInventoryPage } from "./renderInventoryPage";
import { RenderLifestylePage } from "./renderLifestylePage";
import { RenderQuestsPage } from "./renderQuestPAge";
import { RenderStatsPage } from "./renderStatsPage";
import { RenderStoryPage } from "./renderStoryPage";
import { RenderTravelPage } from "./renderTravelMap";

export function GameZone() {
  const { activeTab } = useGameState();
  console.log(activeTab);
  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ marginLeft: "28rem" }}>
      {activeTab === "Explore" && <RenderExplorePage />}
      {activeTab === "Inventory" && <RenderInventoryPage />}
      {activeTab === "Activities" && <RenderActivitiesPage />}
      {activeTab === "Quests" && <RenderQuestsPage />}
      {activeTab === "Lifestyle" && <RenderLifestylePage />}
      {activeTab === "Travel" && <RenderTravelPage />}
      {activeTab === "Stats" && <RenderStatsPage />}
      {activeTab === "Recap" && <RenderCalendarPage />}
      {activeTab === "Story" && <RenderStoryPage />}
    </div>
  );
}
