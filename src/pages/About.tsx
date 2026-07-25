import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { Keyboard, Shield, BarChart3, Zap } from 'lucide-react';

export const About = () => {
  useDocumentMetadata({
    title: 'About CodeType',
    description: 'Learn about CodeType, a touch typing application designed to help developers type special characters, brackets, and code syntax faster.',
    canonicalUrl: 'https://codetype.dev/about'
  });

  const features = [
    {
      icon: <Keyboard className="text-[var(--color-main)] w-6 h-6" />,
      title: 'Programmer Syntax Focus',
      description: 'Unlike standard tests, we focus heavily on special characters, braces, brackets, operators, and semicolons.'
    },
    {
      icon: <Zap className="text-[var(--color-main)] w-6 h-6" />,
      title: 'Smart Indentation',
      description: 'Our engine automatically skips leading whitespaces on newlines so you focus on typing code, not indenting.'
    },
    {
      icon: <BarChart3 className="text-[var(--color-main)] w-6 h-6" />,
      title: 'Procedural Audio Feedback',
      description: 'Hear instant clicks and error alerts generated dynamically on-the-fly without downloading audio assets.'
    },
    {
      icon: <Shield className="text-[var(--color-main)] w-6 h-6" />,
      title: 'Distraction-Free Design',
      description: 'Zero ads, zero unnecessary animations, and custom typography to optimize focus and ergonomics.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto w-full select-none"
    >
      <header className="mb-10 text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3 font-mono">
          &lt;about_codetype&gt;
        </h1>
        <p className="text-sm text-[var(--color-sub)] leading-relaxed">
          CodeType is an open-source, lightweight typing test platform designed specifically for software engineers. 
          Standard typing tests focus on prose, which doesn't translate to developer productivity. CodeType lets you practice 
          actual syntax across 15 programming languages.
        </p>
      </header>

      {/* Grid of features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12" aria-label="Key Features">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="p-5 rounded-2xl bg-[var(--color-sub-alt)]/10 border border-[var(--color-sub-alt)]/25 flex flex-col gap-3"
          >
            <div className="bg-[var(--color-sub-alt)]/40 p-2.5 rounded-xl w-fit">
              {f.icon}
            </div>
            <h3 className="font-bold text-sm text-[var(--color-text)]">{f.title}</h3>
            <p className="text-xs text-[var(--color-sub)] leading-relaxed">{f.description}</p>
          </div>
        ))}
      </section>

      {/* Ergonomic guidelines */}
      <section className="p-6 rounded-2xl bg-[var(--color-sub-alt)]/20 border border-[var(--color-sub-alt)]/35 mb-8">
        <h3 className="text-base font-bold text-[var(--color-text)] mb-3 font-mono">Tips for Coding Velocity:</h3>
        <ul className="list-disc list-inside text-xs text-[var(--color-sub)] flex flex-col gap-2 leading-relaxed">
          <li>
            <strong className="text-[var(--color-text)]">Focus on Accuracy:</strong> Do not rush. Make your movements slow and deliberate until your fingers memorize symbol locations.
          </li>
          <li>
            <strong className="text-[var(--color-text)]">Home Row Anchors:</strong> Keep your fingers close to the home row key layout. Avoid lifting your hands when typing brackets.
          </li>
          <li>
            <strong className="text-[var(--color-text)]">Look Ahead:</strong> Keep your eyes focused on the upcoming token rather than the key you are pressing.
          </li>
          <li>
            <strong className="text-[var(--color-text)]">Procedural Sounds:</strong> Enable click/beep sound profiles to build immediate audio feedback hooks.
          </li>
        </ul>
      </section>

      <div className="text-center text-[10px] text-[var(--color-sub)] font-mono opacity-80 mt-10">
        CodeType version 1.0.0. Open-source under MIT License.
      </div>
    </motion.div>
  );
};

export default About;
