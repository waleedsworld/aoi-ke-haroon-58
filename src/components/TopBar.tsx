import { Search, Bell, Coins, Plus, Users, MessageSquare, BookOpen, FileText, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CommandPaletteHint } from "@/components/CommandPalette";

export function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-lg">
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3">
        <SidebarTrigger className="shrink-0" />

        <div className="flex-1 min-w-0 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              aria-label="Search characters, models and styles"
              placeholder="Search characters, models, styles..."
              className="pl-10 bg-muted/30 border-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <CommandPaletteHint />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Create new">
                <Plus className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Create</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/create/quick")}>
                <Users className="w-4 h-4 mr-2" />
                Characters
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/chat")}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Group Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Create Publication
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BookOpen className="w-4 h-4 mr-2" />
                Book of Knowledge
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/model-hub")}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Model
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications, 3 unread">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-primary text-[10px]">
              3
            </Badge>
          </Button>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/50 border border-border/50">
            <Coins className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium">1,250</span>
          </div>

          <Button
            className="hidden lg:flex bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90"
            size="sm"
          >
            Subscribe
          </Button>

          <LanguageSelector />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account menu">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-neon-pink to-neon-purple text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/account")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
