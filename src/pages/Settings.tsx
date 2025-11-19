import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your app preferences</p>
        </div>

        {/* General Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">General</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Currently locked to dark mode
                  </p>
                </div>
                <Switch id="theme" disabled checked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about generations
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Generation Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Generation Defaults</h3>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Default AI Model</Label>
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
                <Label className="mb-2 block">Default Canvas Size</Label>
                <Select defaultValue="1024">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="512">512x512</SelectItem>
                    <SelectItem value="1024">1024x1024</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-save">Auto-save Generations</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save all generated content
                  </p>
                </div>
                <Switch id="auto-save" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="hires">Enable Hires.fix by Default</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically apply upscaling to images
                  </p>
                </div>
                <Switch id="hires" />
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50 space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Privacy & Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="private">Private Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide your generations from public galleries
                  </p>
                </div>
                <Switch id="private" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve the app by sharing usage data
                  </p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex-1">
            Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1">
            Reset to Default
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
