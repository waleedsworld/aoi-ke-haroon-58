import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Sparkles,
  Film,
  Wand2,
  MessageSquare,
  Users,
  Grid3x3,
  Palette,
  History as HistoryIcon,
  User,
  Settings as SettingsIcon,
  Languages,
  Command as CommandIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useLanguage } from "@/contexts/LanguageContext";

type NavItem = {
  to: string;
  icon: typeof Home;
  labels: { en: string; es: string };
  keywords?: string;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/home", icon: Home, labels: { en: "Home", es: "Inicio" }, keywords: "dashboard start" },
  { to: "/create/quick", icon: Sparkles, labels: { en: "Quick Create", es: "Creación rápida" }, keywords: "new generate" },
  { to: "/characters", icon: Users, labels: { en: "Characters", es: "Personajes" }, keywords: "anime avatar" },
  { to: "/chat", icon: MessageSquare, labels: { en: "Chat", es: "Charla" }, keywords: "tavern talk roleplay" },
  { to: "/image", icon: Wand2, labels: { en: "Image Gen", es: "Generar imagen" }, keywords: "picture art draw" },
  { to: "/studio", icon: Palette, labels: { en: "Aoi Canvas", es: "Aoi Canvas" }, keywords: "studio generative art gallery paint canvas obra" },
  { to: "/video", icon: Film, labels: { en: "Video Gen", es: "Generar vídeo" }, keywords: "movie clip animate" },
  { to: "/model-hub", icon: Grid3x3, labels: { en: "Model Hub", es: "Centro de modelos" }, keywords: "lora browse" },
  { to: "/tools", icon: Wand2, labels: { en: "Image Editing", es: "Edición de imagen" }, keywords: "upscale enhance" },
  { to: "/history", icon: HistoryIcon, labels: { en: "History", es: "Historial" }, keywords: "past recent" },
  { to: "/account", icon: User, labels: { en: "Account", es: "Cuenta" }, keywords: "profile me" },
  { to: "/settings", icon: SettingsIcon, labels: { en: "Settings", es: "Ajustes" }, keywords: "config preferences" },
];

/**
 * Global command palette. Press Cmd+K (macOS) or Ctrl+K to open it from anywhere,
 * then jump to any page or run a quick action without reaching for the mouse.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runThenClose = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  const isEn = language === "en";
  const navHeading = isEn ? "Go to" : "Ir a";
  const actionsHeading = isEn ? "Actions" : "Acciones";
  const placeholder = isEn
    ? "Type a page or command..."
    : "Escribe una página o comando...";
  const emptyText = isEn ? "No results found." : "Sin resultados.";
  const toggleLangLabel = isEn ? "Switch to Spanish" : "Cambiar a inglés";

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup heading={navHeading}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const label = isEn ? item.labels.en : item.labels.es;
            return (
              <CommandItem
                key={item.to}
                value={`${label} ${item.labels.en} ${item.labels.es} ${item.keywords ?? ""}`}
                onSelect={() => runThenClose(() => navigate(item.to))}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={actionsHeading}>
          <CommandItem
            value={`${toggleLangLabel} language idioma español english inglés`}
            onSelect={() => runThenClose(() => setLanguage(isEn ? "es" : "en"))}
          >
            <Languages className="mr-2 h-4 w-4" />
            <span>{toggleLangLabel}</span>
            <CommandShortcut>{isEn ? "EN → ES" : "ES → EN"}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

/**
 * Small hint button that opens the palette and advertises the shortcut.
 * Rendered in the top bar so the feature is discoverable, not just a hidden hotkey.
 */
export function CommandPaletteHint() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const openPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label={isEn ? "Open command palette" : "Abrir la paleta de comandos"}
      title={isEn ? "Command palette (⌘K / Ctrl+K)" : "Paleta de comandos (⌘K / Ctrl+K)"}
      className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-muted-foreground hover:text-foreground hover:border-neon-purple/50 transition-colors"
    >
      <CommandIcon className="w-3.5 h-3.5" />
      <span className="text-xs">{isEn ? "Search" : "Buscar"}</span>
      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background/60 border border-border/50">
        ⌘K
      </kbd>
    </button>
  );
}
