import { useGameState } from "../contexts/gameStateContext";
import { RenderActivitiesPage } from "../pages/activities";
import { RenderCalendarPage } from "../pages/calendar";
import { RenderExplorePage } from "../pages/explore";
import { RenderInventoryPage } from "../pages/inventory";
import { RenderLifestylePage } from "../pages/lifestyle";
import { RenderQuestsPage } from "../pages/quests";
import { RenderStatsPage } from "../pages/stats";
import { RenderStoryPage } from "../pages/story";
import { RenderTravelPage } from "../pages/travel";

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
