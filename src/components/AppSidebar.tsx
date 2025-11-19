import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  MessageSquare,
  BookOpen,
  ImageIcon,
  VideoIcon,
  Trophy,
  Sparkles,
  Film,
  Wand2,
  Grid3x3,
  Dumbbell,
  Wrench,
  History,
  Target,
  Smartphone,
  BookMarked,
  Settings,
  Mail,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [tavernOpen, setTavernOpen] = useState(false);
  const [modelHubOpen, setModelHubOpen] = useState(false);
  const [imageToolsOpen, setImageToolsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card/30">
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {/* Tavern Dropdown */}
            <Collapsible open={tavernOpen} onOpenChange={setTavernOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <MessageSquare className="w-4 h-4" />
                    <span>Tavern</span>
                    <ChevronRight
                      className={`ml-auto w-4 h-4 transition-transform ${
                        tavernOpen ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/chat")}>
                        <NavLink to="/chat">
                          <span>Chat</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/characters")}>
                        <NavLink to="/characters">
                          <span>Characters</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Lorebooks */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BookOpen className="w-4 h-4" />
                <span>Lorebooks</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Posts */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <ImageIcon className="w-4 h-4" />
                <span>Posts</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Videos */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <VideoIcon className="w-4 h-4" />
                <span>Videos</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Contests */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Trophy className="w-4 h-4" />
                <span>Contests</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <div className="my-2 border-t border-border/20" />

            {/* Image Gen */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/image")}>
                <NavLink to="/image">
                  <Sparkles className="w-4 h-4" />
                  <span>Image Gen</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Video Gen */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/video")}>
                <NavLink to="/video">
                  <Film className="w-4 h-4" />
                  <span>Video Gen</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Image Editing */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/tools")}>
                <NavLink to="/tools">
                  <Wand2 className="w-4 h-4" />
                  <span>Image Editing</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Model Hub Dropdown */}
            <Collapsible open={modelHubOpen} onOpenChange={setModelHubOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className={isActive("/model-hub") ? "bg-sidebar-accent" : ""}>
                    <Grid3x3 className="w-4 h-4" />
                    <span>Model Hub</span>
                    <ChevronRight
                      className={`ml-auto w-4 h-4 transition-transform ${
                        modelHubOpen ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild isActive={isActive("/model-hub")}>
                        <NavLink to="/model-hub">
                          <span>Browse Models</span>
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* Train LoRA */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Dumbbell className="w-4 h-4" />
                <span>Train LoRA</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Image Tools Dropdown */}
            <Collapsible open={imageToolsOpen} onOpenChange={setImageToolsOpen}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Wrench className="w-4 h-4" />
                    <span>Image Tools</span>
                    <ChevronRight
                      className={`ml-auto w-4 h-4 transition-transform ${
                        imageToolsOpen ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Upscale</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>
                        <span>Enhance</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>

            {/* History */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/history")}>
                <NavLink to="/history">
                  <History className="w-4 h-4" />
                  <span>History</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <div className="my-2 border-t border-border/20" />

            {/* Content Settings */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Target className="w-4 h-4" />
                <span>Content Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Mobile App */}
            <SidebarMenuItem>
              <SidebarMenuButton className="border border-border/50">
                <Smartphone className="w-4 h-4" />
                <span>Mobile App</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Guides */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BookMarked className="w-4 h-4" />
                <span>Guides</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Settings */}
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/settings")}>
                <NavLink to="/settings">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Contact Us */}
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
