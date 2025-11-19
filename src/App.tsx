import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageSelection from "./pages/LanguageSelection";
import Home from "./pages/Home";
import QuickCreate from "./pages/QuickCreate";
import Characters from "./pages/Characters";
import Chat from "./pages/Chat";
import ImageGenerator from "./pages/ImageGenerator";
import VideoGenerator from "./pages/VideoGenerator";
import ModelHub from "./pages/ModelHub";
import Tools from "./pages/Tools";
import History from "./pages/History";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageSelection />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create/quick" element={<QuickCreate />} />
            <Route path="/create/advanced" element={<QuickCreate />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/image" element={<ImageGenerator />} />
            <Route path="/video" element={<VideoGenerator />} />
            <Route path="/model-hub" element={<ModelHub />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/history" element={<History />} />
            <Route path="/account" element={<Account />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
