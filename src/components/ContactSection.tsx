import React, { useState } from 'react';
import { Mail, Send, Check, Sparkles, MessageSquare, Phone, MapPin, Globe, ArrowUpRight, Facebook, Instagram, Linkedin } from 'lucide-react';
import { submitInquiry } from '../firebase';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [serviceType, setServiceType] = useState('Employer Branding / Chiến dịch Tuyển dụng');
  const [budgetRange, setBudgetRange] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const serviceOptions = [
    'Employer Branding / Chiến dịch Tuyển dụng',
    'Tư vấn Xây dựng Cộng đồng Gen Z',
    'Hợp tác Quảng bá Nội dung & KOL / Creator',
    '1:1 Career & Personal Brand Mentorship',
    'Diễn giả Workshop / Khách mời Tọa đàm',
    'Cơ hội hợp tác khác'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitInquiry({
        name,
        email,
        organization,
        serviceType,
        message,
        budgetRange
      });

      if (res.success) {
        setIsSuccess(true);
        setName('');
        setEmail('');
        setOrganization('');
        setMessage('');
        setBudgetRange('');
      } else {
        setErrorMsg('Có lỗi xảy ra trong quá trình gửi. Vui lòng thử lại sau.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Không thể gửi thông tin lúc này. Vui lòng liên hệ trực tiếp qua email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Liên Hệ & Hợp Tác Nghề Nghiệp</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight">
            Hãy cùng nhau tạo nên <span className="text-[#BE185D] italic">những điều tuyệt vời</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#5C504E]">
            Dù bạn là doanh nghiệp đang tìm kiếm giải pháp Employer Branding đột phá, nhãn hàng muốn hợp tác nội dung hay bạn trẻ muốn tìm kiếm người đồng hành sự nghiệp — tôi luôn sẵn sàng lắng nghe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info & Channels */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF9F6] to-[#FFF5F6] border border-[#FDE2E4] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#2C2424]">
                Thông Tin Kết Nối
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#5C504E]">
                
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FFFDF9] border border-[#FDE2E4] flex items-center justify-center text-[#BE185D] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8C7A77] font-medium">Email chính thức</div>
                    <a href="mailto:thuylinhhrcneu@gmail.com" className="font-semibold text-[#2C2424] hover:text-[#BE185D] transition-colors break-all">
                      thuylinhhrcneu@gmail.com
                    </a>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FFFDF9] border border-[#FDE2E4] flex items-center justify-center text-[#1877F2] shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8C7A77] font-medium">Facebook Cá Nhân</div>
                    <a 
                      href="https://www.facebook.com/smalling109" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-semibold text-[#2C2424] hover:text-[#BE185D] transition-colors flex items-center gap-1"
                    >
                      <span>Trần Thị Thuỳ Linh (smalling109)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FFFDF9] border border-[#FDE2E4] flex items-center justify-center text-[#059669] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8C7A77] font-medium">Địa điểm</div>
                    <div className="font-semibold text-[#2C2424]">
                      Hà Nội & TP. Yên Bái, Việt Nam
                    </div>
                  </div>
                </div>

                {/* Agency */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#FFFDF9] border border-[#FEF3C7] flex items-center justify-center text-[#D97706] shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8C7A77] font-medium">Agency Đang Vận Hành</div>
                    <div className="font-semibold text-[#2C2424]">
                      iConnex Agency • Employer Branding & Marketing
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Channels row */}
              <div className="pt-4 border-t border-[#FDE2E4] flex items-center gap-3">
                <a
                  href="https://www.facebook.com/smalling109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white border border-[#FDE2E4] text-xs font-semibold text-[#5C504E] hover:text-[#BE185D] hover:bg-[#FDE2E4]/60 transition-all flex items-center gap-1.5"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white border border-[#FDE2E4] text-xs font-semibold text-[#5C504E] hover:text-[#BE185D] hover:bg-[#FDE2E4]/60 transition-all flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-white border border-[#FDE2E4] text-xs font-semibold text-[#5C504E] hover:text-[#BE185D] hover:bg-[#FDE2E4]/60 transition-all flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>

            {/* Quick response note */}
            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-dashed border-[#FAD2E1] text-xs text-[#8C7A77] flex items-center gap-2.5">
              <span className="text-lg">⚡</span>
              <span>Emily thường phản hồi email và tin nhắn đề xuất hợp tác trong vòng 12 - 24 giờ làm việc.</span>
            </div>

          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#FDE2E4] p-6 sm:p-10 shadow-sm text-left">
            
            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#065F46]">
                  Gửi Thông Tin Thành Công!
                </h3>
                <p className="text-sm text-[#047857] max-w-md mx-auto leading-relaxed">
                  Cảm ơn bạn đã gửi lời nhắn tới Emily Linh. Thông tin của bạn đã được ghi nhận vào hệ thống. Emily sẽ phản hồi sớm nhất nhé! 🌸
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#059669] text-white hover:bg-[#047857] transition-all"
                >
                  Gửi thêm nội dung khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2424]">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Trần Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2424]">
                      Email liên hệ *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2424]">
                      Đơn vị / Doanh nghiệp / Tổ chức
                    </label>
                    <input
                      type="text"
                      placeholder="Công ty XYZ / CLB sinh viên..."
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#2C2424]">
                      Ngân sách dự kiến (tuỳ chọn)
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                    >
                      <option value="">Chọn khoảng ngân sách...</option>
                      <option value="Dưới 10 triệu">Dưới 10 triệu VNĐ</option>
                      <option value="10 - 30 triệu">10 - 30 triệu VNĐ</option>
                      <option value="30 - 70 triệu">30 - 70 triệu VNĐ</option>
                      <option value="Trên 70 triệu">Trên 70 triệu VNĐ</option>
                      <option value="Thảo luận sau">Thảo luận cụ thể sau</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2424]">
                    Hình thức hợp tác quan tâm *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                  >
                    {serviceOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#2C2424]">
                    Nội dung chi tiết & mục tiêu hợp tác *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Mô tả ngắn gọn về nhu cầu, bối cảnh và mong muốn của bạn để Emily chuẩn bị tốt nhất..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs sm:text-sm text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30 resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs text-[#DC2626] font-medium">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#F472B6] text-white shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Đề Xuất Hợp Tác Ngay'}</span>
                </button>

                <div className="text-center text-[11px] text-[#8C7A77]">
                  Cam kết bảo mật thông tin liên lạc và trao đổi riêng tư.
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
