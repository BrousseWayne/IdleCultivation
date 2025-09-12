import { RenderSidenav } from "./renderNavSideBar";
import { GameZone } from "./renderGameZone";
import { StatsPanel } from "./renderStatsPanel";
import { Header } from "./renderHeader";
import { RenderTimeZone } from "./renderTimeZone";
import { GameStateProvider } from "./gameStateContext";

export default function IdleCultivationGame10() {
  return (
    <div>
      <div className="min-h-screen bg-black flex flex-col text-foreground dark">
        <GameStateProvider>
          <Header />
          <RenderTimeZone />
          <div className="flex flex-1">
            <GameZone />
            <StatsPanel />
            <RenderSidenav />
          </div>
        </GameStateProvider>
      </div>
    </div>
  );
}
