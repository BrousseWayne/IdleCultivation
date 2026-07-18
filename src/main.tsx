import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Layout } from "@/ui/layout/layout";
import { ErrorBoundary } from "@/ui/components/ErrorBoundary";
import { RequireUnlock } from "@/ui/components/RequireUnlock";
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
import { registerContent } from "@/game/bootstrap";
import { validateContent } from "@/game/data/validateContent";

registerContent();

if (import.meta.env.DEV) {
  const contentErrors = validateContent();
  if (contentErrors.length) {
    throw new Error(`[content] invalid game data:\n- ${contentErrors.join("\n- ")}`);
  }
}

initializeGameEventListeners();
SaveManager.load();
SaveManager.startAutoSave();

bootRun();

declare global {
  interface Window {
    EntityRegistry: typeof EntityRegistry;
  }
}

if (typeof window !== "undefined") {
  window.EntityRegistry = EntityRegistry;
}

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary>
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
        <Route path="/Explore" element={<RequireUnlock name="Explore"><RenderExplorePage /></RequireUnlock>} />
        <Route path="/Inventory" element={<RequireUnlock name="Inventory"><RenderInventoryPage /></RequireUnlock>} />
        <Route path="/Activities" element={<RequireUnlock name="Activities"><RenderActivitiesPage /></RequireUnlock>} />
        <Route path="/Quests" element={<RequireUnlock name="Quests"><RenderQuestsPage /></RequireUnlock>} />
        <Route path="/Lifestyle" element={<RequireUnlock name="Lifestyle"><RenderLifestylePage /></RequireUnlock>} />
        <Route path="/Travel" element={<RequireUnlock name="Travel"><RenderTravelPage /></RequireUnlock>} />
        <Route path="/Stats" element={<RequireUnlock name="Stats"><RenderStatsPage /></RequireUnlock>} />
        <Route path="/Recap" element={<RequireUnlock name="Recap"><RenderCalendarPage /></RequireUnlock>} />
        <Route path="/Story" element={<RequireUnlock name="Story"><RenderStoryPage /></RequireUnlock>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </ErrorBoundary>
  // </StrictMode>
);
