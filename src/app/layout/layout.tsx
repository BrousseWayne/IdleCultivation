import { Outlet } from "react-router";
import { GameStateProvider } from "../contexts/gameStateContext";
import { Header } from "./layoutHeader";
import { Sidebar } from "./sidebar";
import { QueueBar } from "../components/queueBar";

export function Layout() {
  return (
    <div className="min-h-screen bg-black flex flex-col text-foreground dark bg-vignette-jade">
      <GameStateProvider>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 ml-60 p-6 pb-24 overflow-y-auto relative z-10">
            <Outlet />
          </main>
        </div>
        <QueueBar />
      </GameStateProvider>
    </div>
  );
}
