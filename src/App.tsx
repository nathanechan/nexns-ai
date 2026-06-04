import { Route, Routes } from "react-router-dom";
import { CreatorPage } from "./pages/CreatorPage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";
import { CompanionPage } from "./pages/CompanionPage";
import { HomePage } from "./pages/HomePage";
import { InvestorCenterPage } from "./pages/investor/InvestorCenterPage";
import { InvestorEcosystemPage } from "./pages/investor/InvestorEcosystemPage";
import { InvestorFlywheelPage } from "./pages/investor/InvestorFlywheelPage";
import { InvestorGrowthJourneyPage } from "./pages/investor/InvestorGrowthJourneyPage";
import { InvestorOnePagePage } from "./pages/investor/InvestorOnePagePage";
import { InvestorValueFlowPage } from "./pages/investor/InvestorValueFlowPage";
import { InvestorWhyNexnsPage } from "./pages/investor/InvestorWhyNexnsPage";
import { LandingPage } from "./pages/LandingPage";
import { MyPage } from "./pages/MyPage";
import { PetPage } from "./pages/PetPage";
import { PetWorldPage } from "./pages/PetWorldPage";
import { PresentationPage } from "./pages/PresentationPage";
import { PredictionPage } from "./pages/PredictionPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectProfilePage } from "./pages/ProjectProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<HomePage />} />
      <Route path="/prediction" element={<PredictionPage />} />
      <Route path="/creator" element={<CreatorPage />} />
      <Route path="/creator/:creatorId" element={<CreatorProfilePage />} />
      <Route path="/companion" element={<CompanionPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:projectId" element={<ProjectProfilePage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/pet" element={<PetPage />} />
      <Route path="/pet/world" element={<PetWorldPage />} />
      <Route path="/presentation" element={<PresentationPage />} />
      <Route path="/investor" element={<InvestorCenterPage />} />
      <Route path="/investor/why-nexns" element={<InvestorWhyNexnsPage />} />
      <Route path="/investor/growth-journey" element={<InvestorGrowthJourneyPage />} />
      <Route path="/investor/flywheel" element={<InvestorFlywheelPage />} />
      <Route path="/investor/value-flow" element={<InvestorValueFlowPage />} />
      <Route path="/investor/ecosystem" element={<InvestorEcosystemPage />} />
      <Route path="/investor/one-page" element={<InvestorOnePagePage />} />
    </Routes>
  );
}
