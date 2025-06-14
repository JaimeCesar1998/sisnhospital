

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { LoginPage } from "@/components/LoginPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HospitalDashboard } from "./pages/HospitalDashboard";
import { NationalDashboard } from "./pages/NationalDashboard";
import { DiseasesPage } from "./pages/hospital/DiseasesPage";
import { PatientsPage } from "./pages/hospital/PatientsPage";
import { StaffPage } from "./pages/hospital/StaffPage";
import { ResourcesPage } from "./pages/hospital/ResourcesPage";
import { ClinicalServicesPage } from "./pages/hospital/ClinicalServicesPage";
import { MobilityPage } from "./pages/hospital/MobilityPage";
import { EpidemiologyPage } from "./pages/national/EpidemiologyPage";
import { NationalSupervisionPage } from "./pages/national/NationalSupervisionPage";
import { StrategicPlanningPage } from "./pages/national/StrategicPlanningPage";
import { NationalResourcesPage } from "./pages/national/NationalResourcesPage";
import { ReportsPage } from "./pages/national/ReportsPage";
import { HospitalManagementPage } from "./pages/national/HospitalManagementPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <DataProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/hospital" element={
                  <DashboardLayout>
                    <HospitalDashboard />
                  </DashboardLayout>
                } />
                <Route path="/hospital/diseases" element={
                  <DashboardLayout>
                    <DiseasesPage />
                  </DashboardLayout>
                } />
                <Route path="/hospital/patients" element={
                  <DashboardLayout>
                    <PatientsPage />
                  </DashboardLayout>
                } />
                <Route path="/hospital/staff" element={
                  <DashboardLayout>
                    <StaffPage />
                  </DashboardLayout>
                } />
                <Route path="/hospital/resources" element={
                  <DashboardLayout>
                    <ResourcesPage />
                  </DashboardLayout>
                } />
                <Route path="/hospital/clinical-services" element={
                  <DashboardLayout>
                    <ClinicalServicesPage />
                  </DashboardLayout>
                } />
                <Route path="/hospital/mobility" element={
                  <DashboardLayout>
                    <MobilityPage />
                  </DashboardLayout>
                } />
                <Route path="/national" element={
                  <DashboardLayout>
                    <NationalDashboard />
                  </DashboardLayout>
                } />
                <Route path="/national/epidemiology" element={
                  <DashboardLayout>
                    <EpidemiologyPage />
                  </DashboardLayout>
                } />
                <Route path="/national/supervision" element={
                  <DashboardLayout>
                    <NationalSupervisionPage />
                  </DashboardLayout>
                } />
                <Route path="/national/planning" element={
                  <DashboardLayout>
                    <StrategicPlanningPage />
                  </DashboardLayout>
                } />
                <Route path="/national/resources" element={
                  <DashboardLayout>
                    <NationalResourcesPage />
                  </DashboardLayout>
                } />
                <Route path="/national/reports" element={
                  <DashboardLayout>
                    <ReportsPage />
                  </DashboardLayout>
                } />
                <Route path="/national/hospitals" element={
                  <DashboardLayout>
                    <HospitalManagementPage />
                  </DashboardLayout>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </DataProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

