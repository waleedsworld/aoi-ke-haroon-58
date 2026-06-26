import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound", () => {
  afterEach(() => vi.restoreAllMocks());

  it("renders the 404 message and a link home", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/totally-missing"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return to Home/i })).toHaveAttribute(
      "href",
      "/",
    );
    spy.mockRestore();
  });

  it("logs the attempted path for observability", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <MemoryRouter initialEntries={["/totally-missing"]}>
        <NotFound />
      </MemoryRouter>,
    );
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("404 Error"),
      "/totally-missing",
    );
  });
});
