import { Outlet } from "react-router";
import { Header } from "@/ui/layout/layoutHeader";
import { TabsNav } from "@/ui/layout/TabsNav";
import { QueueBar } from "@/ui/components/QueueBar";
import { SelfCard } from "@/ui/components/SelfCard";
import { ThreadDrawer } from "@/ui/components/ThreadDrawer";
import { DeathOverlay } from "@/ui/components/DeathOverlay";
import { NotificationFeed } from "@/ui/components/NotificationFeed";
import { useCultivatorStore } from "@/game/stores/cultivatorStore";

export function Layout() {
  const hasFallen = useCultivatorStore((state) => state.hasFallen);

  return (
    <div className="h-screen bg-background flex flex-col text-foreground dark bg-vignette-jade overflow-hidden">
      <Header />
      <QueueBar />
      <TabsNav />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <aside className="w-72 shrink-0 overflow-y-auto py-6 pr-6">
          <SelfCard />
        </aside>
      </div>
      <ThreadDrawer />
      {hasFallen && <DeathOverlay />}
      <NotificationFeed />
    </div>
  );
}
