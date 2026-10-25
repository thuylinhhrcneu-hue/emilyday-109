import React, { useState, useEffect } from 'react';
import { curatedProducts } from '../data/curatedProducts';
import { CuratedProduct } from '../types';
import { Sparkles, ShoppingBag, ExternalLink, Copy, Check, Heart, Search, Filter, BookOpen } from 'lucide-react';

interface CuratedShopSectionProps {
  onSelectCourse: (course: CuratedProduct) => void;
}

export const CuratedShopSection: React.FC<CuratedShopSectionProps> = ({ onSelectCourse }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [savedWishlist, setSavedWishlist] = useState<string[]>([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState<boolean>(false);

  // Load wishlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('emily_wishlist');
      if (stored) {
        setSavedWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedWishlist.includes(productId)) {
      updated = savedWishlist.filter(id => id !== productId);
    } else {
      updated = [...savedWishlist, productId];
    }
    setSavedWishlist(updated);
    localStorage.setItem('emily_wishlist', JSON.stringify(updated));
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'course', label: 'Khoá Học & Mentorship' },
    { id: 'beauty', label: 'Làm Đẹp & Skincare' },
    { id: 'books', label: 'Sách & Nuôi Dưỡng Tâm Trí' },
    { id: 'fashion', label: 'Thời Trang & Pickleball' },
    { id: 'workspace', label: 'Góc Làm Việc & Tech' }
  ];

  const filteredProducts = curatedProducts.filter((product) => {
    const matchesCat = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWishlist = !showWishlistOnly || savedWishlist.includes(product.id);
    return matchesCat && matchesSearch && matchesWishlist;
  });

  return (
    <section id="curated-shop" className="py-20 md:py-28 bg-[#FFF9F6]/50 relative">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#FDE2E4]/30 via-[#FEF3C7]/30 to-[#FAD2E1]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Emily's Curated Picks & Shop</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2424] tracking-tight">
              Những món đồ & khoá học <span className="text-[#BE185D] italic">tôi thực sự yêu thích</span>.
            </h2>

            <p className="text-sm sm:text-base text-[#5C504E]">
              Góc tổng hợp những sản phẩm làm đẹp, đồ tập pickleball, sách hay, góc làm việc và các chương trình đào tạo tôi đang dùng hoặc trực tiếp phát triển.
            </p>
          </div>

          {/* Wishlist toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
                showWishlistOnly
                  ? 'bg-[#BE185D] text-white border-[#BE185D]'
                  : 'bg-white text-[#5C504E] border-[#FDE2E4] hover:bg-[#FDE2E4]/60'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : 'text-[#BE185D]'}`} />
              <span>Đã lưu ({savedWishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#FDE2E4]/60">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  setShowWishlistOnly(false);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === c.id && !showWishlistOnly
                    ? 'bg-[#BE185D] text-white shadow-2xs font-semibold'
                    : 'bg-white text-[#5C504E] border border-[#FDE2E4] hover:bg-[#FDE2E4]/60 hover:text-[#2C2424]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#8C7A77] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#FDE2E4] text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
            />
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#FDE2E4] p-8 space-y-3">
            <div className="text-3xl">🌸</div>
            <h3 className="font-serif text-lg font-bold text-[#2C2424]">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-xs text-[#786A68]">Thử đổi từ khoá tìm kiếm hoặc chọn danh mục khác nhé.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setShowWishlistOnly(false);
              }}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[#FDE2E4] text-[#BE185D]"
            >
              Xem lại tất cả
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = savedWishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`group bg-white rounded-3xl border overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left ${
                    product.isCourse 
                      ? 'border-[#FCD34D] ring-2 ring-[#FEF3C7]' 
                      : 'border-[#FDE2E4]'
                  }`}
                >
                  <div>
                    {/* Image with badges and wishlist button */}
                    <div className="relative aspect-square overflow-hidden bg-[#FBF7F2]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-2xs ${
                            product.isCourse
                              ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
                              : 'bg-white/95 backdrop-blur-md text-[#BE185D] border border-[#FAD2E1]'
                          }`}>
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Wishlist button */}
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-[#BE185D] shadow-xs hover:scale-110 active:scale-95 transition-all"
                        aria-label="Lưu sản phẩm"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#BE185D]' : ''}`} />
                      </button>

                      {/* Category tag bottom */}
                      <div className="absolute bottom-2 left-3 text-[10px] text-white bg-[#2C2424]/60 backdrop-blur-xs px-2 py-0.5 rounded-full font-medium">
                        {product.categoryLabel}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <div className="text-[11px] font-semibold text-[#8C7A77] uppercase tracking-wide">
                          {product.brand}
                        </div>
                        <h3 className="font-serif text-base font-bold text-[#2C2424] group-hover:text-[#BE185D] transition-colors line-clamp-2 mt-0.5">
                          {product.title}
                        </h3>
                      </div>

                      {/* Emily's Note */}
                      <div className="p-2.5 rounded-xl bg-[#FFF9F6] border border-[#FDE2E4]/80 text-[11px] text-[#5C504E] italic line-clamp-2">
                        "{product.emilyReview}"
                      </div>

                      {/* Price & Discount Code */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-sm font-bold text-[#2C2424]">
                          {product.price}
                        </div>

                        {product.discountCode && (
                          <div className="flex items-center justify-between p-1.5 px-2 rounded-lg bg-[#FFF0F2] border border-dashed border-[#FAD2E1] text-[11px]">
                            <span className="font-mono font-bold text-[#BE185D]">
                              {product.discountCode}
                            </span>
                            <button
                              onClick={(e) => handleCopyCode(product.discountCode!, e)}
                              className="text-[10px] font-semibold text-[#BE185D] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              {copiedCode === product.discountCode ? (
                                <span className="text-[#059669] flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Đã chép!
                                </span>
                              ) : (
                                <span className="flex items-center gap-0.5">
                                  <Copy className="w-3 h-3" /> Sao chép
                                </span>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="p-5 pt-0">
                    {product.isCourse ? (
                      <button
                        onClick={() => onSelectCourse(product)}
                        className="w-full py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Đăng ký nhận thông tin</span>
                      </button>
                    ) : (
                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-full text-xs font-semibold bg-[#FFF0F2] text-[#BE185D] border border-[#FAD2E1] hover:bg-[#BE185D] hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Xem chi tiết & Mua</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
};
