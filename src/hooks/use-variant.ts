import { useLocation } from "react-router-dom";

/**
 * Landing-page A/B variant selector.
 *
 * The active variant is read from the `?variant=` query string so it can be
 * shared via URL and toggled without a rebuild. Anything other than an
 * explicit `b` falls back to the default experience ("a").
 *
 *   /home            -> variant "a" (default)
 *   /home?variant=b  -> variant "b"
 */
export type LandingVariant = "a" | "b";

export function useVariant(): LandingVariant {
  const { search } = useLocation();
  const value = new URLSearchParams(search).get("variant")?.toLowerCase();
  return value === "b" ? "b" : "a";
}
