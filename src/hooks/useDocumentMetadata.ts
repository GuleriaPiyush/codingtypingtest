import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  faqSchema?: Array<{ q: string; a: string }>;
  articleSchema?: {
    headline: string;
    datePublished: string;
    authorName: string;
    description: string;
  };
}

export const useDocumentMetadata = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  faqSchema,
  articleSchema
}: SEOProps) => {
  useEffect(() => {
    // Set page title
    document.title = `${title} | CodeType - Programmer Typing Test`;

    // Set page meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set canonical link
    const currentUrl = canonicalUrl || window.location.href;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // Helper for OG Tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOgTag('og:title', title);
    updateOgTag('og:description', description);
    updateOgTag('og:url', currentUrl);
    updateOgTag('og:type', ogType);
    updateOgTag('og:site_name', 'CodeType');

    // Helper for Twitter Tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);

    // Handle Structured Data (JSON-LD)
    const jsonLdId = 'structured-data-jsonld';
    let scriptJsonLd = document.getElementById(jsonLdId) as HTMLScriptElement;
    if (scriptJsonLd) {
      scriptJsonLd.remove();
    }

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "CodeType",
        "url": "https://codetype.dev",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://codetype.dev/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ];

    if (faqSchema && faqSchema.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      });
    }

    if (articleSchema) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleSchema.headline,
        "datePublished": articleSchema.datePublished,
        "author": {
          "@type": "Person",
          "name": articleSchema.authorName
        },
        "description": articleSchema.description,
        "publisher": {
          "@type": "Organization",
          "name": "CodeType",
          "logo": {
            "@type": "ImageObject",
            "url": "https://codetype.dev/logo.png"
          }
        }
      });
    }

    scriptJsonLd = document.createElement('script');
    scriptJsonLd.id = jsonLdId;
    scriptJsonLd.type = 'application/ld+json';
    scriptJsonLd.text = JSON.stringify(schemas);
    document.head.appendChild(scriptJsonLd);

    return () => {
      const tag = document.getElementById(jsonLdId);
      if (tag) tag.remove();
    };
  }, [title, description, canonicalUrl, ogType, faqSchema, articleSchema]);
};
