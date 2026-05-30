import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { GameStateProvider } from "../contexts/gameStateContext";
import { Header } from "./layoutHeader";
import { Sidebar } from "./sidebar";
import { QueueBar } from "../components/queueBar";
import { DeathOverlay } from "../components/DeathOverlay";
import { NotificationFeed } from "../components/NotificationFeed";
import { useCultivatorStore } from "../stores/cultivatorStore";

export function Layout() {
  const hasFallen = useCultivatorStore((s) => s.hasFallen);
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Explore", { replace: true });
  }, [navigate]);

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
