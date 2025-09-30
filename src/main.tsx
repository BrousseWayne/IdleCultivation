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

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
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
