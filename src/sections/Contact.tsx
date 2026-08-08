import { useState, type FormEvent } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/config/site';

const email = siteConfig.email ?? 'hoangmai.it.dev@gmail.com';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepared for Resend API key integration / form submission
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      // Error handling if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className="py-20 bg-background-deep relative"
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#6DB33F]/40 to-transparent" />

      <div className="max-w-2xl mx-auto px-5 md:px-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            {/* Live availability indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DB33F] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DB33F]" />
            </span>
            <span className="font-mono text-[11px] text-[#6DB33F] uppercase tracking-widest font-semibold">
              Available to connect
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl leading-tight text-white font-bold mb-3">
            Let's build something{' '}
            <span className="text-[#6DB33F]">together.</span>
          </h2>
          <p className="text-text-secondary font-body text-sm leading-relaxed max-w-lg">
            I'm open to backend roles, system design discussions, and collaborative
            projects. Whether you have a question or just want to say hello — feel free to reach out.
          </p>
          <p className="text-text-secondary text-xs sm:text-sm">
              Please contact me directly at{' '}
              <a
                href={`mailto:${email}`}
                className="text-[#6DB33F] hover:underline font-mono font-medium"
              >
                {email}
              </a>{' '}
              or drop your info here.
            </p>
        </div>

        {/* ── Contact Form Card ───────────────────────────────── */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl bg-[#0d1117]/80 backdrop-blur-md">
          <div className="mb-6">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-1.5">
              Contact Form
            </h3>
            
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-[#6DB33F]/10 border border-[#6DB33F]/30 text-center space-y-2">
              <div className="material-symbols-outlined text-[#6DB33F] text-3xl">check_circle</div>
              <h4 className="text-white font-bold text-base">Message Sent Successfully!</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Thank you for reaching out. I've received your message and will respond as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-1.5 text-xs font-mono text-[#6DB33F] border border-[#6DB33F]/40 rounded hover:bg-[#6DB33F]/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-text-secondary mb-1.5 font-medium">
                    Full name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161b22] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-text-secondary/40 focus:outline-none focus:border-[#6DB33F] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-text-secondary mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161b22] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-text-secondary/40 focus:outline-none focus:border-[#6DB33F] transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div>
                <label className="block text-xs font-mono text-text-secondary mb-1.5 font-medium">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#161b22] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-text-secondary/40 focus:outline-none focus:border-[#6DB33F] transition-colors resize-none"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-text-secondary/50 font-mono pt-1">
                I'll never share your data with anyone else. Pinky promise!
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#161b22] hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </AnimatedSection>
  );
}

