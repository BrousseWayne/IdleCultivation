import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useUnlockStore } from "@/game/stores/unlockStore";
import type { NavigationItem } from "@/game/types/domain";

export function RequireUnlock({ name, children }: { name: NavigationItem; children: ReactNode }) {
  const unlocked = useUnlockStore((state) => state.navigation[name]);
  if (!unlocked) return <Navigate to="/Explore" replace />;
  return children;
}
