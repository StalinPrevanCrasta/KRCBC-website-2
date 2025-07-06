import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Commissions from "./pages/Commissions";
import CommissionDetail from "./pages/CommissionDetail";
import News from "./pages/News";
import NewsListing from "./pages/NewsListing";
import NewsArticle from "./pages/NewsArticle";
import Faith from "./pages/Faith";
import ResourcesPage from "./pages/ResourcesPage";
import YouthMinistry from "./pages/YouthMinistry";
import Media from "./pages/Media";
import SocialServices from "./pages/SocialServices";
import Support from "./pages/Support";
import PrayerRequests from "./pages/PrayerRequests";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import MediaCalendar from "./pages/MediaCalendar"; // Import MediaCalendar
import AllVideosPage from "./pages/AllVideosPage"; // Import AllVideosPage
import ProgramDetailPage from "./pages/ProgramDetailPage"; // Import ProgramDetailPage
import NotFound from "./pages/NotFound";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import PrivacyPolicyPage from './pages/PrivacyPolicy';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} /> {/* Main programs listing */}
          <Route path="/programs/:slug" element={<ProgramDetailPage />} /> {/* Individual program detail */}
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/commissions/:slug" element={<CommissionDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news-listing" element={<NewsListing />} />
          <Route path="/news/:id" element={<NewsArticle />} />
          <Route path="/faith" element={<Faith />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/youth-ministry" element={<YouthMinistry />} />
          <Route path="/media" element={<Media />} />
          <Route path="/social-services" element={<SocialServices />} />
          <Route path="/support" element={<Support />} />
          <Route path="/prayer-requests" element={<PrayerRequests />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/media-calendar" element={<MediaCalendar />} /> {/* Add MediaCalendar Route */}
          <Route path="/all-videos" element={<AllVideosPage />} /> {/* Add AllVideosPage Route */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
