import { Outlet } from "react-router";
import { Header } from "@/ui/layout/layoutHeader";
import { Sidebar } from "@/ui/layout/sidebar";
import { QueueBar } from "@/ui/components/QueueBar";
import { DeathOverlay } from "@/ui/components/DeathOverlay";
import { NotificationFeed } from "@/ui/components/NotificationFeed";
import { Stream } from "@/ui/components/Stream";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";

export function Layout() {
  const hasFallen = useCultivatorStore((s) => s.hasFallen);

  return (
    <div className="h-screen bg-black flex flex-col text-foreground dark bg-vignette-jade overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-60 p-6 pb-24 overflow-y-auto relative z-10">
          <Outlet />
        </main>
        <Stream />
      </div>
      <QueueBar />
      {hasFallen && <DeathOverlay />}
      <NotificationFeed />
    </div>
  );
}
