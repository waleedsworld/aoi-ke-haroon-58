import { chromium } from "playwright";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "docs/media");
const VID = path.join(ROOT, "scripts/vid");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(VID, { recursive: true });
const base = "http://localhost:8080";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: "dark",
    recordVideo: { dir: VID, size: { width: 1280, height: 800 } },
  });
  const page = await ctx.newPage();

  // 1. Language gate
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await sleep(1600);
  await page.screenshot({ path: `${OUT}/01-language-gate.png` });

  // pick English and lock it in so the whole demo stays English
  await page.getByText("English", { exact: false }).first().click();
  await page.waitForURL("**/home");
  await page.evaluate(() => localStorage.setItem("aoi-studio.language", "en"));
  await sleep(1500);
  await page.screenshot({ path: `${OUT}/02-home-dark.png` });

  // 2. Command palette (feature-b)
  await page.keyboard.press("Control+k");
  await sleep(1200);
  try {
    await page.keyboard.type("studio", { delay: 90 });
    await sleep(900);
    await page.screenshot({ path: `${OUT}/03-command-palette.png` });
    await page.keyboard.press("Enter");
  } catch {
    await page.keyboard.press("Escape");
    await page.goto(base + "/studio", { waitUntil: "networkidle" });
  }
  await sleep(1400);

  // 3. Aoi Canvas Studio (feature-a) — real generative art
  if (!page.url().includes("/studio")) {
    await page.goto(base + "/studio", { waitUntil: "networkidle" });
    await sleep(1200);
  }
  await page.screenshot({ path: `${OUT}/04-studio.png` });

  const ta = page.locator("textarea").first();
  if (await ta.count()) {
    await ta.click();
    await ta.fill("");
    await ta.type("neon samurai under a violet moon, glowing petals", { delay: 45 });
    await sleep(700);
  }
  const gen = page.getByRole("button", { name: /Generate artwork|Generar obra/i }).first();
  const roll = page.getByRole("button", { name: /Re-roll seed|Nueva semilla/i }).first();
  // Generate artwork (first piece)
  if (await gen.count()) {
    await gen.click();
    await sleep(2200);
    await page.screenshot({ path: `${OUT}/05-studio-generated.png` });
  }
  // re-roll + generate a few more to fill the gallery
  for (let i = 0; i < 3; i++) {
    if (await roll.count()) await roll.click();
    await sleep(500);
    if (await gen.count()) await gen.click();
    await sleep(1700);
  }
  await sleep(600);
  await page.screenshot({ path: `${OUT}/06-studio-gallery.png` });

  // 4. Image generator page
  await page.goto(base + "/image", { waitUntil: "networkidle" });
  await sleep(1500);
  await page.screenshot({ path: `${OUT}/07-image.png` });

  // 5. Characters
  await page.goto(base + "/characters", { waitUntil: "networkidle" });
  await sleep(1500);

  // 6. A/B hero variant B (variants branch)
  await page.goto(base + "/home?variant=b", { waitUntil: "networkidle" });
  await sleep(1800);
  await page.screenshot({ path: `${OUT}/08-hero-variant-b.png` });

  await sleep(600);
  await ctx.close();
  await browser.close();

  // rename the single recorded video
  const files = fs.readdirSync(VID).filter((f) => f.endsWith(".webm"));
  if (files.length) {
    fs.renameSync(`${VID}/${files[0]}`, `${VID}/demo.webm`);
    console.log("VIDEO:", `${VID}/demo.webm`);
  }
}

// Light + mobile stills in a second lightweight context
async function stills() {
  const browser = await chromium.launch();
  // desktop light
  const light = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const lp = await light.newPage();
  await lp.goto(base + "/", { waitUntil: "networkidle" });
  await sleep(1200);
  await lp.getByText("English", { exact: false }).first().click();
  await lp.waitForURL("**/home");
  await sleep(1400);
  await lp.screenshot({ path: `${OUT}/09-home-light.png` });
  await light.close();

  // mobile
  const mob = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    colorScheme: "dark",
    isMobile: true,
    hasTouch: true,
  });
  const mp = await mob.newPage();
  await mp.goto(base + "/", { waitUntil: "networkidle" });
  await sleep(1200);
  await mp.getByText("English", { exact: false }).first().click();
  await mp.waitForURL("**/home");
  await sleep(1400);
  await mp.screenshot({ path: `${OUT}/10-home-mobile.png` });
  await mob.close();
  await browser.close();
}

await run();
await stills();
console.log("DONE");
