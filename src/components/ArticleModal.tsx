import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, Heart, Share2, MessageCircle, Send, Check, Sparkles } from 'lucide-react';
import { ArticleItem } from '../types';
import { 
  getArticleLikes, 
  incrementArticleLike, 
  addArticleComment, 
  subscribeComments, 
  ArticleCommentItem 
} from '../firebase';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [likesCount, setLikesCount] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  // Comments state
  const [comments, setComments] = useState<ArticleCommentItem[]>([]);
  const [authorName, setAuthorName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Load likes and subscribe to comments
  useEffect(() => {
    if (!article) return;

    // Check if user has liked in this session
    const likedArticles = JSON.parse(sessionStorage.getItem('emily_liked_articles') || '[]');
    if (likedArticles.includes(article.id)) {
      setHasLiked(true);
    }

    // Fetch likes
    getArticleLikes(article.id).then((count) => {
      setLikesCount(count);
    });

    // Subscribe to comments
    const unsubscribe = subscribeComments(article.id, (list) => {
      setComments(list);
    });

    return () => {
      unsubscribe();
    };
  }, [article]);

  if (!article) return null;

  const handleLikeClick = async () => {
    if (isLiking || hasLiked) return;
    setIsLiking(true);
    try {
      const newCount = await incrementArticleLike(article.id);
      setLikesCount(newCount);
      setHasLiked(true);
      const liked = JSON.parse(sessionStorage.getItem('emily_liked_articles') || '[]');
      sessionStorage.setItem('emily_liked_articles', JSON.stringify([...liked, article.id]));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      await addArticleComment(article.id, authorName, commentText);
      setCommentText('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#2C2424]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FDE2E4] z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky top action bar */}
        <div className="sticky top-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#FDE2E4]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF0F2] text-[#BE185D] border border-[#FAD2E1]">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-[#8C7A77] hidden sm:inline flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full text-[#786A68] hover:text-[#BE185D] hover:bg-[#FDE2E4]/60 transition-colors"
              title="Sao chép liên kết"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#059669]" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#786A68] hover:text-[#2C2424] hover:bg-[#FDE2E4]/60 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 text-xs text-[#8C7A77]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#F472B6]" />
                {article.publishDate}
              </span>
              <span>•</span>
              <span>Tác giả: <strong>Emily Linh</strong></span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C2424] leading-snug">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-[#5C504E] font-medium leading-relaxed italic border-l-2 border-[#BE185D] pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#FDE2E4] shadow-xs">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main Article Body Text */}
          <div className="prose prose-neutral max-w-none text-left space-y-5 text-sm sm:text-base text-[#4A3E3D] leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull Quote Box */}
          {article.quote && (
            <div className="my-6 p-6 rounded-2xl bg-gradient-to-r from-[#FFF0F2] via-[#FFF9F6] to-[#FEF9C3]/50 border border-[#FAD2E1] relative">
              <div className="text-3xl text-[#F472B6]/40 font-serif leading-none mb-1">“</div>
              <p className="font-serif italic text-base sm:text-lg text-[#BE185D] font-semibold leading-relaxed">
                {article.quote}
              </p>
              <div className="text-right text-xs text-[#8C7A77] mt-2">
                — emilyday thoughts
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#FDE2E4]">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFF5F6] text-[#BE185D] border border-[#FAD2E1]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Like Interaction Bar */}
          <div className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#FDE2E4] flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-[#2C2424]">Bạn thấy bài viết này hữu ích?</div>
              <div className="text-xs text-[#786A68]">Thả tim để ủng hộ Emily viết thêm nhé!</div>
            </div>

            <button
              onClick={handleLikeClick}
              disabled={hasLiked || isLiking}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                hasLiked
                  ? 'bg-[#BE185D] text-white shadow-sm'
                  : 'bg-white border border-[#FAD2E1] text-[#BE185D] hover:bg-[#FDE2E4]/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white text-white' : 'text-[#BE185D]'}`} />
              <span>{hasLiked ? 'Đã yêu thích' : 'Yêu thích bài viết'}</span>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                {likesCount}
              </span>
            </button>
          </div>

          {/* Live Visitor Comments Section */}
          <div className="pt-6 border-t border-[#FDE2E4] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2C2424] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#F472B6]" />
                <span>Góc Bình Luận & Chia Sẻ ({comments.length})</span>
              </h3>
              <span className="text-xs text-[#8C7A77]">Cùng thảo luận văn minh</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#FDE2E4] space-y-3">
              <div className="text-xs font-semibold text-[#5C504E]">Để lại suy nghĩ của bạn:</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Tên hoặc biệt danh của bạn *"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  maxLength={100}
                  required
                  className="px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30"
                />
              </div>

              <textarea
                placeholder="Chia sẻ cảm nhận, câu chuyện hoặc câu hỏi của bạn..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                maxLength={1000}
                required
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-[#FDE2E4] bg-white text-xs text-[#2C2424] focus:outline-hidden focus:ring-2 focus:ring-[#BE185D]/30 resize-none"
              />

              <div className="flex items-center justify-between">
                <div className="text-[11px] text-[#8C7A77]">
                  {commentSuccess && (
                    <span className="text-[#059669] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Bình luận của bạn đã được gửi thành công!
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingComment}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-[#BE185D] text-white hover:bg-[#9D174D] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingComment ? 'Đang gửi...' : 'Gửi phản hồi'}</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {comments.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#8C7A77] bg-[#FFF9F6] rounded-2xl border border-dashed border-[#FDE2E4]">
                  Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ của bạn cùng Emily nhé! 🌸
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white border border-[#FDE2E4] text-xs space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#BE185D] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#FFF0F2] flex items-center justify-center text-[10px]">🌸</span>
                        {c.authorName}
                      </span>
                      <span className="text-[10px] text-[#8C7A77]">
                        {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-[#4A3E3D] leading-relaxed pl-6">
                      {c.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
