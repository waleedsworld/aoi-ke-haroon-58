import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LanguageSelection() {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: "es" | "en") => {
    setLanguage(lang);
    navigate("/home");
  };

  const languages: { code: "es" | "en"; flag: string; label: string; sub: string }[] = [
    { code: "es", flag: "🇪🇸", label: "Español", sub: "Continuar en español" },
    { code: "en", flag: "🇺🇸", label: "English", sub: "Continue in English" },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-6">
      {/* Atmospheric floating orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb w-96 h-96 -top-24 -left-20 bg-neon-pink/40" style={{ animationDelay: "0s" }} />
        <div className="orb w-80 h-80 top-1/3 -right-16 bg-neon-cyan/30" style={{ animationDelay: "1.5s" }} />
        <div className="orb w-72 h-72 -bottom-20 left-1/3 bg-neon-purple/40" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="border-gradient glass-panel rounded-2xl p-8 sm:p-10 animate-scale-in shadow-lift">
          {/* Brand mark */}
          <div className="flex flex-col items-center text-center">
            <div className="animate-glow-pulse mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-neon-pink to-neon-purple">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gradient-brand animate-gradient-x">
              Aoi Studio
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose your language
              <span className="mx-2 text-border">•</span>
              Elige tu idioma
            </p>
          </div>

          {/* Language options */}
          <div className="mt-8 space-y-3">
            {languages.map((lang, i) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
                className="sheen group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-border/60 bg-card/40 p-4 text-left transition-all duration-300 animate-fade-up hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card/70 hover:shadow-neon focus-visible:border-primary"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-muted/40 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {lang.flag}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold text-foreground">{lang.label}</span>
                  <span className="block text-xs text-muted-foreground">{lang.sub}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground/70">
            Neon-drenched AI creation, in your language.
          </p>
        </div>
      </div>
    </div>
  );
}
