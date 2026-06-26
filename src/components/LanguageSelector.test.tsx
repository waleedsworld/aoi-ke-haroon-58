import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { LanguageSelector } from "./LanguageSelector";

const STORAGE_KEY = "aoi-studio.language";

describe("LanguageSelector", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the current language label", () => {
    window.localStorage.setItem(STORAGE_KEY, "en");
    renderWithProviders(<LanguageSelector />);
    expect(
      screen.getByRole("button", { name: /Change language/i }),
    ).toHaveTextContent("English");
  });

  it("switches language when a menu item is chosen", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(STORAGE_KEY, "en");
    renderWithProviders(<LanguageSelector />);

    await user.click(screen.getByRole("button", { name: /Change language/i }));
    const spanishItem = await screen.findByRole("menuitem", { name: /Español/ });
    await user.click(spanishItem);

    await waitFor(() =>
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("es"),
    );
    expect(
      screen.getByRole("button", { name: /Change language/i }),
    ).toHaveTextContent("Español");
  });
});
