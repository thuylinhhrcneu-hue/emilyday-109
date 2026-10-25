import React, { useState } from 'react';
import { Mail, Sparkles, Check, Send, Heart, ArrowRight } from 'lucide-react';
import { subscribeNewsletter } from '../firebase';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Career & Inner Balance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const interestsList = [
    'Career & Marketing',
    'Nội tâm & Chữa lành',
    'Làm đẹp & Lifestyle'
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await subscribeNewsletter(email, name, interest);
      if (res.success) {
        setIsSuccess(true);
        setEmail('');
        setName('');
      } else {
        setErrorMsg('Có lỗi xảy ra, vui lòng thử lại sau giây lát.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Không thể đăng ký lúc này. Vui lòng kiểm tra lại email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-[#FFFDF9] relative overflow-hidden">
      
      {/* Background aesthetic blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FDE2E4]/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FFF5F6] via-[#FFFDF9] to-[#FEF9C3]/40 border border-[#FAD2E1] p-8 sm:p-14 shadow-lg text-center overflow-hidden">
          
          {/* Subtle top badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold shadow-2xs mb-5">
            <Mail className="w-3.5 h-3.5" />
            <span>Thư Chủ Nhật Cùng Emily • Sunday Letter</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight mb-4">
            Một bức thư nhỏ vào mỗi sáng <span className="text-[#BE185D] italic">Chủ Nhật</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#5C504E] max-w-xl mx-auto leading-relaxed mb-8">
            Không spam, không bán khoá học dồn dập. Chỉ là những suy ngẫm chân thật về công việc, những bài học tháo gỡ overthinking và các bí quyết sống đẹp giúp bạn nạp đầy năng lượng cho tuần mới.
          </p>

          {isSuccess ? (
            <div className="p-8 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] max-w-md mx-auto space-y-3 animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#065F46]">
                Chào mừng bạn đến với Góc của Emily! 🌸
              </h3>
              <p className="text-xs text-[#047857] leading-relaxed">
                Email của bạn đã được lưu an toàn. Hẹn gặp bạn trong lá thư Chủ Nhật tuần này nhé!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-2 text-xs font-semibold text-[#059669] underline hover:text-[#047857]"
              >
                Đăng ký thêm email khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto space-y-4">
              
              {/* Interest Selector Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                <span className="text-xs text-[#8C7A77]">Chủ đề bạn quan tâm nhất:</span>
                {interestsList.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setInterest(item)}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      interest === item
                        ? 'bg-[#BE185D] text-white font-medium shadow-2xs'
                        : 'bg-white border border-[#FDE2E4] text-[#5C504E] hover:bg-[#FDE2E4]/60'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Form Inputs */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="Tên của bạn (tuỳ chọn)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 rounded-full border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30 sm:w-1/3"
                />

                <input
                  type="email"
                  required
                  placeholder="Địa chỉ email của bạn *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-full border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30 flex-1"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#F472B6] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Đang gửi...' : 'Đăng Ký Nhận Thư'}</span>
                </button>
              </div>

              {errorMsg && (
                <div className="text-xs text-[#DC2626] font-medium pt-1">
                  {errorMsg}
                </div>
              )}

              <div className="text-[11px] text-[#8C7A77] flex items-center justify-center gap-1.5 pt-1">
                <span>🔒 Bảo mật 100% • Bạn có thể huỷ đăng ký bất cứ lúc nào</span>
              </div>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};
