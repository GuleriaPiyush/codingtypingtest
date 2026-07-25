import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';

export const Terms = () => {
  useDocumentMetadata({
    title: 'Terms of Service',
    description: 'Read the terms of service governing the usage of the CodeType typing application.',
    canonicalUrl: 'https://codetype.dev/terms'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto w-full select-none text-left"
    >
      <header className="mb-8 border-b border-[var(--color-sub-alt)] pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text)] mb-2 font-mono">
          &lt;terms_of_service&gt;
        </h1>
        <p className="text-xs text-[var(--color-sub)] font-mono">Last updated: July 25, 2026</p>
      </header>

      <div className="flex flex-col gap-6 text-xs text-[var(--color-sub)] leading-relaxed">
        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the CodeType web application, you agree to be bound by these Terms of Service 
            and comply with all applicable local regulations. If you do not agree with any of these terms, 
            you are prohibited from using this site.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">2. License & Intellectual Property</h2>
          <p>
            The software, layout design, typing logic, and assets of CodeType are open-source and released under the MIT License. 
            You are free to fork, modify, and distribute the application source code in compliance with the license provisions.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">3. Disclaimer of Warranties</h2>
          <p>
            The typing test application is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied. 
            In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising 
            from your use of the application.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-[var(--color-text)] mb-2 font-mono">4. Governing Law</h2>
          <p>
            Any claim relating to CodeType shall be governed by the laws of your local jurisdiction, 
            without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Terms;
