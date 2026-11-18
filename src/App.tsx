import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AreasOfInterestSection } from './components/AreasOfInterestSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { useResumeAvailable } from './hooks/useResumeAvailable';

export default function App() {
  const resumeStatus = useResumeAvailable();

  return (
    <div className="relative min-h-screen bg-[#101110] text-[#F2F0E8]">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C6F36B] focus:text-[#101110] focus:text-sm focus:font-semibold focus:rounded-sm"
      >
        Skip to main content
      </a>

      {/* Subtle Obsidian Film Grain */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-obsidian-grain pointer-events-none z-40"
      />

      <CustomCursor />
      <Navbar />

      <main id="main-content">
        <HeroSection resumeStatus={resumeStatus} />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection />
        <AreasOfInterestSection />
        <AchievementsSection />
        <ContactSection resumeStatus={resumeStatus} />
      </main>

      <Footer />
    </div>
  );
}
