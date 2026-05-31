import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "@/ui/layout/layout";
import { RenderExplorePage } from "@/ui/pages/explore";
import { RenderInventoryPage } from "@/ui/pages/inventory";
import { RenderActivitiesPage } from "@/ui/pages/activities";
import { RenderQuestsPage } from "@/ui/pages/quests";
import { RenderLifestylePage } from "@/ui/pages/lifestyle";
import { RenderTravelPage } from "@/ui/pages/travel";
import { RenderStatsPage } from "@/ui/pages/stats";
import { RenderCalendarPage } from "@/ui/pages/calendar";
import { RenderStoryPage } from "@/ui/pages/story";
import { DesignPocPage } from "@/ui/pages/designPoc";
import {
  EntityRegistry,
  SaveManager,
  initializeGameEventListeners,
} from "@/game/services";
import { bootRun } from "@/game/engine/gameLoop";
import { activityData } from "@/game/data/activity";
import { items } from "@/game/data/items";
import { locations } from "@/game/data/locations";
import { sidebarData } from "@/game/data/navigation";

activityData.forEach((a) => EntityRegistry.register("activity", a.key, a));
items.forEach((i) => EntityRegistry.register("item", String(i.id), i));
locations.forEach((l) => EntityRegistry.register("location", l.name, l));
sidebarData.forEach((n) => EntityRegistry.register("navigation", n.name, n));

initializeGameEventListeners();
SaveManager.load();
SaveManager.startAutoSave();

bootRun();

if (typeof window !== "undefined") {
  (window as any).EntityRegistry = EntityRegistry;
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/poc" element={<DesignPocPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/Explore" replace />} />
        <Route path="/Explore" element={<RenderExplorePage />} />
        <Route path="/Inventory" element={<RenderInventoryPage />} />
        <Route path="/Activities" element={<RenderActivitiesPage />} />
        <Route path="/Quests" element={<RenderQuestsPage />} />
        <Route path="/Lifestyle" element={<RenderLifestylePage />} />
        <Route path="/Travel" element={<RenderTravelPage />} />
        <Route path="/Stats" element={<RenderStatsPage />} />
        <Route path="/Recap" element={<RenderCalendarPage />} />
        <Route path="/Story" element={<RenderStoryPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
