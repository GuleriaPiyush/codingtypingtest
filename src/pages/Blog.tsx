import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { BLOG_POSTS } from '../data/blogPosts';
import BlogCard from '../components/blog/BlogCard';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useDocumentMetadata({
    title: 'Developer Typing Blog',
    description: 'Read expert advice, typing posture guides, IDE shortcuts, and techniques to increase your coding speed and words per minute (WPM).',
    canonicalUrl: 'https://codetype.dev/blog'
  });

  const categories = ['all', 'Guides', 'Productivity', 'Research', 'Languages'];

  const filteredPosts = activeCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto w-full select-none"
    >
      <header className="mb-8 text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3 font-mono">
          &lt;developer_blog&gt;
        </h1>
        <p className="text-sm text-[var(--color-sub)] leading-relaxed max-w-2xl">
          Insights, guides, and studies on keyboard layout ergonomics, typing speed, and developer efficiency.
        </p>
      </header>

      {/* Category selection filters bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-[var(--color-sub-alt)]/35 pb-6 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'text-[var(--color-main)] bg-[var(--color-sub-alt)] border-[var(--color-main)]/30 font-bold'
                : 'text-[var(--color-sub)] border-transparent hover:text-[var(--color-text)]'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Blog Cards list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center font-mono text-xs text-[var(--color-sub)]">
            No articles found under this category.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
