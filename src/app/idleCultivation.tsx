import { GameStateProvider } from "./contexts/gameStateContext";
import { GameZone } from "./layout/gameZone";
import { Header } from "./layout/layoutHeader";
import { SideNavigationBar } from "./layout/navigationSidebar";
import { StatsPanel } from "./layout/statsPanel";
import { RenderTimeZone } from "./layout/timeZone";

export default function IdleCultivation() {
  return (
    <div>
      <div className="min-h-screen bg-black flex flex-col text-foreground dark">
        <GameStateProvider>
          <Header />
          <RenderTimeZone />
          <div className="flex flex-1">
            <GameZone />
            <StatsPanel />
            <SideNavigationBar />
          </div>
        </GameStateProvider>
      </div>
    </div>
  );
}
