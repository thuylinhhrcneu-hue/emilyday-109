import React, { useState } from 'react';
import { portfolioProjects } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { Briefcase, ArrowUpRight, TrendingUp, Sparkles, Filter } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onContactClick: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject, onContactClick }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả Dự Án' },
    { id: 'employer_branding', label: 'Employer Branding' },
    { id: 'community', label: 'Xây Dựng Cộng Đồng' },
    { id: 'campaign', label: 'Chiến Dịch Viral' },
    { id: 'strategy', label: 'Chiến Lược Thương Hiệu' }
  ];

  const filteredProjects = filter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#FFFDF9]/60 relative">
      
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#FEF3C7]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Portfolio & Kinh Nghiệm Thực Chiến</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight">
              Những dự án đã <span className="text-[#BE185D] italic">chạm đến hàng vạn người</span>.
            </h2>
            
            <p className="text-sm sm:text-base text-[#5C504E]">
              Tổng hợp các chiến dịch Employer Branding, tăng trưởng cộng đồng sinh viên và xây dựng thương hiệu tôi đã đồng hành từ con số 0.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#FFF9F6] border border-[#FDE2E4] text-[#BE185D] hover:bg-[#FDE2E4] transition-all cursor-pointer shadow-2xs"
            >
              <span>Đề xuất dự án hợp tác</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#FDE2E4]/60">
          <div className="flex items-center gap-1.5 text-xs text-[#8C7A77] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Phân loại:</span>
          </div>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                filter === c.id
                  ? 'bg-[#BE185D] text-white shadow-2xs font-semibold'
                  : 'bg-[#FFF9F6] text-[#5C504E] border border-[#FDE2E4] hover:bg-[#FDE2E4]/60 hover:text-[#2C2424]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl border border-[#FDE2E4] overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              {/* Thumbnail with overlay & badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FBF7F2]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FFFDF9]/95 backdrop-blur-md text-[#BE185D] border border-[#FAD2E1] shadow-2xs">
                    {project.categoryLabel}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#BE185D] shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium drop-shadow-md">
                  <span className="bg-[#2C2424]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                    {project.period}
                  </span>
                  <span className="bg-[#2C2424]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2424] group-hover:text-[#BE185D] transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C504E] line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Metrics Highlight */}
                <div className="pt-3 border-t border-[#FDE2E4]/80 grid grid-cols-2 gap-2">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="bg-[#FFF5F6] rounded-xl p-2 text-center border border-[#FAD2E1]/60">
                      <div className="font-serif font-bold text-base text-[#BE185D]">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-[#786A68] truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer action button */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#BE185D] font-semibold">
                  <span>Khám phá case study</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
