/**
 * Procedural neon art engine.
 *
 * The rest of Aoi Studio is a mock UI — the "Generate" buttons only fire a toast.
 * This module makes the studio actually *produce* something: a deterministic,
 * fully client-side generative artwork rendered from a text prompt. The same
 * prompt + seed always renders the same image, so every creation is reproducible
 * and shareable by its seed alone (no backend, no network).
 *
 * The look intentionally matches the app's neon / anime-at-2am aesthetic:
 * a deep gradient sky, glowing orbs, a drifting particle field, light rays and
 * a subtle grain pass — all coloured from a palette derived from the prompt.
 */

export interface ArtStyle {
  id: string;
  labelEn: string;
  labelEs: string;
}

export const ART_STYLES: ArtStyle[] = [
  { id: "aurora", labelEn: "Aurora", labelEs: "Aurora" },
  { id: "nebula", labelEn: "Nebula", labelEs: "Nebulosa" },
  { id: "cyber", labelEn: "Cyber Grid", labelEs: "Ciber Rejilla" },
  { id: "bloom", labelEn: "Sakura Bloom", labelEs: "Flor de Sakura" },
];

export const DEFAULT_STYLE = "aurora";

/* ---------- deterministic randomness ---------- */

/** FNV-1a style string hash → unsigned 32-bit int. */
export function hashString(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Mulberry32 — tiny, fast, well-distributed seeded PRNG. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Build a stable seed from a prompt string and a numeric roll. */
export function seedFromPrompt(prompt: string, roll: number): number {
  return (hashString(prompt.trim().toLowerCase()) ^ Math.imul(roll + 1, 0x9e3779b1)) >>> 0;
}

/* ---------- palette ---------- */

interface Palette {
  bgTop: string;
  bgBottom: string;
  glow: string[];
  accent: string;
}

function hsl(h: number, s: number, l: number, a = 1): string {
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`;
}

/** Derive a neon palette deterministically from the seed. */
function buildPalette(rand: () => number, style: string): Palette {
  // Base hue anchored to the app's neon range (pinks / purples / cyans).
  const base = Math.floor(rand() * 360);
  const spread = 40 + rand() * 60;

  const glow = [
    hsl(base, 85, 62),
    hsl((base + spread) % 360, 80, 60),
    hsl((base + spread * 2) % 360, 78, 58),
  ];

  const styleTweak: Record<string, Partial<Palette>> = {
    aurora: { bgTop: hsl(base + 200, 45, 10), bgBottom: hsl(base + 260, 35, 5) },
    nebula: { bgTop: hsl(base + 20, 55, 9), bgBottom: hsl(base + 300, 40, 4) },
    cyber: { bgTop: hsl(220, 40, 8), bgBottom: hsl(260, 45, 4) },
    bloom: { bgTop: hsl(330, 35, 10), bgBottom: hsl(300, 30, 5) },
  };
  const tw = styleTweak[style] ?? styleTweak[DEFAULT_STYLE];

  return {
    bgTop: tw.bgTop!,
    bgBottom: tw.bgBottom!,
    glow,
    accent: hsl((base + 180) % 360, 90, 65),
  };
}

/* ---------- rendering ---------- */

export interface RenderOptions {
  prompt: string;
  seed: number;
  style: string;
  size?: number;
}

/**
 * Render the artwork onto a canvas. Returns nothing — the caller reads the
 * canvas (e.g. `toDataURL`). Pure function of (prompt, seed, style).
 */
export function renderArtwork(canvas: HTMLCanvasElement, opts: RenderOptions): void {
  const size = opts.size ?? 640;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rand = mulberry32(opts.seed);
  const palette = buildPalette(rand, opts.style);

  // 1. Background gradient sky.
  const bg = ctx.createLinearGradient(0, 0, size * 0.3, size);
  bg.addColorStop(0, palette.bgTop);
  bg.addColorStop(1, palette.bgBottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // 2. Style-specific structural layer.
  if (opts.style === "cyber") drawCyberGrid(ctx, size, rand, palette);
  if (opts.style === "aurora") drawAurora(ctx, size, rand, palette);

  // 3. Glowing orbs (the hero light sources).
  ctx.globalCompositeOperation = "lighter";
  const orbCount = 3 + Math.floor(rand() * 4);
  for (let i = 0; i < orbCount; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = size * (0.12 + rand() * 0.28);
    const color = palette.glow[i % palette.glow.length];
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color.replace(/,\s*1\)$/, ", 0.55)"));
    g.addColorStop(0.5, color.replace(/,\s*1\)$/, ", 0.18)"));
    g.addColorStop(1, color.replace(/,\s*1\)$/, ", 0)"));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Light rays sweeping from a focal point.
  const rayCount = 5 + Math.floor(rand() * 8);
  const cx = rand() * size;
  const cy = rand() * size * 0.4;
  for (let i = 0; i < rayCount; i++) {
    const ang = rand() * Math.PI * 2;
    const len = size * (0.5 + rand() * 0.8);
    const w = 1 + rand() * 3;
    ctx.strokeStyle = palette.accent.replace(/,\s*1\)$/, `, ${0.05 + rand() * 0.12})`);
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
    ctx.stroke();
  }

  // 5. Drifting particle field ("stars").
  const particles = 120 + Math.floor(rand() * 160);
  for (let i = 0; i < particles; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = rand() * 1.8;
    const a = 0.2 + rand() * 0.7;
    ctx.fillStyle = palette.glow[Math.floor(rand() * palette.glow.length)].replace(
      /,\s*1\)$/,
      `, ${a})`,
    );
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (opts.style === "bloom") drawPetals(ctx, size, rand, palette);

  // 6. Grain / vignette to unify the layers.
  ctx.globalCompositeOperation = "source-over";
  const vig = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.3,
    size / 2,
    size / 2,
    size * 0.75,
  );
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);
}

function drawAurora(
  ctx: CanvasRenderingContext2D,
  size: number,
  rand: () => number,
  palette: Palette,
) {
  ctx.globalCompositeOperation = "lighter";
  const bands = 3 + Math.floor(rand() * 3);
  for (let b = 0; b < bands; b++) {
    const baseY = size * (0.2 + rand() * 0.6);
    const amp = size * (0.04 + rand() * 0.1);
    const color = palette.glow[b % palette.glow.length];
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= size; x += 8) {
      const y = baseY + Math.sin(x * 0.01 + b) * amp + Math.sin(x * 0.03 + rand()) * amp * 0.4;
      ctx.lineTo(x, y);
    }
    ctx.lineWidth = size * (0.02 + rand() * 0.05);
    ctx.strokeStyle = color.replace(/,\s*1\)$/, ", 0.12)");
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
}

function drawCyberGrid(
  ctx: CanvasRenderingContext2D,
  size: number,
  rand: () => number,
  palette: Palette,
) {
  const horizon = size * (0.45 + rand() * 0.15);
  const step = 18 + rand() * 14;
  ctx.strokeStyle = palette.accent.replace(/,\s*1\)$/, ", 0.18)");
  ctx.lineWidth = 1;
  // Perspective floor lines.
  for (let y = horizon; y < size; y += step) {
    const t = (y - horizon) / (size - horizon);
    ctx.globalAlpha = 0.1 + t * 0.35;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
  const vanishX = size / 2;
  for (let x = 0; x <= size; x += step * 1.5) {
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.moveTo(vanishX, horizon);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawPetals(
  ctx: CanvasRenderingContext2D,
  size: number,
  rand: () => number,
  palette: Palette,
) {
  ctx.globalCompositeOperation = "lighter";
  const petals = 24 + Math.floor(rand() * 30);
  for (let i = 0; i < petals; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const s = 3 + rand() * 9;
    const rot = rand() * Math.PI * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = palette.glow[0].replace(/,\s*1\)$/, `, ${0.25 + rand() * 0.4})`);
    ctx.beginPath();
    ctx.ellipse(0, 0, s, s * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalCompositeOperation = "source-over";
}
