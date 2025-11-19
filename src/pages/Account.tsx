import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Coins, Crown, TrendingUp } from "lucide-react";

export default function Account() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Account</h1>
          <p className="text-muted-foreground">Manage your profile and subscription</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-3xl bg-gradient-to-br from-neon-pink to-neon-purple text-white">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">User Name</h2>
                <Badge className="bg-gradient-to-r from-neon-pink to-neon-purple">
                  <Crown className="w-3 h-3 mr-1" />
                  Free Plan
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">user@example.com</p>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
        </Card>

        {/* Coins Balance */}
        <Card className="p-6 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Credits</p>
                <p className="text-3xl font-bold">1,234</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-neon-pink to-neon-purple">
              Buy More Credits
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Used This Month</p>
              <p className="text-xl font-semibold">567</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Images Generated</p>
              <p className="text-xl font-semibold">143</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Characters Created</p>
              <p className="text-xl font-semibold">8</p>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscription</h3>
              <p className="text-muted-foreground">Current Plan: Free</p>
            </div>
            <Button className="bg-gradient-to-r from-neon-pink to-neon-purple">
              <TrendingUp className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">✓ 100 free credits per month</span>
              <span className="text-sm text-muted-foreground">Included</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">✓ Basic AI models</span>
              <span className="text-sm text-muted-foreground">Included</span>
            </div>
            <div className="flex items-center justify-between py-2 opacity-50">
              <span className="text-sm">✗ Priority generation</span>
              <span className="text-sm text-primary">Pro only</span>
            </div>
            <div className="flex items-center justify-between py-2 opacity-50">
              <span className="text-sm">✗ Advanced AI models</span>
              <span className="text-sm text-primary">Pro only</span>
            </div>
            <div className="flex items-center justify-between py-2 opacity-50">
              <span className="text-sm">✗ Unlimited characters</span>
              <span className="text-sm text-primary">Pro only</span>
            </div>
          </div>
        </Card>

        {/* Usage History */}
        <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "Generated image", credits: -5, time: "2 hours ago" },
              { action: "Created character", credits: -10, time: "5 hours ago" },
              { action: "Generated video", credits: -15, time: "1 day ago" },
              { action: "Purchased credits", credits: +500, time: "3 days ago" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                <p
                  className={`font-semibold ${
                    item.credits > 0 ? "text-green-500" : "text-muted-foreground"
                  }`}
                >
                  {item.credits > 0 ? "+" : ""}
                  {item.credits} credits
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
