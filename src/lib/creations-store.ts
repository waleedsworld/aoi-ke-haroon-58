/**
 * Persistent store for artworks generated in the Studio.
 *
 * Backed by localStorage so a user's creations survive reloads — the app
 * previously persisted nothing at all. Exposes a tiny CRUD API plus a
 * subscribe() so React views stay in sync (including across browser tabs).
 */

export interface Creation {
  id: string;
  prompt: string;
  seed: number;
  style: string;
  dataUrl: string; // PNG data URL — the actual rendered image.
  favorite: boolean;
  createdAt: number; // epoch ms
}

const STORAGE_KEY = "aoi-studio.creations";
const MAX_CREATIONS = 60; // keep localStorage well under quota

type Listener = () => void;
const listeners = new Set<Listener>();

/**
 * Cached, referentially-stable snapshot for useSyncExternalStore. Recomputed
 * lazily only after the data actually changes — returning a fresh array on
 * every call would send React into an infinite render loop.
 */
let snapshot: Creation[] | null = null;

function invalidate(): void {
  snapshot = null;
}

function read(): Creation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Creation[]) : [];
  } catch {
    return [];
  }
}

function write(items: Creation[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Quota exceeded — drop the oldest non-favorite entries and retry once.
    const trimmed = items
      .slice()
      .sort((a, b) => Number(a.favorite) - Number(b.favorite) || a.createdAt - b.createdAt)
      .slice(Math.max(0, items.length - Math.floor(MAX_CREATIONS / 2)));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      /* give up silently */
    }
  }
  emit();
}

function emit(): void {
  invalidate();
  listeners.forEach((l) => l());
}

export function getCreations(): Creation[] {
  // Newest first. Cached so repeated calls return a stable reference.
  if (snapshot === null) {
    snapshot = read().sort((a, b) => b.createdAt - a.createdAt);
  }
  return snapshot;
}

export function addCreation(input: Omit<Creation, "id" | "createdAt" | "favorite">): Creation {
  const items = read();
  const creation: Creation = {
    ...input,
    id: `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    favorite: false,
    createdAt: Date.now(),
  };
  let next = [creation, ...items];
  // Enforce a cap, but never evict favorites.
  if (next.length > MAX_CREATIONS) {
    const favorites = next.filter((c) => c.favorite);
    const rest = next.filter((c) => !c.favorite).slice(0, MAX_CREATIONS - favorites.length);
    next = [...favorites, ...rest];
  }
  write(next);
  return creation;
}

export function deleteCreation(id: string): void {
  write(read().filter((c) => c.id !== id));
}

export function toggleFavorite(id: string): void {
  write(read().map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)));
}

export function clearCreations(): void {
  write([]);
}

/** Subscribe to store changes. Returns an unsubscribe fn. */
export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      invalidate();
      listener();
    }
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}
