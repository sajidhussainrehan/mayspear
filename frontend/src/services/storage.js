const STORAGE_KEYS = {
  BLOGS: 'sandspire_blogs',
  NEWS: 'sandspire_news'
};

const DEFAULT_BLOGS = [
  {
    id: '1',
    date: "March 2026",
    category: "Market Insights",
    title: "European Private Credit: Servicing Trends for 2026",
    excerpt: "As the European private credit market continues to mature, institutional investors are demanding higher standards in loan administration and portfolio surveillance.",
    readTime: "5 min read",
    slug: "european-private-credit-trends-2026",
    content: "Full article content here..."
  },
  {
    id: '2',
    date: "February 2026",
    category: "Regulatory",
    title: "SFDR Compliance: What Fund Managers Need to Know",
    excerpt: "The Sustainable Finance Disclosure Regulation continues to evolve. Our guide to SFDR reporting requirements.",
    readTime: "4 min read",
    slug: "sfdr-compliance-guide",
    content: "Full article content here..."
  },
  {
    id: '3',
    date: "January 2026",
    category: "Best Practices",
    title: "Loan Onboarding: Building Efficiency from Day One",
    excerpt: "The first 48 hours of a servicing mandate set the tone for the entire relationship.",
    readTime: "6 min read",
    slug: "loan-onboarding-best-practices",
    content: "Full article content here..."
  },
  {
    id: '4',
    date: "December 2025",
    category: "Case Study",
    title: "Restructuring Success: A CRE Portfolio Case Study",
    excerpt: "How proactive surveillance and early engagement with borrowers helped preserve value.",
    readTime: "8 min read",
    slug: "cre-restructuring-case-study",
    content: "Full article content here..."
  }
];

const DEFAULT_NEWS = [
  {
    id: '1',
    date: "12 Mar 2026",
    type: "Company",
    title: "Sandspire Global Announces New Advisory Board Member",
    content: "We are pleased to welcome a senior industry executive with over 25 years of experience in European credit markets to our advisory board."
  },
  {
    id: '2',
    date: "28 Feb 2026",
    type: "Expansion",
    title: "New Office Opening in Luxembourg",
    content: "Sandspire Global expands its European presence with a new office in Luxembourg to better serve clients in the Benelux region."
  },
  {
    id: '3',
    date: "15 Jan 2026",
    type: "Mandate",
    title: "€500M CLO Servicing Mandate Awarded",
    content: "A leading European asset manager has appointed Sandspire as servicer for their latest CLO transaction."
  },
  {
    id: '4',
    date: "08 Dec 2025",
    type: "Partnership",
    title: "Strategic Partnership with Regulatory Technology Firm",
    content: "New partnership enhances our SFDR and ESG reporting capabilities for institutional clients."
  },
  {
    id: '5',
    date: "20 Nov 2025",
    type: "Recognition",
    title: "Named in Top 20 European Loan Servicers",
    content: "Industry publication recognizes Sandspire's rapid growth and client satisfaction ratings."
  }
];

export function getBlogs() {
  const stored = localStorage.getItem(STORAGE_KEYS.BLOGS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
    return DEFAULT_BLOGS;
  }
  return JSON.parse(stored);
}

export function saveBlog(blog) {
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  };
  blogs.unshift(newBlog);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
  return newBlog;
}

export function deleteBlog(id) {
  const blogs = getBlogs().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
}

export function getNews() {
  const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(DEFAULT_NEWS));
    return DEFAULT_NEWS;
  }
  return JSON.parse(stored);
}

export function saveNews(newsItem) {
  const news = getNews();
  const newItem = {
    ...newsItem,
    id: Date.now().toString()
  };
  news.unshift(newItem);
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  return newItem;
}

export function deleteNews(id) {
  const news = getNews().filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
}
