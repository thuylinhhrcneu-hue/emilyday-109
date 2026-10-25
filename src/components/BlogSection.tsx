import React, { useState } from 'react';
import { blogArticles } from '../data/articlesData';
import { ArticleItem } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, Heart, Sparkles, Filter } from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle: (article: ArticleItem) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả Bài Viết' },
    { id: 'career', label: 'Career & Business' },
    { id: 'inner_work', label: 'Nội Tâm & Tình Cảm' },
    { id: 'growth', label: 'Phát Triển Bản Thân' },
    { id: 'lifestyle', label: 'Lifestyle & Wellness' }
  ];

  const filteredArticles = filter === 'all'
    ? blogArticles
    : blogArticles.filter(a => a.category === filter);

  const featuredArticle = blogArticles.find(a => a.featured) || blogArticles[0];

  return (
    <section id="blog" className="py-20 md:py-28 bg-[#FFFDF9] relative">
      
      {/* Decorative background subtle glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#FDE2E4]/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F2] border border-[#FAD2E1] text-[#BE185D] text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog & Góc Tâm Sự • emilyday</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight">
            Nơi tôi viết về <span className="text-[#BE185D] italic">sự nghiệp, nội tâm & làm đẹp</span>.
          </h2>

          <p className="text-sm sm:text-base text-[#5C504E]">
            Không giáo điều, không đao to búa lớn. Đây là những trải nghiệm, bài học và góc nhìn chân thật nhất của tôi qua từng chặng đường trưởng thành.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#FDE2E4]/60">
          <div className="flex items-center gap-1.5 text-xs text-[#8C7A77] mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Chủ đề:</span>
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

        {/* Featured Article Highlight (Only shown when filter is 'all') */}
        {filter === 'all' && (
          <div 
            onClick={() => onSelectArticle(featuredArticle)}
            className="mb-12 group rounded-3xl bg-gradient-to-br from-[#FFF9F6] via-[#FFF5F6] to-[#FFFDF9] border border-[#FAD2E1] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-6 aspect-[16/10] overflow-hidden">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#BE185D] text-white shadow-2xs">
                    Bài viết nổi bật
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDE2E4] text-[#BE185D]">
                    {featuredArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-[#8C7A77] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2424] group-hover:text-[#BE185D] transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5C504E] line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-[#BE185D]">
                  <span>Đọc trọn vẹn bài viết này</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group bg-white rounded-3xl border border-[#FDE2E4] overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer text-left"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FBF7F2]">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FFFDF9]/95 backdrop-blur-md text-[#BE185D] border border-[#FAD2E1]">
                    {article.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 text-[11px] text-white font-medium bg-[#2C2424]/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  <div className="text-[11px] text-[#8C7A77] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F472B6]" />
                    <span>{article.publishDate}</span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2424] group-hover:text-[#BE185D] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C504E] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-3 border-t border-[#FDE2E4]/80 flex items-center justify-between text-xs">
                  <span className="text-[#8C7A77] truncate max-w-[150px]">
                    #{article.tags[0]}
                  </span>
                  <span className="text-[#BE185D] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Đọc tiếp</span>
                    <span>→</span>
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

    </section>
  );
};
