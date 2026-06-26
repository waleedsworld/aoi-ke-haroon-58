import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn (class name merge)", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("de-duplicates conflicting tailwind utilities, keeping the last", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("returns an empty string when given nothing", () => {
    expect(cn()).toBe("");
  });
});
