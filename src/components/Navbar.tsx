import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart, ArrowUpRight, Mail } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'Về Emily' },
    { id: 'portfolio', label: 'Dự án & Case Study' },
    { id: 'blog', label: 'Blog & Tâm sự' },
    { id: 'curated-shop', label: 'Emily\'s Picks & Shop' },
    { id: 'newsletter', label: 'Newsletter' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FFFDF9]/90 backdrop-blur-md shadow-xs border-b border-[#FDE2E4]/80 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleLinkClick('hero')} 
            className="group flex items-center gap-2.5 text-left focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FAD2E1] via-[#FDE2E4] to-[#FEF3C7] flex items-center justify-center text-[#BE185D] shadow-xs group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C2424] group-hover:text-[#BE185D] transition-colors">
                emilyday<span className="text-[#F472B6]">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8C7A77] font-medium -mt-1">
                soft yet ambitious
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#FFF9F6]/80 px-4 py-1.5 rounded-full border border-[#FDE2E4]/70 shadow-2xs">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-[#FDE2E4] text-[#BE185D] shadow-2xs font-semibold'
                    : 'text-[#5C504E] hover:text-[#2C2424] hover:bg-[#FDF2F4]/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-white shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Hợp tác cùng Emily</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="p-2 rounded-full bg-[#FDE2E4] text-[#BE185D] text-xs font-medium"
              title="Liên hệ"
            >
              <Mail className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#2C2424] hover:bg-[#FDE2E4]/60 transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#FDE2E4] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-[#FDE2E4] text-[#BE185D] font-semibold'
                    : 'text-[#5C504E] hover:bg-[#FBF7F2]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#FDE2E4]/60 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-white shadow-xs"
            >
              <span>Liên hệ & Hợp tác</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
