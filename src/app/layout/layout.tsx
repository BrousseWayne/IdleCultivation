import { Outlet } from "react-router";
import { GameStateProvider } from "../contexts/gameStateContext";
import { Header } from "./layoutHeader";
import { Sidebar } from "./sidebar";
import { QueueBar } from "../components/queueBar";
import { IntroScreen } from "../components/IntroScreen";
import { DeathOverlay } from "../components/DeathOverlay";
import { NotificationFeed } from "../components/NotificationFeed";
import { useGameStore } from "../stores/gameStore";
import { useCultivatorStore } from "../stores/cultivatorStore";

export function Layout() {
  const introComplete = useGameStore((s) => s.introComplete);
  const hasFallen = useCultivatorStore((s) => s.hasFallen);

  if (!introComplete) {
    return <IntroScreen />;
  }

  return (
    <div className="h-screen bg-black flex flex-col text-foreground dark bg-vignette-jade overflow-hidden">
      <GameStateProvider>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 ml-60 p-6 pb-24 overflow-y-auto relative z-10">
            <Outlet />
          </main>
        </div>
        <QueueBar />
        {hasFallen && <DeathOverlay />}
        <NotificationFeed />
      </GameStateProvider>
    </div>
  );
}
