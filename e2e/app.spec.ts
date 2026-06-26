import { test, expect } from "@playwright/test";

test.describe("Aoi Studio smoke flow", () => {
  test("language gate is the entry route", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Aoi Studio")).toBeVisible();
    await expect(page.getByRole("button", { name: /Español/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /English/ })).toBeVisible();
  });

  test("choosing English routes to the home dashboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /English/ }).click();
    await expect(page).toHaveURL(/\/home$/);
    await expect(
      page.getByRole("heading", { name: /AI-powered creative platform/i }),
    ).toBeVisible();
    // The language choice must survive as the persisted document language.
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("choosing Spanish shows the localized dashboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Español/ }).click();
    await expect(page).toHaveURL(/\/home$/);
    await expect(
      page.getByRole("heading", {
        name: /plataforma creativa habilitada por IA/i,
      }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
  });

  test("a feature card navigates deeper into the app", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /English/ }).click();
    await page.getByRole("heading", { name: "Chat in the Tavern" }).click();
    await expect(page).toHaveURL(/\/chat$/);
  });

  test("unknown routes render the 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(page.getByText(/Page not found/i)).toBeVisible();
  });
});
