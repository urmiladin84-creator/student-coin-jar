import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index.tsx";
import History from "./pages/History.tsx";
import Analytics from "./pages/Analytics.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useEffect } from "react";
import { loadData } from "@/lib/storage";

const queryClient = new QueryClient();

function DarkModeInit() {
  useEffect(() => {
    const data = loadData();
    if (data.darkMode) document.documentElement.classList.add("dark");
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <DarkModeInit />
        <BrowserRouter>
          <div className="mx-auto min-h-screen max-w-lg">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/history" element={<History />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
