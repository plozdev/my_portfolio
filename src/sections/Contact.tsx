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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const apiKey = import.meta.env.VITE_RESEND_API_KEY;
      const fromEmail = import.meta.env.VITE_RESEND_FROM || 'onboarding@resend.dev';
      const toEmail = import.meta.env.VITE_RESEND_TO || 'hoangmai.it.dev@gmail.com';

      if (!apiKey) {
        throw new Error('Vui lòng thêm VITE_RESEND_API_KEY vào tệp .env');
      }

      // Check if we are running in local dev or production
      const isDev = import.meta.env.DEV;
      const url = isDev ? '/api-resend/emails' : 'https://api.resend.com/emails';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: `Portfolio Message from ${formData.name}`,
          html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h3 style="color: #6DB33F;">New Message from Portfolio</h3>
            <p><strong>Sender:</strong> ${formData.name} (<a href="mailto:${formData.email}">${formData.email}</a>)</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-wrap;">${formData.message}</div>
          </div>`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || `API error with status ${response.status}`);
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Error sending message:', err);
      setErrorMessage(err.message || 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
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

          <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-primary font-mono select-none">&gt;_</span>
            Contact
          </h2>
          <p className="font-mono text-xs md:text-sm text-text-secondary/70 tracking-wide mt-1">
            Let's build something together
          </p>
          <p className="text-text-secondary text-xs sm:text-sm mt-4">
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

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-[11px] leading-relaxed">
                  {errorMessage}
                </div>
              )}

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

