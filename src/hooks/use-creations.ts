import { useSyncExternalStore } from "react";
import { getCreations, subscribe, type Creation } from "@/lib/creations-store";

/**
 * React binding for the persistent creations store. Re-renders whenever a
 * creation is added / removed / favorited, and also when another tab mutates
 * the same localStorage key.
 */
export function useCreations(): Creation[] {
  return useSyncExternalStore(subscribe, getCreations, () => [] as Creation[]);
}
