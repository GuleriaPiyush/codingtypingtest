import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full max-w-3xl mx-auto mt-12 pt-8 border-t border-[var(--color-sub-alt)]/40">
      <h3 className="text-xl font-bold mb-6 font-mono text-[var(--color-text)] flex items-center gap-2">
        <span className="text-[var(--color-main)]">&lt;</span>
        Frequently Asked Questions
        <span className="text-[var(--color-main)]">/&gt;</span>
      </h3>
      
      <div className="flex flex-col gap-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-[var(--color-sub-alt)]/50 rounded-xl overflow-hidden bg-[var(--color-sub-alt)]/10"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-sm text-[var(--color-text)] hover:text-[var(--color-main)] transition-colors focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-[var(--color-sub)] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--color-main)]' : ''}`}
                />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-[var(--color-sub)]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
