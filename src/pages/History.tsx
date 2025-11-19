import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, MessageSquare, Trash2, Download } from "lucide-react";

const mockImageHistory = [
  { id: 1, prompt: "anime girl with red hair...", timestamp: "2 hours ago" },
  { id: 2, prompt: "fantasy landscape with mountains...", timestamp: "5 hours ago" },
  { id: 3, prompt: "cyberpunk city at night...", timestamp: "1 day ago" },
  { id: 4, prompt: "character portrait, detailed...", timestamp: "2 days ago" },
];

const mockChatHistory = [
  { id: 1, character: "Luna", title: "Medieval Adventure", timestamp: "3 hours ago" },
  { id: 2, character: "Marcus", title: "Mystery Investigation", timestamp: "1 day ago" },
  { id: 3, character: "Aria", title: "Fantasy Quest", timestamp: "3 days ago" },
];

export default function History() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">History</h1>
          <p className="text-muted-foreground">
            View and manage your generation history
          </p>
        </div>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="chats">Stories & Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockImageHistory.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:scale-105 transition-all bg-card/50 backdrop-blur border-border/50"
                >
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg mb-3 flex items-center justify-center">
                    <Image className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium mb-1 line-clamp-2">{item.prompt}</p>
                  <p className="text-xs text-muted-foreground mb-3">{item.timestamp}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chats" className="mt-0">
            <div className="space-y-3">
              {mockChatHistory.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:scale-[1.02] transition-all cursor-pointer bg-card/50 backdrop-blur border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary">{item.character}</Badge>
                          <span>•</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
