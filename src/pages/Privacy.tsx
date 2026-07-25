import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Privacy = () => {
  useDocumentMetadata({
    title: 'Privacy Policy',
    description: 'Read the CodeType privacy policy. We only save configuration settings locally in your browser.',
    canonicalUrl: 'https://codetype.dev/privacy'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full select-none text-left"
    >
      <header className="mb-8 border-b border-[var(--color-sub-alt)] pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] mb-2 font-mono">
          &lt;privacy_policy&gt;
        </h1>
        <p className="text-xs text-[var(--color-sub)] font-mono">Last updated: July 25, 2026</p>
      </header>

      <div className="flex flex-col gap-6 text-xs text-[var(--color-sub)] leading-relaxed">
        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">1. Overview</h2>
          <p>
            At CodeType, we value your privacy. This application is designed to run entirely in your web browser. 
            We do not collect, store, or transmit any personal data, emails, typing histories, or test scores to external servers.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">2. LocalStorage Configuration</h2>
          <p>
            We use the browser's <code>LocalStorage</code> to persist your application configurations. This includes:
          </p>
          <ul className="list-disc list-inside ml-4 mt-2 flex flex-col gap-1 font-mono text-[10px]">
            <li>Selected Theme preference (Dark or Light)</li>
            <li>Typing Mode preferences (Time, Words, or Code)</li>
            <li>Timer limits and Word limit targets</li>
            <li>Active programming language selection</li>
            <li>Sound preference level and Caret styles</li>
          </ul>
          <p className="mt-2">
            This data is stored purely on your machine and you can clear it at any time by clearing your browser cache.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">3. Analytics and Cookies</h2>
          <p>
            CodeType does not use cookies, tracker pixels, or third-party web analytics tools (like Google Analytics). 
            Your typing speed exercises are fully private.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy as we add future services (such as authenticated online leaderboards). 
            Any updates will be posted transparently on this page.
          </p>
        </section>

        <section className="mt-4 pt-4 border-t border-[var(--color-sub-alt)]/35 text-[10px] text-center font-mono">
          For privacy inquiries, contact support@codetype.dev
        </section>
      </div>
    </motion.div>
  );
};

export default Privacy;
