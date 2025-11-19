import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const mockCharacters = [
  { id: 1, name: "Luna", avatar: "L" },
  { id: 2, name: "Marcus", avatar: "M" },
  { id: 3, name: "Aria", avatar: "A" },
];

export default function Chat() {
  const [selectedCharacter, setSelectedCharacter] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Luna. How can I help you today?" },
  ]);

  const handleSend = () => {
    if (!prompt.trim()) return;
    setMessages([...messages, { role: "user", content: prompt }]);
    setPrompt("");
    // Mock response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "This is a mock response from the AI character." },
      ]);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-120px)] flex gap-4">
        {/* Characters Sidebar */}
        <Card className="w-64 p-4 bg-card/50 backdrop-blur border-border/50 overflow-auto">
          <h3 className="font-bold mb-4">Characters</h3>
          <div className="space-y-2">
            {mockCharacters.map((char) => (
              <Button
                key={char.id}
                variant={selectedCharacter === char.id ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setSelectedCharacter(char.id)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {char.avatar}
                  </AvatarFallback>
                </Avatar>
                {char.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col p-6 bg-card/30 backdrop-blur border-border/50">
          <div className="flex-1 overflow-auto mb-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              className="min-h-[60px] resize-none"
            />
            <Button size="icon" className="h-[60px] w-[60px]" onClick={handleSend}>
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Settings Sidebar */}
        <Card className="w-80 p-4 bg-card/50 backdrop-blur border-border/50 overflow-auto">
          <Tabs defaultValue="story">
            <TabsList className="w-full">
              <TabsTrigger value="story" className="flex-1">Story</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="story" className="space-y-4 mt-4">
              <div>
                <Label className="mb-2 block">AI Model</Label>
                <Select defaultValue="creative">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative">Creative Writer</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="precise">Precise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Creativity</Label>
                <Slider defaultValue={[70]} max={100} step={1} />
              </div>
              <div>
                <Label className="mb-2 block">Story Length</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
              <div>
                <Label className="mb-2 block">Memory</Label>
                <Textarea
                  placeholder="Important context the AI should remember..."
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label className="mb-2 block">Author's Notes</Label>
                <Textarea
                  placeholder="Notes to guide the AI's responses..."
                  className="min-h-[80px]"
                />
              </div>
            </TabsContent>
            <TabsContent value="advanced" className="space-y-4 mt-4">
              <div>
                <Label className="mb-2 block">Temperature</Label>
                <Slider defaultValue={[0.7]} max={1} step={0.1} />
              </div>
              <div>
                <Label className="mb-2 block">Top P</Label>
                <Slider defaultValue={[0.9]} max={1} step={0.1} />
              </div>
              <div>
                <Label className="mb-2 block">Max Tokens</Label>
                <Slider defaultValue={[200]} max={500} step={10} />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
}
