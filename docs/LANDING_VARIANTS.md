# Landing hero A/B variants

The `/home` landing hero ships in two interchangeable treatments so copy,
layout, and call-to-action can be compared without a rebuild. The active
variant is chosen by the `?variant=` query string and is fully shareable via
URL.

| URL | Variant | Description |
| --- | --- | --- |
| `/home` | **A** (default) | Centered title (`hero.title`) + "Mobile App" badge. The original hero. |
| `/home?variant=b` | **B** | Left-aligned asymmetric split hero: gradient headline, supporting subheadline, dual CTA (**Start creating** → `/create/quick`, **Watch demo** → `/chat`), a social-proof stat row, and a featured character panel. |

Any `variant` value other than `b` (including a missing param) resolves to
variant **A**, so existing links and bookmarks are unaffected.

## How it works

- **`src/hooks/use-variant.ts`** — `useVariant()` reads and normalizes the
  `?variant=` query param, returning `"a" | "b"`.
- **`src/components/HeroVariantB.tsx`** — the self-contained variant B hero.
  Its copy is inline and bilingual (EN/ES via `useLanguage().language`), so the
  experiment does not touch the shared translation dictionary.
- **`src/pages/Home.tsx`** — the only shared file touched. A single conditional
  swaps the default hero block for `<HeroVariantB />` when the variant is `b`;
  everything below the hero (feature cards, Tavern section, character grid) is
  shared by both variants.

## Try it

```bash
npm install && npm run dev   # http://localhost:8080/
# then open:
#   http://localhost:8080/home            (variant A)
#   http://localhost:8080/home?variant=b  (variant B)
```

Both variants respect the current language (EN/ES) selected on the language
gate at `/`.
