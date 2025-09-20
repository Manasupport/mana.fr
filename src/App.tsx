// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./i18n";

import Index from "./pages/Index";
import Manamind from "./pages/Manamind";
import Manacademy from "./pages/Manacademy";
import Manadvise from "./pages/Manadvise";
import APropos from "./pages/APropos";
import NousRejoindre from "./pages/NousRejoindre";
import NotFound from "./pages/NotFound";
import Resources from "./pages/Resources";
import ResourcesTutorials from "./pages/ResourcesTutorials";
import ResourcesAcademic from "./pages/ResourcesAcademic";
import StudentTutorials from "./pages/StudentTutorials";
import TeacherTutorials from "./pages/TeacherTutorials";
import ProjectManagement from "./pages/ProjectManagement";
import InternationalStrategy from "./pages/InternationalStrategy";
import ThesisResources from "./pages/ThesisResources";
import DesignThinking from "./pages/DesignThinking";
import ResourceView from "./pages/ResourceView";
import Publications from "./pages/Publications";
import ArticleDetail from "./pages/ArticleDetail";

// === Formations (pages individuelles) ===
import AgiliteInnovation from "./pages/formations/agilite-innovation";
import BusinessModelDesign from "./pages/formations/business-model-design";
import CultureStrategieInnovation from "./pages/formations/culture-strategie-innovation";
import DiagnosticStrategique from "./pages/formations/diagnostic-strategique";
import EcoConceptionBilanCarboneCsrd from "./pages/formations/eco-conception-bilan-carbone-csrd";
import EconomieCirculaireEcoInnovation from "./pages/formations/economie-circulaire-eco-innovation";
import IntelligenceArtificielleCasUsage from "./pages/formations/intelligence-artificielle-cas-usage";
import NumeriqueResponsableImpactDigital from "./pages/formations/numerique-responsable-impact-digital";
import PositionnementStrategiqueBusinessModel from "./pages/formations/positionnement-strategique-business-model";
import StrategieTransformationDurableRseOperationnelle from "./pages/formations/strategie-transformation-durable-rse-operationnelle";
import StrategiesDeCroissance from "./pages/formations/strategies-de-croissance";
import VisionMissionRaisonDetreValeurs from "./pages/formations/vision-mission-raison-detre-valeurs";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/manamind" element={<Manamind />} />
          <Route path="/manacademy" element={<Manacademy />} />
          <Route path="/manadvise" element={<Manadvise />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/nous-rejoindre" element={<NousRejoindre />} />

          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/tutorials" element={<ResourcesTutorials />} />
          <Route path="/resources/tutorials/student" element={<StudentTutorials />} />
          <Route path="/resources/tutorials/teacher" element={<TeacherTutorials />} />
          <Route path="/resources/academic" element={<ResourcesAcademic />} />
          <Route path="/resources/academic/project-management" element={<ProjectManagement />} />
          <Route path="/resources/academic/international-strategy" element={<InternationalStrategy />} />
          <Route path="/resources/academic/thesis" element={<ThesisResources />} />
          <Route path="/resources/academic/design-thinking" element={<DesignThinking />} />
          <Route path="/resources/view/:resourceId" element={<ResourceView />} />

          {/* Publications */}
          <Route path="/publications" element={<Publications />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/resources/publication" element={<Publications />} />

          {/* === Routes Formations (statiques) === */}
          <Route path="/formations/agilite-innovation" element={<AgiliteInnovation />} />
          <Route path="/formations/business-model-design" element={<BusinessModelDesign />} />
          <Route path="/formations/culture-strategie-innovation" element={<CultureStrategieInnovation />} />
          <Route path="/formations/diagnostic-strategique" element={<DiagnosticStrategique />} />
          <Route path="/formations/eco-conception-bilan-carbone-csrd" element={<EcoConceptionBilanCarboneCsrd />} />
          <Route path="/formations/economie-circulaire-eco-innovation" element={<EconomieCirculaireEcoInnovation />} />
          <Route path="/formations/intelligence-artificielle-cas-usage" element={<IntelligenceArtificielleCasUsage />} />
          <Route path="/formations/numerique-responsable-impact-digital" element={<NumeriqueResponsableImpactDigital />} />
          <Route path="/formations/positionnement-strategique-business-model" element={<PositionnementStrategiqueBusinessModel />} />
          <Route path="/formations/strategie-transformation-durable-rse-operationnelle" element={<StrategieTransformationDurableRseOperationnelle />} />
          <Route path="/formations/strategies-de-croissance" element={<StrategiesDeCroissance />} />
          <Route path="/formations/vision-mission-raison-detre-valeurs" element={<VisionMissionRaisonDetreValeurs />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
