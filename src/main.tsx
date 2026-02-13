import { createRoot } from "react-dom/client";
import "./app/globals.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./app/layout/layout";
import { RenderExplorePage } from "./app/pages/explore";
import { RenderInventoryPage } from "./app/pages/inventory";
import { RenderActivitiesPage } from "./app/pages/activities";
import { RenderQuestsPage } from "./app/pages/quests";
import { RenderLifestylePage } from "./app/pages/lifestyle";
import { RenderTravelPage } from "./app/pages/travel";
import { RenderStatsPage } from "./app/pages/stats";
import { RenderCalendarPage } from "./app/pages/calendar";
import { RenderStoryPage } from "./app/pages/story";
import { DesignPocPage } from "./app/pages/designPoc";
import {
  EntityRegistry,
  SaveManager,
  initializeGameEventListeners,
} from "./app/services";
import { activityData } from "./app/data/activity";
import { items } from "./app/data/items";
import { locations } from "./app/data/locations";
import { sidebarData } from "./app/data/navigation";

activityData.forEach((a) => EntityRegistry.register("activity", a.key, a));
items.forEach((i) => EntityRegistry.register("item", String(i.id), i));
locations.forEach((l) => EntityRegistry.register("location", l.name, l));
sidebarData.forEach((n) => EntityRegistry.register("navigation", n.name, n));

initializeGameEventListeners();
SaveManager.load();
SaveManager.startAutoSave();

if (typeof window !== "undefined") {
  (window as any).EntityRegistry = EntityRegistry;
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/poc" element={<DesignPocPage />} />
      <Route path="/" element={<Layout />}>
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
