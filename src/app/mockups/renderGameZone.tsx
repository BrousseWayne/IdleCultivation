import { useGameState } from "./dataForPage9";

export function GameZone() {
  const { activeTab } = useGameState();
  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ marginLeft: "28rem" }}>
      {activeTab === "Explore" && renderExplorePage()}
      {activeTab === "Inventory" && renderInventoryPage()}
      {activeTab === "Activities" && renderActivitiesPage()}
      {activeTab === "Quests" && renderQuestsPage()}
      {activeTab === "Lifestyle" && renderLifestylePage()}
      {activeTab === "Travel" && renderTravelPage()}
      {activeTab === "Stats" && renderStatsPage()}
      {activeTab === "Recap" && renderCalendarPage()}
      {activeTab === "Story" && renderStoryPage()}
    </div>
  );
}
