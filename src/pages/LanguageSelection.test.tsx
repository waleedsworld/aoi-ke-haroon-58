import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSelection from "./LanguageSelection";

const STORAGE_KEY = "aoi-studio.language";

function renderGate() {
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/home" element={<div>Home Screen</div>} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  );
}

describe("LanguageSelection (language gate)", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders the brand and both language options", () => {
    renderGate();
    expect(screen.getByText("Aoi Studio")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Español/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /English/ })).toBeInTheDocument();
  });

  it("selecting Spanish sets the language and routes to /home", async () => {
    const user = userEvent.setup();
    renderGate();
    await user.click(screen.getByRole("button", { name: /Español/ }));
    expect(await screen.findByText("Home Screen")).toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("es");
  });

  it("selecting English sets the language and routes to /home", async () => {
    const user = userEvent.setup();
    renderGate();
    await user.click(screen.getByRole("button", { name: /English/ }));
    expect(await screen.findByText("Home Screen")).toBeInTheDocument();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
  });
});
