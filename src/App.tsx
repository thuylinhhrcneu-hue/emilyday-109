import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { CuratedShopSection } from './components/CuratedShopSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ArticleModal } from './components/ArticleModal';
import { CourseModal } from './components/CourseModal';
import { ProjectItem, ArticleItem, CuratedProduct } from './types';
import { MessageCircleHeart, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CuratedProduct | null>(null);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scrollspy to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'blog', 'curated-shop', 'newsletter', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#2C2424] flex flex-col font-sans selection:bg-[#FDE2E4] selection:text-[#BE185D]">
      
      {/* Sticky Aesthetic Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* 2. DNA Codex / About Emily */}
        <AboutSection />

        {/* 3. Portfolio & Case Studies */}
        <PortfolioSection 
          onSelectProject={(project) => setSelectedProject(project)}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 4. Blog & Thoughts System */}
        <BlogSection 
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* 5. Emily's Curated Picks & Shop (Affiliate & Courses) */}
        <CuratedShopSection 
          onSelectCourse={(course) => setSelectedCourse(course)}
        />

        {/* 6. Sunday Love Letter / Newsletter */}
        <NewsletterSection />

        {/* 7. Collaboration & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Quick Action CTA for easy mobile connection */}
      <button
        onClick={() => handleNavigate('contact')}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#F472B6] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Nhắn tin cho Emily"
      >
        <MessageCircleHeart className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline">Nhắn tin cho Emily</span>
      </button>

      {/* Modals */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onContactClick={() => handleNavigate('contact')}
      />

      <ArticleModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />

      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />

    </div>
  );
}
