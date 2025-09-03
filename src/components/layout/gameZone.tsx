"use client";

import { useGame } from "../context/GameContext";

export const GameZone = () => {
  const { activeTab } = useGame();
  return (
    <div className="flex-1 p-4 overflow-y-auto" style={{ marginLeft: "28rem" }}>
      {activeTab === "Explore" && <ExplorePage />}
      {activeTab === "Inventory" && <InventoryPage />}
      {activeTab === "Activities" && <ActivitiesPage />}
      {activeTab === "Quests" && <QuestsPage />}
      {activeTab === "Lifestyle" && <LifestylePage />}
      {activeTab === "Travel" && <TravelPage />}
      {activeTab === "Stats" && <StatsPage />}
      {activeTab === "Recap" && <CalendarPage />}
      {activeTab === "Story" && <StoryPage />}
    </div>
  );
};
