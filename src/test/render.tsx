import { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface ProvidersOptions {
  route?: string;
}

/**
 * Renders a component wrapped in the providers the app relies on
 * (router + language context) so page/component tests mirror runtime.
 */
export function renderWithProviders(
  ui: ReactElement,
  { route = "/", ...options }: ProvidersOptions & Omit<RenderOptions, "wrapper"> = {},
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[route]}>
        <LanguageProvider>{children}</LanguageProvider>
      </MemoryRouter>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
