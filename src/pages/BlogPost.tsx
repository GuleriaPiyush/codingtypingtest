import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { getBlogPostBySlug } from '../data/blogPosts';
import FAQAccordion from '../components/blog/FAQAccordion';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  // Set SEO tags & structured schema JSON-LD dynamic injections
  useDocumentMetadata({
    title: post ? post.title : 'Article Not Found',
    description: post ? post.description : 'Blog article details.',
    canonicalUrl: post ? `https://codetype.dev/blog/${post.slug}` : undefined,
    ogType: 'article',
    faqSchema: post?.faqs,
    articleSchema: post ? {
      headline: post.title,
      datePublished: post.publishDate,
      authorName: post.author,
      description: post.description
    } : undefined
  });

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto w-full text-center py-20 font-mono text-xs text-[var(--color-sub)] select-none">
        <h1 className="text-xl font-bold text-[var(--color-text)] mb-4">Article Not Found</h1>
        <p className="mb-6">The article you are looking for does not exist or has been relocated.</p>
        <Link to="/blog" className="text-[var(--color-main)] underline flex items-center gap-1.5 justify-center">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>
    );
  }

  // A custom lightweight parser to convert simple Markdown structure into structured HTML elements
  const parseMarkdown = (md: string) => {
    const lines = md.split('\n');
    let inCodeBlock = false;
    let codeContent = '';

    return lines.map((line, idx) => {
      // 1. Process Code block tags
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const content = codeContent;
          codeContent = '';
          return (
            <pre key={idx} className="bg-[var(--color-sub-alt)]/35 border border-[var(--color-sub-alt)]/50 p-4 rounded-xl my-4 overflow-x-auto text-[11px] font-mono text-[var(--color-text)]">
              <code>{content}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return null;
      }

      // 2. Headings
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl font-bold font-mono text-[var(--color-text)] mt-8 mb-4 border-b border-[var(--color-sub-alt)]/40 pb-2">
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base font-bold font-mono text-[var(--color-text)] mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }

      // 3. Unordered lists
      if (line.trim().startsWith('* ')) {
        const cleanLine = line.trim().replace('* ', '');
        return (
          <li
            key={idx}
            className="text-xs text-[var(--color-sub)] leading-relaxed ml-5 list-disc pl-1 my-2"
            dangerouslySetInnerHTML={{
              __html: cleanLine
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-[var(--color-sub-alt)] px-1.5 py-0.5 rounded text-[var(--color-main)] text-[10px] font-mono">$1</code>')
            }}
          />
        );
      }

      // 4. Ordered lists (numbers in table of contents)
      if (/^\d+\.\s+/.test(line.trim())) {
        const cleanLine = line.trim().replace(/^\d+\.\s+/, '');
        return (
          <li
            key={idx}
            className="text-xs text-[var(--color-sub)] leading-relaxed ml-5 list-decimal pl-1 my-2"
            dangerouslySetInnerHTML={{
              __html: cleanLine
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[var(--color-main)] hover:underline font-mono">$1</a>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-[var(--color-sub-alt)] px-1.5 py-0.5 rounded text-[var(--color-main)] text-[10px] font-mono">$1</code>')
            }}
          />
        );
      }

      // 5. Empty line placeholders
      if (line.trim() === '') {
        return null;
      }

      // 6. Anchor identifier mapping
      if (line.trim().startsWith('<div id=')) {
        const idMatch = line.match(/id="([^"]+)"/);
        if (idMatch) {
          return <div key={idx} id={idMatch[1]} className="scroll-mt-10" />;
        }
      }

      // 7. Standard Paragraphs
      return (
        <p
          key={idx}
          className="text-xs text-[var(--color-sub)] leading-relaxed my-3"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`(.*?)`/g, '<code class="bg-[var(--color-sub-alt)] px-1.5 py-0.5 rounded text-[var(--color-main)] text-[10px] font-mono">$1</code>')
          }}
        />
      );
    }).filter((el) => el !== null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto w-full select-none"
    >
      {/* Breadcrumbs for SEO hierarchical navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-sub)] mb-6">
        <Link to="/" className="hover:text-[var(--color-main)]">Home</Link>
        <ChevronRight size={10} />
        <Link to="/blog" className="hover:text-[var(--color-main)]">Blog</Link>
        <ChevronRight size={10} />
        <span className="text-[var(--color-text)] truncate max-w-[200px]" aria-current="page">
          {post.title}
        </span>
      </nav>

      {/* Back button */}
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-[var(--color-sub)] hover:text-[var(--color-main)] mb-6 transition-colors">
        <ArrowLeft size={12} />
        <span>Back to Blog</span>
      </Link>

      {/* Article headers */}
      <header className="mb-8 border-b border-[var(--color-sub-alt)]/40 pb-6 text-left">
        <span className="bg-[var(--color-sub-alt)]/70 text-[var(--color-main)] text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 inline-block">
          {post.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--color-text)] leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--color-sub)] opacity-90">
          <div className="flex items-center gap-1">
            <User size={13} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={13} />
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Rich content text parsed using our compilation helper */}
      <article className="w-full text-left prose prose-invert max-w-none mb-12">
        {parseMarkdown(post.content)}
      </article>

      {/* Structured Accordion FAQs */}
      <FAQAccordion faqs={post.faqs} />
    </motion.div>
  );
};

export default BlogPost;
