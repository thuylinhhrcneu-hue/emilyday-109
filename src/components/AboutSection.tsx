import React, { useState } from 'react';
import { Sparkles, Heart, Compass, Lightbulb, ShieldCheck, Feather, Target, Smile } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      icon: Feather,
      title: 'Lifestyle — Đẹp từ ngoài vào trong',
      badge: 'Aesthetic & Beauty',
      color: 'from-[#FDE2E4] to-[#FAD2E1]',
      textColor: 'text-[#BE185D]',
      borderColor: 'border-[#FAD2E1]',
      description: 'Tôi yêu thích skincare, trang điểm tôn vinh nét tự nhiên, thời trang tinh tế và những không gian thẩm mỹ mang lại cảm giác dễ chịu. Đối với tôi, làm đẹp không phải để làm hài lòng người khác, mà là cách phụ nữ thể hiện sự trân quý và chăm sóc cơ thể của chính mình.',
      bullets: [
        'Skincare & chăm sóc da khoa học, tự nhiên',
        'Gu thời trang thanh lịch, nữ tính pha chút Gen Z năng động',
        'Bộ môn thể thao yêu thích: Pickleball rèn luyện phản xạ và giao lưu',
        'Thói quen ăn uống lành mạnh, giữ vóc dáng và tinh thần thanh thoát'
      ]
    },
    {
      id: 1,
      icon: Target,
      title: 'Business & Career — Xây sự nghiệp không đánh đổi',
      badge: 'Marketing & Leadership',
      color: 'from-[#FEF3C7] to-[#FDE68A]',
      textColor: 'text-[#B45309]',
      borderColor: 'border-[#FDE68A]',
      description: 'Hơn 7 năm trải nghiệm từ Sales, HR đến Marketing và Co-Founder, tôi tin rằng một sự nghiệp bền vững không đến từ việc vắt kiệt sức mình, mà đến từ tư duy chiến lược sắc bén, khả năng xây dựng cộng đồng và nghệ thuật lãnh đạo thấu cảm (Win - Win).',
      bullets: [
        'Đồng sáng lập & Head of Marketing tại iConnex Agency',
        'Kiến tạo và phát triển cộng đồng 193.000+ thành viên "GenZ làm IT"',
        'Dẫn dắt các chiến dịch tuyển dụng quy mô 35.000+ ứng viên (Win U Game)',
        'Tư vấn chiến lược Employer Branding & Định vị thương hiệu cao cấp'
      ]
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: 'Self-Growth — Ranh giới & Nội lực',
      badge: 'Mindset & Boundaries',
      color: 'from-[#FDE2E4] to-[#FEF3C7]',
      textColor: 'text-[#BE185D]',
      borderColor: 'border-[#FAD2E1]',
      description: 'Tôi từng là một cô gái hay cả nể, sợ người khác buồn, luôn cố gắng gánh vác mọi kỳ vọng. Qua những va vấp, tôi học được rằng: Biết nói "Không" đúng lúc là một biểu hiện sâu sắc của lòng tự trọng. Bạn không cần làm hài lòng cả thế giới để cảm thấy mình xứng đáng.',
      bullets: [
        'Học cách thiết lập ranh giới lành mạnh (healthy boundaries)',
        'Vượt qua hội chứng cầu toàn (perfectionism) và overthinking',
        'Tập trung vào giải pháp (solution-oriented) thay vì đổ lỗi',
        'Liên tục nâng cấp bản thân qua ngoại ngữ, tư duy và kỹ năng mới'
      ]
    },
    {
      id: 3,
      icon: Smile,
      title: 'Inner Peace & Healing — An trú bên trong',
      badge: 'Wellness & Mindfulness',
      color: 'from-[#ECFDF5] to-[#D1FAE5]',
      textColor: 'text-[#047857]',
      borderColor: 'border-[#A7F3D0]',
      description: 'Sau giai đoạn từng rơi vào khủng hoảng tâm lý và kiệt sức vì công việc, tôi tìm về với thiền định và các khoá học thanh lọc thân tâm. Tôi hiểu rằng thành công bên ngoài sẽ trở nên vô nghĩa nếu bên trong là một khoảng trống rỗng cạn kiệt.',
      bullets: [
        'Thiền định buổi sáng và quan sát tâm trí trong chánh niệm',
        'Thấu cảm sâu sắc cảm xúc của người đối diện nhưng biết giữ năng lượng riêng',
        'Nuôi dưỡng tính nữ (Feminine energy): Mềm mại, an yên nhưng kiên định',
        'Chữa lành để trở thành phiên bản hạnh phúc và chân thật hơn'
      ]
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DNA Codex • Câu chuyện & Bản sắc</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight">
            Một người phụ nữ <span className="text-[#BE185D] italic">mềm nhưng không yếu</span>.
          </h2>

          <p className="text-base sm:text-lg text-[#5C504E] leading-relaxed">
            Tôi từng cố gắng trở thành một người "hoàn hảo" theo định nghĩa của người khác — học giỏi, thăng tiến nhanh, được công nhận. 
            Nhưng sau những bước ngoặt lớn về sức khỏe và sự nghiệp, tôi hiểu rằng điều đáng giá nhất là xây dựng một cuộc đời thực sự vừa vặn với chính mình.
          </p>
        </div>

        {/* 4 Pillars Tab / Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activePillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillar(pillar.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFDF9] border-[#BE185D] shadow-md -translate-y-1 ring-2 ring-[#BE185D]/20'
                    : 'bg-[#FFF9F6]/60 border-[#FDE2E4]/80 hover:bg-[#FFFDF9] hover:border-[#FAD2E1]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center ${pillar.textColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#FDE2E4] text-[#BE185D]' : 'bg-[#F4ECE1] text-[#786A68]'}`}>
                    0{pillar.id + 1}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#2C2424]' : 'text-[#5C504E]'}`}>
                  {pillar.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Content Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F6] to-[#FFF5F6] border border-[#FDE2E4] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold">
                <span>Trụ Cột 0{pillars[activePillar].id + 1}</span>
                <span>•</span>
                <span>{pillars[activePillar].badge}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2424]">
                {pillars[activePillar].title}
              </h3>

              <p className="text-sm sm:text-base text-[#5C504E] leading-relaxed">
                {pillars[activePillar].description}
              </p>

              <div className="space-y-2.5 pt-2">
                {pillars[activePillar].bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A3E3D]">
                    <div className="w-5 h-5 rounded-full bg-[#FDE2E4] flex items-center justify-center text-[#BE185D] shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Pull-Quote Box */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-xs rounded-2xl p-6 border border-[#FDE2E4] shadow-xs relative">
              <div className="text-3xl text-[#F472B6]/40 font-serif mb-2">“</div>
              <p className="font-serif italic text-base sm:text-lg text-[#2C2424] leading-relaxed">
                Tôi tin rằng cuộc sống bên ngoài chỉ thực sự thay đổi khi mình thay đổi từ bên trong. 
                Và bạn hoàn toàn không cần đánh đổi bản thân để có được thành công.
              </p>
              <div className="mt-4 pt-4 border-t border-[#FDE2E4] flex items-center justify-between text-xs text-[#8C7A77]">
                <span className="font-semibold text-[#BE185D]">Emilyday DNA Philosophy</span>
                <span>1% Better Everyday</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
