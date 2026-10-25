import React, { useEffect } from 'react';
import { X, Calendar, User, Building, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onContactClick }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#2C2424]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#FDE2E4] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#FDE2E4]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F2] text-[#BE185D] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case Study Chi Tiết</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#786A68] hover:text-[#2C2424] hover:bg-[#FDE2E4]/60 transition-colors focus:outline-hidden"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header info */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#BE185D]">
              {project.categoryLabel}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2424]">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5C504E]">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Meta Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FFF9F6] border border-[#FDE2E4] text-xs">
            <div className="flex items-center gap-2 text-[#5C504E]">
              <Calendar className="w-4 h-4 text-[#F472B6]" />
              <span><strong>Thời gian:</strong> {project.period}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5C504E]">
              <User className="w-4 h-4 text-[#F472B6]" />
              <span><strong>Vai trò:</strong> {project.role}</span>
            </div>
            <div className="flex items-center gap-2 text-[#5C504E]">
              <Building className="w-4 h-4 text-[#F472B6]" />
              <span><strong>Đối tác:</strong> {project.clientOrOrg}</span>
            </div>
          </div>

          {/* Thumbnail */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#FDE2E4] shadow-xs">
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Metrics */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#2C2424] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#BE185D]" />
              <span>Kết Quả & Chỉ Số Nổi Bật</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#FFF5F6] border border-[#FAD2E1] text-center">
                  <div className="font-serif font-bold text-xl sm:text-2xl text-[#BE185D]">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-[#786A68] mt-0.5 font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#2C2424]">Tổng Quan Dự Án</h3>
            <p className="text-sm sm:text-base text-[#5C504E] leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Challenges vs Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#FDE2E4] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#991B1B]">
                <AlertCircle className="w-4 h-4" />
                <span>Thách Thức Đặt Ra</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5C504E]">
                {project.challenges.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F472B6] font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#FEF3C7] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#065F46]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Giải Pháp & Hành Động</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5C504E]">
                {project.solutions.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#059669] font-bold">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Tangible Results */}
          <div className="p-5 rounded-2xl bg-[#FFF0F2]/70 border border-[#FAD2E1] space-y-3">
            <h4 className="text-sm font-bold text-[#BE185D]">Tác Động Thực Tế</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A3E3D]">
              {project.results.map((r, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#BE185D] font-bold">★</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-[#F4ECE1] text-[#5C504E]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-[#FDE2E4] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-[#8C7A77]">
              Bạn quan tâm đến giải pháp tương tự cho thương hiệu của mình?
            </span>
            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#F472B6] to-[#BE185D] text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Thảo luận hợp tác dự án này
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
