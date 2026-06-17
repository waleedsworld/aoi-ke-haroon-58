import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense, lazy } from "react";
import { RouteFallback } from "@/components/RouteFallback";
// Keep the language gate (entry route "/") eager so first paint has no Suspense flash.
import LanguageSelection from "./pages/LanguageSelection";

// Lazily load every downstream route so the initial bundle only carries the
// language gate. Each page (and its heavy deps) is fetched on demand.
const Home = lazy(() => import("./pages/Home"));
const QuickCreate = lazy(() => import("./pages/QuickCreate"));
const Characters = lazy(() => import("./pages/Characters"));
const Chat = lazy(() => import("./pages/Chat"));
const ImageGenerator = lazy(() => import("./pages/ImageGenerator"));
const Studio = lazy(() => import("./pages/Studio"));
const VideoGenerator = lazy(() => import("./pages/VideoGenerator"));
const ModelHub = lazy(() => import("./pages/ModelHub"));
const Tools = lazy(() => import("./pages/Tools"));
const History = lazy(() => import("./pages/History"));
const Account = lazy(() => import("./pages/Account"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<LanguageSelection />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create/quick" element={<QuickCreate />} />
              <Route path="/create/advanced" element={<QuickCreate />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/image" element={<ImageGenerator />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/video" element={<VideoGenerator />} />
              <Route path="/model-hub" element={<ModelHub />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/history" element={<History />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
