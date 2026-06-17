import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { CommandPalette } from "@/components/CommandPalette";
import { SkipLink } from "@/components/SkipLink";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <SkipLink />
      <CommandPalette />
      <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
        <AppSidebar />
        {/* min-w-0 lets this flex column shrink below its content's intrinsic
            width so pages don't force horizontal overflow on tablet/mobile */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 p-4 sm:p-6 overflow-x-hidden overflow-y-auto focus:outline-none"
          >
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
