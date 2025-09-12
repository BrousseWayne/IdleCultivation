import { useGameState } from "./dataForPage9";
import { RenderActivitiesPage } from "./renderActivitiesPage";
import { RenderCalendarPage } from "./renderCalendarPage";
import { RenderExplorePage } from "./renderExplorePage";
import { RenderInventoryPage } from "./renderInventoryPage";
import { RenderLifestylePage } from "./renderLifestylePage";
import { renderQuestsPage } from "./renderQuestPAge";
import { renderStatsPage } from "./renderStatsPage";
import { RenderStoryPage } from "./renderStoryPage";
import { RenderTravelPage } from "./renderTravelMap";

export function GameZone() {
  const { activeTab } = useGameState();
  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ marginLeft: "28rem" }}>
      {activeTab === "Explore" && RenderExplorePage()}
      {activeTab === "Inventory" && RenderInventoryPage()}
      {activeTab === "Activities" && RenderActivitiesPage()}
      {activeTab === "Quests" && renderQuestsPage()}
      {activeTab === "Lifestyle" && RenderLifestylePage()}
      {activeTab === "Travel" && RenderTravelPage()}
      {activeTab === "Stats" && renderStatsPage()}
      {activeTab === "Recap" && RenderCalendarPage()}
      {activeTab === "Story" && RenderStoryPage()}
    </div>
  );
}
