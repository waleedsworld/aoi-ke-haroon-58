import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { LanguageProvider, useLanguage } from "./LanguageContext";

const STORAGE_KEY = "aoi-studio.language";

function wrapper({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}

describe("LanguageContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("throws a helpful error when used outside the provider", () => {
    // Suppress the expected React error boundary console noise.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useLanguage())).toThrow(
      /must be used within a LanguageProvider/,
    );
    spy.mockRestore();
  });

  it("translates a known key for the active language", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("en"));
    expect(result.current.t("hero.title")).toBe("AI-powered creative platform");
    act(() => result.current.setLanguage("es"));
    expect(result.current.t("hero.title")).toBe(
      "plataforma creativa habilitada por IA",
    );
  });

  it("falls back to the raw key for an unknown translation", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.t("does.not.exist")).toBe("does.not.exist");
  });

  it("persists the selected language to localStorage", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("en"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
    act(() => result.current.setLanguage("es"));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("es");
  });

  it("restores a previously saved language on mount", () => {
    window.localStorage.setItem(STORAGE_KEY, "en");
    const { result } = renderHook(() => useLanguage(), { wrapper });
    expect(result.current.language).toBe("en");
  });

  it("keeps document.documentElement.lang in sync", () => {
    const { result } = renderHook(() => useLanguage(), { wrapper });
    act(() => result.current.setLanguage("en"));
    expect(document.documentElement.lang).toBe("en");
  });

  it("provides the context value to descendant components", () => {
    function Probe() {
      const { language, t } = useLanguage();
      return (
        <div>
          <span data-testid="lang">{language}</span>
          <span data-testid="label">{t("tavern.chat")}</span>
        </div>
      );
    }
    window.localStorage.setItem(STORAGE_KEY, "en");
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByTestId("lang")).toHaveTextContent("en");
    expect(screen.getByTestId("label")).toHaveTextContent("Chat");
  });
});
