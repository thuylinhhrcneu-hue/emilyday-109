import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Briefcase, Award, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      {/* Aesthetic glowing background orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#FDE2E4]/60 via-[#FEF3C7]/40 to-[#FAD2E1]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-48 -right-20 w-80 h-80 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-[#FDE2E4]/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-[#F472B6] animate-ping" />
              <span>Personal Brand • emilyday</span>
              <span className="text-[#8C7A77]">|</span>
              <span className="text-[#4A3E3D] font-normal">Emily Linh (Trần Thị Thuỳ Linh)</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C2424] tracking-tight leading-[1.15]">
              Soft yet <span className="italic font-normal text-[#BE185D] underline decoration-[#FDE2E4] decoration-wavy decoration-2">Ambitious</span>.
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#4A3E3D]">
                Đẹp từ bên trong ra bên ngoài.
              </span>
            </h1>

            {/* Subtitle / Philosophy */}
            <p className="text-base sm:text-lg text-[#5C504E] max-w-2xl leading-relaxed">
              Tôi là <strong className="text-[#2C2424] font-semibold">Emily Linh</strong> — Marketer, Co-Founder iConnex Agency và người bạn đồng hành cùng những người trẻ nhạy cảm nhưng đầy khát vọng. 
              Tôi tin rằng phụ nữ hiện đại hoàn toàn có thể sở hữu sự nghiệp tự hào, nội tâm vững vàng và phong cách sống thẩm mỹ <span className="font-semibold text-[#BE185D]">mà không phải đánh đổi bản thân</span>.
            </p>

            {/* Credibility Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 border border-[#FDE2E4] shadow-2xs hover:border-[#F472B6]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#BE185D] font-serif font-bold text-lg sm:text-xl">
                  <span>7+</span>
                  <span className="text-xs font-sans font-normal text-[#8C7A77]">Năm</span>
                </div>
                <div className="text-[11px] text-[#5C504E] font-medium leading-tight mt-0.5">Marketing & Employer Branding</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 border border-[#FEF3C7] shadow-2xs hover:border-[#F59E0B]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#D97706] font-serif font-bold text-lg sm:text-xl">
                  <span>193k+</span>
                </div>
                <div className="text-[11px] text-[#5C504E] font-medium leading-tight mt-0.5">Cộng đồng "GenZ làm IT"</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 border border-[#FDE2E4] shadow-2xs hover:border-[#F472B6]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#BE185D] font-serif font-bold text-lg sm:text-xl">
                  <span>Top 13</span>
                </div>
                <div className="text-[11px] text-[#5C504E] font-medium leading-tight mt-0.5">Cá nhân OKR xuất sắc FPT</div>
              </div>

              <div className="p-3 rounded-2xl bg-[#FFFDF9]/90 border border-[#FEF3C7] shadow-2xs hover:border-[#F59E0B]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#059669] font-serif font-bold text-lg sm:text-xl">
                  <span>Co-Founder</span>
                </div>
                <div className="text-[11px] text-[#5C504E] font-medium leading-tight mt-0.5">iConnex Agency (EB & MKT)</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#F472B6] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Khám phá Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('blog')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#FFF9F6] border border-[#FDE2E4] text-[#2C2424] hover:bg-[#FDE2E4]/60 hover:text-[#BE185D] transition-all duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#F472B6]" />
                <span>Đọc Blog & Góc Tâm Sự</span>
              </button>

              <button
                onClick={() => onNavigate('curated-shop')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[#FEF9C3]/70 border border-[#FDE68A] text-[#92400E] hover:bg-[#FEF3C7] transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Ghé Emily's Shop</span>
              </button>
            </div>

            {/* Micro Quote */}
            <div className="flex items-center gap-2 pt-2 text-xs text-[#8C7A77] italic">
              <span>🌸</span>
              <span>"Cùng nhau tốt hơn, hạnh phúc hơn 1% mỗi ngày."</span>
            </div>

          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Visual background card decorations */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#FAD2E1] via-[#FDE2E4] to-[#FEF3C7] rounded-[2.5rem] rotate-2 opacity-70 blur-xs" />
              
              {/* Main Card Container */}
              <div className="relative rounded-[2.2rem] overflow-hidden bg-white border border-[#FDE2E4] shadow-xl p-3 sm:p-4">
                
                {/* Hero Photo with aesthetic look */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-b from-[#FFF5F6] via-[#FDE2E4] to-[#FEF3C7]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop"
                    alt="Emily Linh - emilyday"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlay for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2424]/80 via-transparent to-transparent opacity-80" />

                  {/* On-image caption badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-medium tracking-wide mb-1.5 border border-white/30">
                      Founder & Lifestyle Creator
                    </div>
                    <div className="font-serif text-xl sm:text-2xl font-bold">
                      Trần Thị Thuỳ Linh
                    </div>
                    <div className="text-xs text-white/90 font-light flex items-center gap-1.5 mt-0.5">
                      <span>Emily Linh • Yên Bái / Hà Nội</span>
                      <span>•</span>
                      <span>NEU Alumna</span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Tag 1: Mindset */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-[#FFFDF9] border border-[#FDE2E4] px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2 animate-bounce duration-1000">
                  <div className="w-7 h-7 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                    ✨
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-[#8C7A77]">Tư duy dẫn dắt</div>
                    <div className="text-xs font-bold text-[#2C2424]">Win - Win & Thấu cảm</div>
                  </div>
                </div>

                {/* Floating Micro Tag 2: Lifestyle */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 bg-[#FFFDF9] border border-[#FDE2E4] px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FDE2E4] flex items-center justify-center text-[#BE185D]">
                    🎾
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-[#8C7A77]">Phong cách sống</div>
                    <div className="text-xs font-bold text-[#2C2424]">Aesthetic & Healthy</div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
