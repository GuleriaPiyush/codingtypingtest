import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import type { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group flex flex-col p-6 rounded-2xl bg-[var(--color-sub-alt)]/10 hover:bg-[var(--color-sub-alt)]/30 border border-[var(--color-sub-alt)]/35 hover:border-[var(--color-main)]/30 transition-all duration-300 relative shadow-sm">
      {/* Category and Read time tag */}
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[var(--color-sub)] mb-3">
        <span className="bg-[var(--color-sub-alt)] px-2 py-0.5 rounded text-[var(--color-main)] font-semibold">
          {post.category}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-main)] transition-colors line-clamp-2 leading-snug mb-2">
        <Link to={`/blog/${post.slug}`} className="focus:outline-none">
          {post.title}
        </Link>
      </h2>

      {/* Description */}
      <p className="text-xs text-[var(--color-sub)] line-clamp-3 leading-relaxed mb-6">
        {post.description}
      </p>

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-auto border-t border-[var(--color-sub-alt)]/40 pt-4 text-[11px] text-[var(--color-sub)] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-main)]"></span>
          <span>By {post.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={11} />
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>
      </div>

      {/* Read more button link anchor */}
      <Link
        to={`/blog/${post.slug}`}
        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-[var(--color-main)] hidden md:block"
        aria-hidden="true"
      >
        <ChevronRight size={18} />
      </Link>
    </article>
  );
};

export default BlogCard;
