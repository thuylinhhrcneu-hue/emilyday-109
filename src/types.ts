export interface ProjectItem {
  id: string;
  title: string;
  category: 'employer_branding' | 'community' | 'campaign' | 'strategy';
  categoryLabel: string;
  subtitle: string;
  period: string;
  role: string;
  clientOrOrg: string;
  metrics: {
    label: string;
    value: string;
  }[];
  thumbnail: string;
  summary: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  tags: string[];
  featured?: boolean;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: 'career' | 'inner_work' | 'lifestyle' | 'growth';
  categoryLabel: string;
  readTime: string;
  publishDate: string;
  coverImage: string;
  excerpt: string;
  content: string[]; // Structured paragraphs & subheadings
  quote?: string;
  tags: string[];
  featured?: boolean;
}

export interface CuratedProduct {
  id: string;
  title: string;
  category: 'beauty' | 'books' | 'fashion' | 'workspace' | 'course';
  categoryLabel: string;
  brand: string;
  price: string;
  rating: number;
  discountCode?: string;
  discountNote?: string;
  description: string;
  emilyReview: string;
  image: string;
  affiliateUrl: string;
  badge?: string; // e.g. "Emily khuyên dùng", "Đang dùng hàng ngày", "Must-have", "Sắp mở đơn"
  isCourse?: boolean;
}

export interface NewsletterPreference {
  email: string;
  name?: string;
  interest?: string;
}
