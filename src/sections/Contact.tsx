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
      className="py-24 bg-background-deep relative overflow-hidden"
    >
      {/* Background Cyber Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(109,179,63,0.12)_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#6DB33F]/50 to-transparent shadow-[0_0_15px_rgba(109,179,63,0.5)]" />

      <div className="max-w-2xl mx-auto px-5 md:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
            {/* Live availability indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DB33F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6DB33F]" />
            </span>
            <span className="font-mono text-xs text-[#6DB33F] uppercase tracking-widest font-semibold">
              Available to connect
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-4xl leading-tight font-bold text-white flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-[#6DB33F] font-mono select-none">&gt;_</span>
            Contact
          </h2>
          <p className="font-mono text-xs md:text-sm text-slate-300 tracking-wide mt-1">
            Let's build something scalable &amp; high-performance together.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm mt-4">
              Please contact me directly at{' '}
              <a
                href={`mailto:${email}`}
                className="text-[#6DB33F] hover:underline font-mono font-bold"
              >
                {email}
              </a>{' '}
              or drop your message below.
            </p>
        </div>

        {/* ── Contact Form Card with Glassmorphism & Cyber Glow ───────────────────────────────── */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-[#6DB33F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(109,179,63,0.15)] bg-[#0d1117]/90 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
              Send a Message
            </h3>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-[#6DB33F]/15 border border-[#6DB33F]/40 text-center space-y-3 shadow-[0_0_25px_rgba(109,179,63,0.2)]">
              <div className="material-symbols-outlined text-[#6DB33F] text-4xl animate-bounce">check_circle</div>
              <h4 className="text-white font-bold text-lg">Message Transmitted Successfully!</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. I've received your message and will respond as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 text-xs font-mono font-bold text-slate-950 bg-[#6DB33F] rounded-lg hover:bg-[#85E042] transition-all shadow-[0_0_15px_rgba(109,179,63,0.4)]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                    <span className="text-[#6DB33F] font-bold">&gt;</span> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161b22] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6DB33F] focus:ring-2 focus:ring-[#6DB33F]/40 transition-all font-mono shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                    <span className="text-[#6DB33F] font-bold">&gt;</span> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161b22] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6DB33F] focus:ring-2 focus:ring-[#6DB33F]/40 transition-all font-mono shadow-inner"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5 font-medium flex items-center gap-1.5">
                  <span className="text-[#6DB33F] font-bold">&gt;</span> Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#161b22] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#6DB33F] focus:ring-2 focus:ring-[#6DB33F]/40 transition-all font-mono resize-none shadow-inner"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-slate-400 font-mono pt-0.5">
                // Direct transmission to inbox. No spam.
              </p>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs leading-relaxed">
                  {errorMessage}
                </div>
              )}

              {/* 3D Push Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#6DB33F] hover:bg-[#7bc749] text-slate-950 font-mono text-xs uppercase tracking-wider font-extrabold rounded-xl transition-all shadow-[0_4px_20px_rgba(109,179,63,0.35)] hover:shadow-[0_6px_30px_rgba(109,179,63,0.5)] active:translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform font-bold">
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

