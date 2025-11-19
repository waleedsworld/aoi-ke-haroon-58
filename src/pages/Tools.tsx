import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crop, Sparkles, Maximize2 } from "lucide-react";

export default function Tools() {
  const handleReset = () => {
    // Mock reset functionality
    console.log("Settings reset to default");
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Image Tools</h1>
          <p className="text-muted-foreground">
            Edit and enhance your images with AI-powered tools
          </p>
        </div>

        <Tabs defaultValue="crop" className="space-y-6">
          <TabsList>
            <TabsTrigger value="crop">Crop & Resize</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="upscale">Upscalers</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Preview Area */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card/30 backdrop-blur border-border/50">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Upload an image to get started</p>
                  </div>
                </div>
                <Button className="w-full">Upload Image</Button>
              </Card>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <TabsContent value="crop" className="mt-0">
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-4">
                  <div className="flex items-center gap-2">
                    <Crop className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Crop Settings</h3>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Aspect Ratio</Label>
                    <Select defaultValue="free">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="1:1">1:1 (Square)</SelectItem>
                        <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                        <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                        <SelectItem value="3:2">3:2 (Photo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Rotation</Label>
                    <Slider defaultValue={[0]} min={-180} max={180} step={1} />
                    <p className="text-sm text-muted-foreground mt-1">0°</p>
                  </div>

                  <Button className="w-full">Apply Crop</Button>
                </Card>
              </TabsContent>

              <TabsContent value="filters" className="mt-0">
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-4">
                  <h3 className="font-bold">Filter Settings</h3>

                  <div>
                    <Label className="mb-2 block">Brightness</Label>
                    <Slider defaultValue={[50]} min={0} max={100} step={1} />
                  </div>

                  <div>
                    <Label className="mb-2 block">Contrast</Label>
                    <Slider defaultValue={[50]} min={0} max={100} step={1} />
                  </div>

                  <div>
                    <Label className="mb-2 block">Saturation</Label>
                    <Slider defaultValue={[50]} min={0} max={100} step={1} />
                  </div>

                  <div>
                    <Label className="mb-2 block">Blur</Label>
                    <Slider defaultValue={[0]} min={0} max={100} step={1} />
                  </div>

                  <Button variant="outline" className="w-full" onClick={handleReset}>
                    Reset Filters
                  </Button>
                </Card>
              </TabsContent>

              <TabsContent value="upscale" className="mt-0">
                <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-4">
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Upscaler Settings</h3>
                  </div>

                  <div>
                    <Label className="mb-2 block">Main Upscaling (Post-process)</Label>
                    <Select defaultValue="esrgan">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="esrgan">ESRGAN 4x</SelectItem>
                        <SelectItem value="real">Real-ESRGAN</SelectItem>
                        <SelectItem value="anime">Anime4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Inference Upscaling</Label>
                    <Select defaultValue="latent">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="latent">Latent</SelectItem>
                        <SelectItem value="nearest">Nearest</SelectItem>
                        <SelectItem value="bilinear">Bilinear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Upscale Factor</Label>
                    <Slider defaultValue={[2]} min={1} max={4} step={1} />
                    <p className="text-sm text-muted-foreground mt-1">2x</p>
                  </div>

                  <Button className="w-full">Apply Upscaling</Button>
                  
                  <Button variant="outline" size="sm" className="w-full" onClick={handleReset}>
                    Reset to default
                  </Button>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}
