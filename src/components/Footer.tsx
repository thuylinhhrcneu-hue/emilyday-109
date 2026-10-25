import React from 'react';
import { Sparkles, ArrowUp, Heart, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF9] border-t border-[#FDE2E4] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FDE2E4]/80">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FAD2E1] via-[#FDE2E4] to-[#FEF3C7] flex items-center justify-center text-[#BE185D]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2C2424]">
                emilyday<span className="text-[#F472B6]">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5C504E] leading-relaxed max-w-sm">
              Không gian cá nhân của Trần Thị Thuỳ Linh (Emily Linh). Nơi chia sẻ về hành trình Marketing, Employer Branding, góc nhìn nội tâm, thói quen làm đẹp và phong cách sống thẩm mỹ.
            </p>

            <div className="text-xs text-[#BE185D] font-serif italic">
              "Soft yet Ambitious • 1% Better Everyday"
            </div>
          </div>

          {/* Quick Nav 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2424]">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs text-[#5C504E]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#BE185D] transition-colors">
                  Về Emily & DNA Codex
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-[#BE185D] transition-colors">
                  Dự án & Case Study
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-[#BE185D] transition-colors">
                  Blog & Góc Tâm Sự
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('curated-shop')} className="hover:text-[#BE185D] transition-colors">
                  Emily's Curated Picks & Shop
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Nav 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2424]">
              Kết Nối & Hợp Tác
            </h4>
            <p className="text-xs text-[#5C504E] leading-relaxed">
              Bạn có ý tưởng dự án hoặc muốn trò chuyện? Đừng ngần ngại gửi tin nhắn cho Emily.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="mailto:thuylinhhrcneu@gmail.com"
                className="w-8 h-8 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] flex items-center justify-center text-[#BE185D] hover:scale-110 transition-transform"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/smalling109"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] flex items-center justify-center text-[#1877F2] hover:scale-110 transition-transform"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] flex items-center justify-center text-[#E4405F] hover:scale-110 transition-transform"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] flex items-center justify-center text-[#0A66C2] hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A77]">
          <div>
            © 2026 <strong className="text-[#2C2424]">emilyday</strong> (Trần Thị Thuỳ Linh). All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#F472B6] fill-[#F472B6]" /> & mindful intention
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#FFF0F2] text-[#BE185D] hover:bg-[#FDE2E4] transition-colors focus:outline-hidden"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
