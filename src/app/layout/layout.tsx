import { Outlet } from "react-router";
import { GameStateProvider } from "../contexts/gameStateContext";
import { Header } from "./layoutHeader";
import { SideNavigationBar } from "./navigationSidebar";
import { RenderTimeZone } from "./timeZone";
import { StatsPanel } from "./components/StatsPanel/statsPanel";

export function Layout() {
  return (
    <div className="min-h-screen bg-black flex flex-col text-foreground dark">
      <GameStateProvider>
        <Header />
        <RenderTimeZone />
        <div className="flex flex-1">
          <div
            className="flex-1 p-4 overflow-y-auto"
            style={{ marginLeft: "28rem" }}
          >
            <Outlet />
          </div>
          <StatsPanel />
          <SideNavigationBar />
        </div>
      </GameStateProvider>
    </div>
  );
}
