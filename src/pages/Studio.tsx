import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Wand2,
  Dice5,
  Download,
  Trash2,
  Heart,
  Search,
  Sparkles,
  Copy,
  Star,
  ImageOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCreations } from "@/hooks/use-creations";
import {
  addCreation,
  clearCreations,
  deleteCreation,
  toggleFavorite,
  type Creation,
} from "@/lib/creations-store";
import {
  ART_STYLES,
  DEFAULT_STYLE,
  renderArtwork,
  seedFromPrompt,
} from "@/lib/procedural-art";

const PROMPT_IDEAS_EN = [
  "neon samurai under a violet moon",
  "cyberpunk city drenched in rain",
  "sakura spirit glowing in the dark",
  "aurora over a floating shrine",
  "starlit magical girl, holographic",
];
const PROMPT_IDEAS_ES = [
  "samurái de neón bajo una luna violeta",
  "ciudad cyberpunk empapada de lluvia",
  "espíritu de sakura brillando en la oscuridad",
  "aurora sobre un santuario flotante",
  "chica mágica bajo las estrellas, holográfica",
];

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function Studio() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const es = language === "es";
  const tt = useCallback((en: string, esStr: string) => (es ? esStr : en), [es]);

  const creations = useCreations();

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(DEFAULT_STYLE);
  const [roll, setRoll] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => creations.find((c) => c.id === activeId) ?? null,
    [creations, activeId],
  );

  const previewRef = useRef<HTMLCanvasElement>(null);

  const seed = useMemo(
    () => seedFromPrompt(prompt || "aoi", roll),
    [prompt, roll],
  );

  // Live preview: re-render whenever prompt / style / seed changes.
  useEffect(() => {
    if (previewRef.current) {
      renderArtwork(previewRef.current, { prompt: prompt || "aoi", seed, style, size: 640 });
    }
  }, [prompt, style, seed]);

  const handleGenerate = useCallback(() => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      toast({
        title: tt("Describe your vision", "Describe tu visión"),
        description: tt(
          "Type a prompt so Aoi has something to dream about.",
          "Escribe un prompt para que Aoi tenga algo que soñar.",
        ),
      });
      return;
    }
    setIsGenerating(true);
    // Render off-screen at full resolution, then persist the PNG.
    const canvas = document.createElement("canvas");
    const activeSeed = seedFromPrompt(trimmed, roll);
    renderArtwork(canvas, { prompt: trimmed, seed: activeSeed, style, size: 768 });
    const dataUrl = canvas.toDataURL("image/png");

    // A short beat so the "dreaming" state reads as real work.
    window.setTimeout(() => {
      addCreation({ prompt: trimmed, seed: activeSeed, style, dataUrl });
      setIsGenerating(false);
      setRoll((r) => r + 1); // next generation of the same prompt varies
      toast({
        title: tt("Artwork saved", "Obra guardada"),
        description: tt(
          "Added to your gallery below.",
          "Añadida a tu galería abajo.",
        ),
      });
    }, 650);
  }, [prompt, roll, style, toast, tt]);

  const surprise = useCallback(() => {
    const ideas = es ? PROMPT_IDEAS_ES : PROMPT_IDEAS_EN;
    setPrompt(ideas[Math.floor(Math.random() * ideas.length)]);
    setRoll((r) => r + 1);
  }, [es]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return creations.filter((c) => {
      if (favoritesOnly && !c.favorite) return false;
      if (q && !c.prompt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [creations, query, favoritesOnly]);

  const favCount = creations.filter((c) => c.favorite).length;

  const styleLabel = (id: string) => {
    const s = ART_STYLES.find((x) => x.id === id);
    return s ? (es ? s.labelEs : s.labelEn) : id;
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-neon-pink" />
            {tt("Aoi Canvas", "Aoi Canvas")}
          </h1>
          <p className="text-muted-foreground">
            {tt(
              "A real generative studio — describe a scene and Aoi paints a one-of-a-kind neon artwork you can keep, favorite and download. Every piece is reproducible from its seed.",
              "Un estudio generativo real: describe una escena y Aoi pinta una obra de neón única que puedes guardar, marcar como favorita y descargar. Cada pieza es reproducible desde su semilla.",
            )}
          </p>
        </div>

        {/* Composer */}
        <div className="grid gap-6 lg:grid-cols-[1fr_minmax(280px,420px)]">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base">{tt("Prompt", "Prompt")}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-neon-purple"
                  onClick={surprise}
                >
                  <Dice5 className="w-4 h-4" />
                  {tt("Surprise me", "Sorpréndeme")}
                </Button>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={tt(
                  "e.g. neon samurai under a violet moon, glowing petals",
                  "p. ej. samurái de neón bajo una luna violeta, pétalos brillantes",
                )}
                className="min-h-[110px] text-base"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block">{tt("Style", "Estilo")}</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ART_STYLES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {es ? s.labelEs : s.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">{tt("Seed", "Semilla")}</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={seed}
                    className="font-mono text-sm"
                    aria-label={tt("Current seed", "Semilla actual")}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setRoll((r) => r + 1)}
                    aria-label={tt("Re-roll seed", "Nueva semilla")}
                    title={tt("Re-roll seed", "Nueva semilla")}
                  >
                    <Dice5 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 text-lg gap-2 bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90"
            >
              <Wand2 className="w-5 h-5" />
              {isGenerating
                ? tt("Dreaming…", "Soñando…")
                : tt("Generate artwork", "Generar obra")}
            </Button>
          </Card>

          {/* Live preview */}
          <Card className="p-4 bg-card/30 backdrop-blur border-border/50">
            <Label className="mb-3 block text-muted-foreground text-sm">
              {tt("Live preview", "Vista previa en vivo")}
            </Label>
            <div className="relative rounded-lg overflow-hidden border border-border/50">
              <canvas
                ref={previewRef}
                className={`w-full aspect-square transition-opacity ${
                  isGenerating ? "opacity-60" : "opacity-100"
                }`}
              />
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-neon-pink font-medium">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    {tt("Dreaming…", "Soñando…")}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Gallery */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {tt("Your gallery", "Tu galería")}
              <Badge variant="secondary">{creations.length}</Badge>
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={tt("Search prompts…", "Buscar prompts…")}
                  className="pl-10 w-48 sm:w-56 bg-muted/30"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="fav-only"
                  checked={favoritesOnly}
                  onCheckedChange={setFavoritesOnly}
                />
                <Label htmlFor="fav-only" className="text-sm flex items-center gap-1">
                  <Star className="w-4 h-4 text-neon-purple" />
                  {tt("Favorites", "Favoritos")} ({favCount})
                </Label>
              </div>
              {creations.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    clearCreations();
                    toast({ title: tt("Gallery cleared", "Galería vaciada") });
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  {tt("Clear all", "Vaciar todo")}
                </Button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 bg-card/30 border-border/50 border-dashed flex flex-col items-center justify-center text-center">
              <ImageOff className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                {creations.length === 0
                  ? tt(
                      "No creations yet — generate your first artwork above.",
                      "Aún no hay creaciones: genera tu primera obra arriba.",
                    )
                  : tt("No creations match your filters.", "Ninguna creación coincide con tus filtros.")}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((c) => (
                <Card
                  key={c.id}
                  className="group overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:border-neon-pink/50 transition-colors"
                >
                  <button
                    className="block w-full aspect-square relative"
                    onClick={() => setActiveId(c.id)}
                    aria-label={tt("View artwork", "Ver obra")}
                  >
                    <img
                      src={c.dataUrl}
                      alt={c.prompt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2">
                      <Badge className="bg-black/60 backdrop-blur text-[10px]">
                        {styleLabel(c.style)}
                      </Badge>
                    </span>
                  </button>
                  <div className="p-3 space-y-2">
                    <p className="text-xs line-clamp-2 min-h-[2rem]" title={c.prompt}>
                      {c.prompt}
                    </p>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleFavorite(c.id)}
                        aria-label={
                          c.favorite
                            ? tt("Remove favorite", "Quitar favorito")
                            : tt("Add favorite", "Añadir favorito")
                        }
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            c.favorite ? "fill-neon-pink text-neon-pink" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          downloadDataUrl(c.dataUrl, `aoi-${c.seed}.png`)
                        }
                        aria-label={tt("Download", "Descargar")}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto text-destructive"
                        onClick={() => deleteCreation(c.id)}
                        aria-label={tt("Delete", "Eliminar")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActiveId(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <div className="space-y-4">
              <img
                src={active.dataUrl}
                alt={active.prompt}
                className="w-full rounded-lg border border-border/50"
              />
              <div className="space-y-2">
                <p className="text-sm">{active.prompt}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="secondary">{styleLabel(active.style)}</Badge>
                  <span className="font-mono">seed: {active.seed}</span>
                  <span>·</span>
                  <span>{new Date(active.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className="gap-2 bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90"
                  onClick={() => downloadDataUrl(active.dataUrl, `aoi-${active.seed}.png`)}
                >
                  <Download className="w-4 h-4" />
                  {tt("Download PNG", "Descargar PNG")}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setPrompt(active.prompt);
                    setStyle(active.style);
                    setActiveId(null);
                    toast({
                      title: tt("Prompt loaded", "Prompt cargado"),
                      description: tt(
                        "Tweak it and generate a variation.",
                        "Ajústalo y genera una variación.",
                      ),
                    });
                  }}
                >
                  <Copy className="w-4 h-4" />
                  {tt("Remix prompt", "Remezclar prompt")}
                </Button>
                <Button
                  variant="ghost"
                  className="gap-2"
                  onClick={() => toggleFavorite(active.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      active.favorite ? "fill-neon-pink text-neon-pink" : ""
                    }`}
                  />
                  {active.favorite
                    ? tt("Favorited", "Favorito")
                    : tt("Favorite", "Favorito")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
