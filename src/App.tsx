import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Editor from "./pages/Editor";
import ProposalEditor from "./pages/ProposalEditor";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import RateCalculator from "./pages/tools/RateCalculator";
import TimeTracker from "./pages/tools/TimeTracker";
import Timeline from "./pages/tools/Timeline";
import DeadlineCalculator from "./pages/tools/DeadlineCalculator";
import AgreementGenerator from "./pages/tools/AgreementGenerator";
import ScopeBuilder from "./pages/tools/ScopeBuilder";
import WordCounter from "./pages/tools/WordCounter";
import FileConverter from "./pages/tools/FileConverter";
import ImageEditor from "./pages/tools/ImageEditor";
import QRGenerator from "./pages/tools/QRGenerator";
import UnitConverter from "./pages/tools/UnitConverter";
import ColorPicker from "./pages/tools/ColorPicker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/editor/:templateId" element={<Editor />} />
          <Route path="/proposal/:templateId" element={<ProposalEditor />} />
          <Route path="/invoice" element={<InvoiceGenerator />} />
          <Route path="/portfolio" element={<PortfolioBuilder />} />
          <Route path="/tools/rate-calculator" element={<RateCalculator />} />
          <Route path="/tools/time-tracker" element={<TimeTracker />} />
          <Route path="/tools/timeline" element={<Timeline />} />
          <Route path="/tools/deadline-calculator" element={<DeadlineCalculator />} />
          <Route path="/tools/agreement-generator" element={<AgreementGenerator />} />
          <Route path="/tools/scope-builder" element={<ScopeBuilder />} />
          <Route path="/tools/word-counter" element={<WordCounter />} />
          <Route path="/tools/file-converter" element={<FileConverter />} />
          <Route path="/tools/image-editor" element={<ImageEditor />} />
          <Route path="/tools/qr-generator" element={<QRGenerator />} />
          <Route path="/tools/unit-converter" element={<UnitConverter />} />
          <Route path="/tools/color-picker" element={<ColorPicker />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;