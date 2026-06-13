import { Navigate, Route, Routes } from "react-router-dom";
import { CommunityPage } from "./pages/CommunityPage";
import { AboutNexnsPage } from "./pages/company/AboutNexnsPage";
import { ContactPage } from "./pages/company/ContactPage";
import { LeadershipContributorsPage } from "./pages/company/LeadershipContributorsPage";
import { VisionPage } from "./pages/company/VisionPage";
import { CreatorPage } from "./pages/CreatorPage";
import { CreatorProfilePage } from "./pages/CreatorProfilePage";
import { CreatePage } from "./pages/CreatePage";
import { CompanionPage } from "./pages/CompanionPage";
import { GenesisAdminPage } from "./pages/genesis/GenesisAdminPage";
import { GenesisPage } from "./pages/genesis/GenesisPage";
import { HomePage } from "./pages/HomePage";
import { InvestorCenterPage } from "./pages/investor/InvestorCenterPage";
import { InvestorEcosystemPage } from "./pages/investor/InvestorEcosystemPage";
import { InvestorFlywheelPage } from "./pages/investor/InvestorFlywheelPage";
import { InvestorGrowthJourneyPage } from "./pages/investor/InvestorGrowthJourneyPage";
import { InvestorOnePagePage } from "./pages/investor/InvestorOnePagePage";
import { InvestorValueFlowPage } from "./pages/investor/InvestorValueFlowPage";
import { InvestorWhyNexnsPage } from "./pages/investor/InvestorWhyNexnsPage";
import { LandingPage } from "./pages/LandingPage";
import {
  CookiePolicyPage,
  DisclaimerPage,
  PrivacyPolicyPage,
  RiskDisclosurePage,
  TermsOfServicePage,
} from "./pages/legal/LegalPages";
import { MorePage } from "./pages/MorePage";
import { MyPage } from "./pages/MyPage";
import { NexValueLayerPage } from "./pages/resources/NexValueLayerPage";
import { NsCreditsPage } from "./pages/resources/NsCreditsPage";
import { PetPage } from "./pages/PetPage";
import { PetWorldPage } from "./pages/PetWorldPage";
import { PresentationPage } from "./pages/PresentationPage";
import { PredictionPage } from "./pages/PredictionPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectProfilePage } from "./pages/ProjectProfilePage";
import { SolanaWalletProvider } from "./lib/wallet/SolanaWalletProvider";

export default function App() {
  return (
    <SolanaWalletProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/app/genesis" element={<GenesisPage />} />
        <Route path="/app/genesis/admin" element={<GenesisAdminPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/creator" element={<CreatorPage />} />
        <Route path="/creator/:creatorId" element={<CreatorProfilePage />} />
        <Route path="/chat" element={<CompanionPage />} />
        <Route path="/app/chat" element={<Navigate to="/chat" replace />} />
        <Route path="/app/companion" element={<Navigate to="/chat" replace />} />
        <Route path="/companion" element={<Navigate to="/chat" replace />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectProfilePage />} />
        <Route path="/more" element={<MorePage />} />
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
        <Route path="/company/about" element={<AboutNexnsPage />} />
        <Route path="/company/contact" element={<ContactPage />} />
        <Route path="/company/leadership" element={<LeadershipContributorsPage />} />
        <Route path="/company/vision" element={<VisionPage />} />
        <Route path="/resources/nex" element={<NexValueLayerPage />} />
        <Route path="/resources/ns" element={<NsCreditsPage />} />
        <Route path="/legal/terms" element={<TermsOfServicePage />} />
        <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/legal/risk" element={<RiskDisclosurePage />} />
        <Route path="/legal/cookies" element={<CookiePolicyPage />} />
        <Route path="/legal/disclaimer" element={<DisclaimerPage />} />
      </Routes>
    </SolanaWalletProvider>
  );
}
