/**
 * Accessible loading fallback shown while a lazily-loaded route chunk is fetched.
 * Announces itself to assistive tech via role="status" and respects
 * prefers-reduced-motion (the spinner animation is disabled in index.css).
 */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen w-full items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="motion-safe:animate-spin h-8 w-8 rounded-full border-2 border-muted border-t-primary"
          aria-hidden="true"
        />
        <span className="sr-only">Loading…</span>
      </div>
    </div>
  );
}
