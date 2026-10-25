import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Send, BookOpen, User, Star, ArrowRight } from 'lucide-react';
import { CuratedProduct } from '../types';
import { submitInquiry } from '../firebase';

interface CourseModalProps {
  course: CuratedProduct | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: name.trim(),
        email: email.trim(),
        organization: phone ? `Phone/Zalo: ${phone}` : 'Cá nhân',
        serviceType: course.id === 'mentorship-1on1' ? '1:1 Mentorship Consultation' : 'Course Waitlist (Community Blueprint)',
        message: `Đăng ký quan tâm đến: ${course.title}. Mục tiêu học tập / định hướng: ${goal || 'Chưa cung cấp'}`,
        budgetRange: course.price
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#2C2424]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FDE2E4] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="sticky top-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#FDE2E4]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{course.badge || 'Khoá học & Đào tạo'}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#786A68] hover:text-[#2C2424] hover:bg-[#FDE2E4]/60 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-left">
          
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#BE185D]">
              {course.brand}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2424]">
              {course.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-[#059669] font-bold">
              <span>Học phí dự kiến: {course.price}</span>
              {course.discountNote && (
                <span className="text-xs font-normal text-[#BE185D] bg-[#FFF0F2] px-2 py-0.5 rounded-full">
                  {course.discountNote}
                </span>
              )}
            </div>
          </div>

          {/* Description & Review */}
          <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#FDE2E4] space-y-2 text-xs sm:text-sm text-[#5C504E]">
            <p>{course.description}</p>
            <div className="pt-2 border-t border-[#FDE2E4] italic text-[#BE185D]">
              " {course.emilyReview} "
            </div>
          </div>

          {/* Registration / Waitlist Form */}
          {isSubmitted ? (
            <div className="p-8 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#059669] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#065F46]">
                Đăng ký thành công!
              </h3>
              <p className="text-xs sm:text-sm text-[#047857] max-w-md mx-auto">
                Cảm ơn bạn đã quan tâm. Emily đã nhận được thông tin và sẽ gửi tài liệu giới thiệu chi tiết hoặc liên hệ với bạn trong vòng 24 giờ.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2 rounded-full text-xs font-semibold bg-[#059669] text-white hover:bg-[#047857] transition-colors"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="text-sm font-bold text-[#2C2424]">
                Điền thông tin để nhận tư vấn & ưu đãi sớm:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#5C504E]">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[#5C504E]">Email nhận thông tin *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5C504E]">Số điện thoại / Zalo</label>
                <input
                  type="text"
                  placeholder="0987 654 321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#5C504E]">Bạn đang làm công việc gì hoặc mong muốn đạt được điều gì?</label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Sinh viên năm cuối muốn định hướng nghề Marketing, hoặc Marketer muốn học xây dựng cộng đồng..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#F472B6] text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Đăng Ký Nhận Thông Tin & Suất Ưu Đãi'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
