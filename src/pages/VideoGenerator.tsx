import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sparkles, ChevronDown, Plus, Upload, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VideoGenerator() {
  const [selectedModel, setSelectedModel] = useState("wan2.5");
  const { t } = useLanguage();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-card/30 border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-lg bg-muted/20 flex items-center justify-center cursor-pointer hover:bg-muted/30">
              <div className="text-center">
                <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">{t("video.addImage")}</p>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium mb-1">{t("video.firstFrame")}</h4>
              <p className="text-sm text-muted-foreground">{t("video.selectImage")}</p>
            </div>
          </div>
        </Card>

        <Textarea placeholder={t("video.prompt")} className="min-h-[100px] bg-card/30 border-border/50" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Sparkles className="w-3 h-3" />
                  {selectedModel === "wan2.5" ? "Wan2.5" : "AnimateDiff"}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover z-50">
                <DropdownMenuItem onClick={() => setSelectedModel("wan2.5")}>WAN Video 2.5</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedModel("wan2.2")}>WAN Video 2.2</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedModel("animate")}>AnimateDiff</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button className="gap-2 bg-gradient-to-r from-neon-purple to-neon-blue">
            <Plus className="w-4 h-4" />
            Generate
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
