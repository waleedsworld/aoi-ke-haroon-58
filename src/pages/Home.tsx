import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Image as ImageIcon, Video, Grid3x3, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import animeChar1 from "@/assets/anime-char-1.jpg";
import animeChar2 from "@/assets/anime-char-2.jpg";
import animeChar3 from "@/assets/anime-char-3.jpg";
import animeChar4 from "@/assets/anime-char-4.jpg";

const mockCharacters = [
  { id: 1, name: "Kiryuu Kikyou", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", category: "Anime", gender: "Female", tags: ["Roleplay"] },
  { id: 2, name: "Luna", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop", category: "Fantasy", gender: "Female", tags: ["Adventure"] },
  { id: 3, name: "Aria", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop", category: "Gaming", gender: "Female", tags: ["Action"] },
  { id: 4, name: "Sakura", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop", category: "Anime", gender: "Female", tags: ["Slice of Life"] }
];

const categories = ["Events", "Fantasy", "Furry", "Gaming", "Gender: Female", "Gender: Male", "Giant", "Kemono"];

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8 relative">
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <img src={animeChar1} alt="" className="absolute top-10 left-10 w-72 h-96 object-cover opacity-5" />
          <img src={animeChar2} alt="" className="absolute top-20 right-20 w-72 h-96 object-cover opacity-5" />
          <img src={animeChar3} alt="" className="absolute bottom-20 left-1/4 w-72 h-96 object-cover opacity-5" />
          <img src={animeChar4} alt="" className="absolute bottom-10 right-1/3 w-72 h-96 object-cover opacity-5" />
        </div>

        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold">{t("hero.title")}</h1>
          <Badge variant="outline" className="text-sm"><span className="mr-1">📱</span> {t("hero.mobile")}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="p-6 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50 hover-glow" onClick={() => navigate("/chat")}>
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-xl flex items-center justify-center"><MessageSquare className="w-6 h-6 text-primary" /></div>
            <h3 className="text-lg font-bold text-center mb-2">{t("chat.title")}</h3>
            <p className="text-sm text-center text-muted-foreground">{t("chat.desc")}</p>
          </Card>
          <Card className="p-6 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50 hover-glow" onClick={() => navigate("/image")}>
            <div className="w-12 h-12 mx-auto mb-4 bg-orange-500/20 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-orange-500" /></div>
            <h3 className="text-lg font-bold text-center mb-2">{t("image.title")}</h3>
            <p className="text-sm text-center text-muted-foreground">{t("image.desc")}</p>
          </Card>
          <Card className="p-6 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50 hover-glow" onClick={() => navigate("/video")}>
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-xl flex items-center justify-center"><Video className="w-6 h-6 text-purple-500" /></div>
            <h3 className="text-lg font-bold text-center mb-2">{t("video.title")}</h3>
            <p className="text-sm text-center text-muted-foreground">{t("video.desc")}</p>
          </Card>
          <Card className="p-6 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50 hover-glow" onClick={() => navigate("/characters")}>
            <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-green-500" /></div>
            <h3 className="text-lg font-bold text-center mb-2">{t("publications.title")}</h3>
            <p className="text-sm text-center text-muted-foreground">{t("publications.desc")}</p>
          </Card>
          <Card className="p-6 hover:scale-105 transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50 hover-glow" onClick={() => navigate("/model-hub")}>
            <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500/20 rounded-xl flex items-center justify-center"><Grid3x3 className="w-6 h-6 text-cyan-500" /></div>
            <h3 className="text-lg font-bold text-center mb-2">{t("models.title")}</h3>
            <p className="text-sm text-center text-muted-foreground">{t("models.desc")}</p>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">{t("tavern.title")}</h2>
            <p className="text-muted-foreground max-w-4xl">{t("tavern.subtitle")}</p>
            <p className="text-sm text-muted-foreground">{t("tavern.available")}</p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-primary" />
                <span>{t("tavern.create")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-primary" />
                <span>{t("tavern.voice")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-primary" />
                <span>{t("tavern.books")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-primary" />
                <span>{t("tavern.image")}</span>
              </div>
            </div>
            <Button className="mt-4">{t("tavern.chat")}</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => <Badge key={cat} variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/20">{cat}</Badge>)}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCharacters.map((char) => (
              <Card key={char.id} className="overflow-hidden hover:scale-105 transition-all cursor-pointer" onClick={() => navigate("/chat")}>
                <div className="aspect-[3/4] relative">
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-4"><h4 className="font-bold text-white">{char.name}</h4></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
