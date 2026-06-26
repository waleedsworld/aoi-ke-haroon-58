import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "./Home";

function renderHome() {
  window.localStorage.setItem("aoi-studio.language", "en");
  return render(
    <LanguageProvider>
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<div>Chat Page</div>} />
          <Route path="/image" element={<div>Image Page</div>} />
        </Routes>
      </MemoryRouter>
    </LanguageProvider>,
  );
}

describe("Home dashboard", () => {
  beforeEach(() => window.localStorage.clear());

  it("renders the translated hero heading", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: /AI-powered creative platform/i }),
    ).toBeInTheDocument();
  });

  it("renders the core feature cards", () => {
    renderHome();
    // Card titles are h3 headings; a couple of the labels also appear in the
    // sidebar nav, so scope these assertions to the heading role.
    expect(
      screen.getByRole("heading", { name: "Chat in the Tavern" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Image Generation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Video Generation" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Model Hub" }),
    ).toBeInTheDocument();
  });

  it("renders the mock character gallery", () => {
    renderHome();
    expect(screen.getByText("Kiryuu Kikyou")).toBeInTheDocument();
    expect(screen.getByText("Luna")).toBeInTheDocument();
  });

  it("navigates to the chat route when the tavern card is clicked", async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByText("Chat in the Tavern"));
    expect(await screen.findByText("Chat Page")).toBeInTheDocument();
  });
});
