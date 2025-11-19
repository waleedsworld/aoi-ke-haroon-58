import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe } from "lucide-react";

export default function LanguageSelection() {
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: "es" | "en") => {
    setLanguage(lang);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <Card className="max-w-md w-full p-8 space-y-6 bg-card/80 backdrop-blur-xl border-border/50">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent">Aoi Studio</h1>
          <p className="text-muted-foreground">Select your language / Selecciona tu idioma</p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={() => handleLanguageSelect("es")}
            className="w-full h-14 text-lg font-semibold"
            variant="default"
          >
            🇪🇸 Español
          </Button>
          <Button
            onClick={() => handleLanguageSelect("en")}
            className="w-full h-14 text-lg font-semibold"
            variant="outline"
          >
            🇺🇸 English
          </Button>
        </div>
      </Card>
    </div>
  );
}
