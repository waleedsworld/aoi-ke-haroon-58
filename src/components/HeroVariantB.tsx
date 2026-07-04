import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Play, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import animeChar2 from "@/assets/anime-char-2.jpg";

/**
 * Landing hero — Variant B (activated via `/home?variant=b`).
 *
 * A deliberately different treatment from the default centered title:
 *  - left-aligned, asymmetric split layout with a featured character panel
 *  - a punchier gradient headline + supporting subheadline
 *  - a dual call-to-action (primary "Start creating" + secondary "Watch demo")
 *  - a compact social-proof stat row
 *
 * Copy is kept inline and bilingual so this experiment does not have to touch
 * the shared translation dictionary.
 */
export function HeroVariantB() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const copy = {
    en: {
      eyebrow: "New · Aoi Studio",
      title: "Create anything, together with AI",
      subtitle:
        "Chat, image, and video generation in one neon-lit studio. Bring your favorite anime characters to life in seconds — no setup, no limits.",
      primary: "Start creating",
      secondary: "Watch demo",
      stats: [
        { value: "1M+", label: "Characters" },
        { value: "24/7", label: "AI companions" },
        { value: "4+", label: "LLMs" },
      ],
    },
    es: {
      eyebrow: "Nuevo · Aoi Studio",
      title: "Crea cualquier cosa, junto a la IA",
      subtitle:
        "Chat, imagen y generación de vídeo en un solo estudio neón. Da vida a tus personajes de anime favoritos en segundos, sin configuración ni límites.",
      primary: "Empezar a crear",
      secondary: "Ver demo",
      stats: [
        { value: "1M+", label: "Personajes" },
        { value: "24/7", label: "Compañeros IA" },
        { value: "4+", label: "LLMs" },
      ],
    },
  }[language];

  return (
    <section
      data-variant="b"
      className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/40 backdrop-blur p-8 md:p-12"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="w-4 h-4" />
            {copy.eyebrow}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {copy.title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">{copy.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" className="gap-2 hover-glow" onClick={() => navigate("/create/quick")}>
              <Zap className="w-5 h-5" />
              {copy.primary}
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate("/chat")}>
              <Play className="w-5 h-5" />
              {copy.secondary}
            </Button>
          </div>

          <div className="flex gap-8 pt-6">
            {copy.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 glow-purple">
            <img src={animeChar2} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
