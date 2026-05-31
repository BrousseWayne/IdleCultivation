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
import { SceneProto } from "@/ui/proto/SceneProto";
import { OverworldProto } from "@/ui/proto/OverworldProto";
import { RailProto } from "@/ui/proto/RailProto";
import { DialogueProto } from "@/ui/proto/DialogueProto";
import { CombinedBarProto } from "@/ui/proto/CombinedBarProto";
import { CombinedMapProto } from "@/ui/proto/CombinedMapProto";
import { StreamRightProto } from "@/ui/proto/StreamRightProto";
import { StreamBottomProto } from "@/ui/proto/StreamBottomProto";
import { StreamInlineProto } from "@/ui/proto/StreamInlineProto";
import { GraphProto } from "@/ui/proto/GraphProto";
import { SeamLab } from "@/ui/proto/SeamLab";
import { ProtoFrame } from "@/ui/proto/ProtoNav";
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
      <Route path="/proto/scene" element={<ProtoFrame><SceneProto /></ProtoFrame>} />
      <Route path="/proto/overworld" element={<ProtoFrame><OverworldProto /></ProtoFrame>} />
      <Route path="/proto/rail" element={<ProtoFrame><RailProto /></ProtoFrame>} />
      <Route path="/proto/dialogue" element={<ProtoFrame><DialogueProto /></ProtoFrame>} />
      <Route path="/proto/combined-bar" element={<ProtoFrame><CombinedBarProto /></ProtoFrame>} />
      <Route path="/proto/combined-map" element={<ProtoFrame><CombinedMapProto /></ProtoFrame>} />
      <Route path="/proto/stream-right" element={<ProtoFrame><StreamRightProto /></ProtoFrame>} />
      <Route path="/proto/stream-bottom" element={<ProtoFrame><StreamBottomProto /></ProtoFrame>} />
      <Route path="/proto/stream-inline" element={<ProtoFrame><StreamInlineProto /></ProtoFrame>} />
      <Route path="/proto/graph" element={<ProtoFrame><GraphProto /></ProtoFrame>} />
      <Route path="/proto/seam" element={<ProtoFrame><SeamLab /></ProtoFrame>} />
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
