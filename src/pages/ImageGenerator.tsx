import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wand2, Upload, Download, Heart, Sparkles, Image as ImageIcon, Clock, RotateCcw, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mockModels = [
  { id: 1, name: "Anime Base v2", tag: "STYLE" },
  { id: 2, name: "Realistic Pro", tag: "STYLE" },
  { id: 3, name: "Fantasy Mix", tag: "CHARACTER" },
];

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [imagePromptOn, setImagePromptOn] = useState(false);
  const [hiresFixOn, setHiresFixOn] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("art");
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    toast({
      title: "Generating Image",
      description: "Your image is being created...",
    });
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Image Generated!",
        description: "Your image is ready.",
      });
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* Left Sidebar Icons */}
        <div className="w-16 bg-card/30 border-r border-border/50 flex flex-col items-center py-4 gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <ImageIcon className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-pink rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sparkles className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Clock className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Top Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md">
                <TabsTrigger value="art" className="flex-1 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Art
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1 gap-2">
                  <Wand2 className="w-4 h-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger value="editing" className="flex-1 gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Image Editing
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Prompt Area */}
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Textarea
                      placeholder="masterpiece, best quality, amazing quality, very aesthetic, absurdres"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[80px] text-base"
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-muted-foreground"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image prompt
                    </Button>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-neon-pink" />
                      <span className="text-sm text-neon-pink font-medium">On</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-12 text-lg gap-2 bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90"
                >
                  <Wand2 className="w-5 h-5" />
                  {isGenerating ? "Generating..." : "Generate + Hires.fix"}
                  <span className="ml-auto">7</span>
                </Button>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label>Negative Prompt</Label>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <Textarea
                    placeholder="low quality, blurry, distorted..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </Card>

            {/* Generated Image Display */}
            <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
              <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-border">
                <p className="text-muted-foreground">Generated image will appear here</p>
              </div>
            </Card>

            {/* Model Hub */}
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  Model Hub
                  <ChevronDown className="w-5 h-5" />
                </h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="base">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base Models</SelectItem>
                      <SelectItem value="lora">LoRAs</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="style">Style</SelectItem>
                      <SelectItem value="character">Character</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 mb-6">
                {mockModels.map((model) => (
                  <Card
                    key={model.id}
                    className="p-2 cursor-pointer hover:scale-105 transition-all group"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-2 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <Badge className="absolute bottom-2 left-2 text-xs bg-neon-purple/80">
                        {model.tag}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium truncate">{model.name}</p>
                  </Card>
                ))}
              </div>

              {/* Spells Section */}
              <div className="border-t border-border/50 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold flex items-center gap-2">
                    Spells
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </h4>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="hub">
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hub">Hub (beta)</SelectItem>
                        <SelectItem value="my">My Spells</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="style">Style</SelectItem>
                        <SelectItem value="character">Character</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <Card
                      key={i}
                      className="p-2 cursor-pointer hover:scale-105 transition-all group"
                    >
                      <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg mb-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <Badge className="absolute bottom-1 left-1 text-xs bg-cyan-500/80">
                          STYLE
                        </Badge>
                      </div>
                      <p className="text-xs truncate">Spell {i + 1}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* Additional Features Sections */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  Textual Investments / Embeddings
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select embedding..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="style1">Style Embedding 1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  IP-Adapter
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select adapter..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="adapter1">IP Adapter v1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  T2I-Adapter
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select adapter..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="t2i1">T2I Adapter v1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  Hypernetworks
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hypernetwork..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="hyper1">Hypernetwork v1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  LyCORIS
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select LyCORIS..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="lycoris1">LyCORIS Model 1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  Style Vectors / Aesthetic Gradients
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                </h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="aesthetic1">Aesthetic v1</SelectItem>
                  </SelectContent>
                </Select>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Settings Panel */}
        <div className="w-96 bg-card/30 border-l border-border/50 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Image-to-Image */}
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <h3 className="font-bold mb-4">Image-to-Image</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click or drag a file to this area to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG, WEBP and max size 3 Mb
                </p>
              </div>
            </Card>

            {/* Settings */}
            <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h3 className="font-bold">Settings</h3>
                  {settingsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label>Canvas Size</Label>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      <ChevronUp className="w-4 h-4 ml-auto" />
                    </div>
                    <Select defaultValue="custom">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom</SelectItem>
                        <SelectItem value="1024">1024x1024</SelectItem>
                        <SelectItem value="512">512x512</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">w</span>
                        <Input type="number" defaultValue="1216" className="text-sm" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">h</span>
                        <Input type="number" defaultValue="832" className="text-sm" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Label>Hires.fix</Label>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <Switch checked={hiresFixOn} onCheckedChange={setHiresFixOn} />
                    </div>
                    {hiresFixOn && (
                      <div className="space-y-3 mt-3 pl-2">
                        <Button variant="ghost" size="sm" className="text-xs text-neon-pink">
                          Set to default
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          resize: from 1216×832 to 2432×1664
                        </p>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-sm flex items-center gap-1">
                              Upscale By (1 - 2.0)
                              <HelpCircle className="w-3 h-3 text-muted-foreground" />
                            </Label>
                            <span className="text-sm">2</span>
                          </div>
                          <Slider defaultValue={[2]} min={1} max={2} step={0.1} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-sm flex items-center gap-1">
                              Hires Steps (1 - 35)
                              <HelpCircle className="w-3 h-3 text-muted-foreground" />
                            </Label>
                            <span className="text-sm">10</span>
                          </div>
                          <Slider defaultValue={[10]} min={1} max={35} step={1} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-sm flex items-center gap-1">
                              Denoising Strength (0 - 1)
                              <HelpCircle className="w-3 h-3 text-muted-foreground" />
                            </Label>
                            <span className="text-sm">0.2</span>
                          </div>
                          <Slider defaultValue={[0.2]} min={0} max={1} step={0.05} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Label className="text-sm">Upscale</Label>
                            <Wand2 className="w-3 h-3" />
                          </div>
                          <Select defaultValue="r-esrgan">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="r-esrgan">R-ESRGAN 4x+ Anime6B</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Regional Prompter</Label>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Label>ADetailer</Label>
                        <HelpCircle className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>High Priority</Label>
                      <Switch />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="ghost" className="w-full text-neon-pink justify-center gap-2">
                      <span>Add ControlNet</span>
                      <HelpCircle className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full mt-1 text-xs text-muted-foreground">
                      Learn ControlNet
                    </Button>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Advanced Settings */}
            <Collapsible open={advancedSettingsOpen} onOpenChange={setAdvancedSettingsOpen}>
              <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-4">
                  <h3 className="font-bold">Advanced Settings</h3>
                  {advancedSettingsOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <Button variant="ghost" size="sm" className="w-full text-neon-pink">
                    Set to default
                  </Button>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label className="text-sm flex items-center gap-1">
                        CLIP Skip (1 - 12)
                        <HelpCircle className="w-3 h-3 text-muted-foreground" />
                      </Label>
                      <span className="text-sm">2</span>
                    </div>
                    <Slider defaultValue={[2]} min={1} max={12} step={1} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">VAE</Label>
                      <HelpCircle className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <Select defaultValue="vae1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vae1">illustriousXLV20_v10.safetensors</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Label className="text-sm">ENSD</Label>
                      <HelpCircle className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <Input type="number" defaultValue="0" />
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Upscalers */}
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <h3 className="font-bold mb-4">Upscalers</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm mb-2 block">Main Upscaling (post-process)</Label>
                  <Select defaultValue="main1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main1">R-ESRGAN 4x+ Anime6B</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Preview Upscaling (canvas only)</Label>
                  <Select defaultValue="preview1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preview1">Lanczos</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Button variant="outline" className="w-full text-neon-pink border-neon-pink/50 hover:bg-neon-pink/10">
              Reset to default
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
