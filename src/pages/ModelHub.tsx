import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Heart } from "lucide-react";

const mockModels = [
  { id: 1, name: "Anime Dream v4", tag: "STYLE", category: "base", downloads: "125K" },
  { id: 2, name: "Realistic Pro XL", tag: "STYLE", category: "base", downloads: "98K" },
  { id: 3, name: "Character Detail LoRA", tag: "CHARACTER", category: "lora", downloads: "56K" },
  { id: 4, name: "Fantasy Concept", tag: "CONCEPT", category: "lora", downloads: "43K" },
  { id: 5, name: "Portrait Master", tag: "STYLE", category: "base", downloads: "87K" },
  { id: 6, name: "Lighting Fix LoRA", tag: "STYLE", category: "lora", downloads: "34K" },
];

export default function ModelHub() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Model Hub</h1>
          <p className="text-muted-foreground">
            Browse and discover AI models, LoRAs, and embeddings
          </p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search models..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="style">Style</SelectItem>
              <SelectItem value="character">Character</SelectItem>
              <SelectItem value="concept">Concept</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="base" className="space-y-6">
          <TabsList>
            <TabsTrigger value="base">Base Models</TabsTrigger>
            <TabsTrigger value="lora">LoRAs</TabsTrigger>
            <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
          </TabsList>

          <TabsContent value="base" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockModels
                .filter((m) => m.category === "base")
                .map((model) => (
                  <Card
                    key={model.id}
                    className="p-4 hover:scale-105 transition-all cursor-pointer hover-glow bg-card/50 backdrop-blur border-border/50"
                  >
                    <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-3" />
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {model.tag}
                        </Badge>
                        <h3 className="font-semibold">{model.name}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {model.downloads} downloads
                    </p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="lora" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockModels
                .filter((m) => m.category === "lora")
                .map((model) => (
                  <Card
                    key={model.id}
                    className="p-4 hover:scale-105 transition-all cursor-pointer hover-glow bg-card/50 backdrop-blur border-border/50"
                  >
                    <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-3" />
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {model.tag}
                        </Badge>
                        <h3 className="font-semibold">{model.name}</h3>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {model.downloads} downloads
                    </p>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="embeddings" className="mt-0">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Embeddings will be available soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
