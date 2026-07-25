import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDocumentMetadata } from '../hooks/useDocumentMetadata';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  useDocumentMetadata({
    title: 'Contact Us',
    description: 'Get in touch with the CodeType team for suggestions, bug reports, and features proposals.',
    canonicalUrl: 'https://codetype.dev/contact'
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      nextErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto w-full select-none"
    >
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3 font-mono">
          &lt;contact_us&gt;
        </h1>
        <p className="text-xs text-[var(--color-sub)] leading-relaxed">
          Have feedback or ideas to make CodeType better? Send us a message and we'll get back to you.
        </p>
      </header>

      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center gap-3 font-mono"
        >
          <CheckCircle2 className="text-emerald-500 w-10 h-10" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">Message Sent Successfully!</h3>
          <p className="text-[11px] text-[var(--color-sub)]">Thank you. We have received your inquiry and will respond shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs text-[var(--color-main)] underline cursor-pointer"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-mono text-xs">
          {/* Name input */}
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="name" className="text-[var(--color-sub)] font-semibold uppercase tracking-wider text-[10px]">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`px-3 py-2.5 rounded-xl bg-[var(--color-sub-alt)]/30 border text-[var(--color-text)] focus:outline-none focus:border-[var(--color-main)] ${
                errors.name ? 'border-[var(--color-error)]' : 'border-[var(--color-sub-alt)]/70'
              }`}
              placeholder="Your name"
            />
            {errors.name && <span className="text-[10px] text-[var(--color-error)] mt-0.5">{errors.name}</span>}
          </div>

          {/* Email input */}
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="email" className="text-[var(--color-sub)] font-semibold uppercase tracking-wider text-[10px]">Email</label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`px-3 py-2.5 rounded-xl bg-[var(--color-sub-alt)]/30 border text-[var(--color-text)] focus:outline-none focus:border-[var(--color-main)] ${
                errors.email ? 'border-[var(--color-error)]' : 'border-[var(--color-sub-alt)]/70'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <span className="text-[10px] text-[var(--color-error)] mt-0.5">{errors.email}</span>}
          </div>

          {/* Message input */}
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="message" className="text-[var(--color-sub)] font-semibold uppercase tracking-wider text-[10px]">Message</label>
            <textarea
              id="message"
              value={formData.message}
              rows={5}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`px-3 py-2.5 rounded-xl bg-[var(--color-sub-alt)]/30 border text-[var(--color-text)] focus:outline-none focus:border-[var(--color-main)] resize-none ${
                errors.message ? 'border-[var(--color-error)]' : 'border-[var(--color-sub-alt)]/70'
              }`}
              placeholder="Your message details..."
            />
            {errors.message && <span className="text-[10px] text-[var(--color-error)] mt-0.5">{errors.message}</span>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-[var(--color-main)] hover:bg-[var(--color-main)]/90 text-[var(--color-bg)] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send size={12} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-8 flex flex-col gap-2 items-center text-[10px] text-[var(--color-sub)] opacity-70 font-mono">
        <span className="flex items-center gap-1">
          <Mail size={12} /> support@codetype.dev
        </span>
      </div>
    </motion.div>
  );
};

export default Contact;
