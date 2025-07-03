
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import DashboardPage from "./pages/DashboardPage";
import TimerNotificationPage from "./pages/TimerNotificationPage";
import ReportPage from "./pages/ReportPage";
import RewardPage from "./pages/RewardPage";
import SocialTeamPage from "./pages/SocialTeamPage";

import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 flex items-center border-b bg-white/90 backdrop-blur-md px-4">
                <SidebarTrigger className="mr-4" />
                <div className="flex-1">
                  <Header currentPoints={120} />
                </div>
              </header>
              <main className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/timer" element={<TimerNotificationPage />} />
                  <Route path="/reports" element={<ReportPage />} />
                  <Route path="/rewards" element={<RewardPage />} />
                  <Route path="/social" element={<SocialTeamPage />} />
                  
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
