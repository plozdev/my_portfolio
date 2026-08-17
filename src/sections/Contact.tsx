import { useState, type FormEvent } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { siteConfig } from '@/config/site';

const email = siteConfig.email ?? 'hoangmai.it.dev@gmail.com';

// Common disposable / temp email providers blacklist
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'yopmail.com',
  'yopmail.net',
  'trashmail.com',
  'trashmail.net',
  'sharklasers.com',
  'throwawaymail.com',
  'dispostable.com',
  'getairmail.com',
  'nada.ltd',
  'mohmal.com',
  'burnermail.io',
  'inboxkitten.com',
  'crazymailing.com',
  'tempail.com',
  'fakemailgenerator.com',
]);

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const COOLDOWN_MS = 60 * 1000; // 60 seconds rate limit per submission

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState(''); // Bot trap field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): string | null => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2) {
      return 'Vui lòng nhập tên hợp lệ (tối thiểu 2 ký tự).';
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return 'Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.';
    }

    const domain = trimmedEmail.split('@')[1];
    if (!domain || !domain.includes('.') || domain.split('.').pop()!.length < 2) {
      return 'Tên miền email không hợp lệ.';
    }

    if (DISPOSABLE_DOMAINS.has(domain)) {
      return 'Email tạm thời (disposable email) không được chấp nhận. Vui lòng dùng email thực tế.';
    }

    if (trimmedMessage.length < 10) {
      return 'Tin nhắn quá ngắn. Vui lòng nhập nội dung tối thiểu 10 ký tự.';
    }

    // Rate Limit Check
    const lastSubmitTime = localStorage.getItem('portfolio_last_contact_submit');
    if (lastSubmitTime) {
      const timeSinceLast = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeSinceLast < COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((COOLDOWN_MS - timeSinceLast) / 1000);
        return `Bạn đang gửi quá nhanh. Vui lòng đợi ${remainingSeconds} giây nữa trước khi gửi tiếp.`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Silent Bot Trap: if honeypot was populated by automated bot, fake success without sending
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    // 2. Strict validation & Rate-limit check
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const targetEmail = import.meta.env.VITE_CONTACT_EMAIL || siteConfig.email || 'hoangmai.it.dev@gmail.com';
      const cleanName = formData.name.trim();
      const cleanEmail = formData.email.trim().toLowerCase();
      const cleanMessage = formData.message.trim();

      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          _honey: honeypot,
          _subject: `[Portfolio] New message from ${cleanName}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
        // Record timestamp for rate limiting
        localStorage.setItem('portfolio_last_contact_submit', Date.now().toString());
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || `Lỗi gửi tin nhắn (${response.status})`);
      }
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
              {/* ── Anti-Bot Honeypot Trap (Hidden from real users) ── */}
              <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact_field_honey">Do not fill this field</label>
                <input
                  id="contact_field_honey"
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

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

