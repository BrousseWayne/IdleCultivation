import { useGameState } from "./dataForPage9";
import { RenderActivitiesPage } from "./renderActivitiesPage";
import { renderInventoryPage } from "./renderInventoryPage";
import { renderQuestsPage } from "./renderQuestPAge";
import { renderStatsPage } from "./renderStatsPage";
import { renderStoryPage } from "./renderStoryPage";
import { renderTravelPage } from "./renderTravelMap";

export function GameZone() {
  const { activeTab } = useGameState();
  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ marginLeft: "28rem" }}>
      {activeTab === "Explore" && renderExplorePage()}
      {activeTab === "Inventory" && renderInventoryPage()}
      {activeTab === "Activities" && RenderActivitiesPage()}
      {activeTab === "Quests" && renderQuestsPage()}
      {activeTab === "Lifestyle" && renderLifestylePage()}
      {activeTab === "Travel" && renderTravelPage()}
      {activeTab === "Stats" && renderStatsPage()}
      {activeTab === "Recap" && renderCalendarPage()}
      {activeTab === "Story" && renderStoryPage()}
    </div>
  );
}
