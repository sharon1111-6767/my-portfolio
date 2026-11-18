import { useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  FileDown,
  Github,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { CONTACT_CONFIG, SITE_META } from '../data/portfolioData';
import { ResumeStatus } from '../hooks/useResumeAvailable';

interface ContactSectionProps {
  resumeStatus: ResumeStatus;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection({ resumeStatus }: ContactSectionProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'unconfigured'>(
    'idle'
  );
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please provide a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      nextErrors.subject = 'Please include a brief subject (at least 3 characters).';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    }
    return nextErrors;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedbackMessage('Please fix the highlighted fields before submitting.');
      return;
    }

    if (!CONTACT_CONFIG.formEndpoint) {
      setStatus('unconfigured');
      setFeedbackMessage(
        'No submission endpoint is configured yet in CONTACT_CONFIG.formEndpoint. You can copy your formatted message below rather than sending to a mock endpoint.'
      );
      return;
    }

    setStatus('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch(CONTACT_CONFIG.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus('success');
      setFeedbackMessage('Your message has been delivered. Thank you for reaching out.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setFeedbackMessage(
        'Unable to reach the configured form endpoint right now. Please try again or copy your message.'
      );
    }
  };

  const handleCopyMessage = async () => {
    const formatted = `Subject: ${form.subject.trim()}\nFrom: ${form.name.trim()} <${form.email.trim()}>\n\n${form.message.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#191B19] border-b border-[#F2F0E8]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Heading Block */}
        <div className="mb-14 border-b border-[#F2F0E8]/10 pb-8">
          <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
            06. Contact
          </span>
          <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] text-balance mb-4">
            Have something interesting in mind?
          </h2>
          <p className="text-base sm:text-lg text-[#999B96] max-w-xl">
            I&apos;m always interested in learning, collaborating and exploring new ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Channels & Resume Availability */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#101110] border border-[#F2F0E8]/10 rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C6F36B] mb-2">
                  Direct Channels
                </h3>
                <p className="text-sm text-[#999B96] leading-relaxed">
                  {SITE_META.availabilityDetail}
                </p>
              </div>

              <dl className="divide-y divide-[#F2F0E8]/10 border-t border-[#F2F0E8]/10">
                {/* Email */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#999B96]">
                    <Mail className="w-4 h-4 text-[#C6F36B]" aria-hidden="true" />
                    <span>Email</span>
                  </dt>
                  <dd className="text-sm text-right">
                    {CONTACT_CONFIG.email ? (
                      <a
                        href={`mailto:${CONTACT_CONFIG.email}`}
                        className="text-[#F2F0E8] hover:text-[#C6F36B] transition-colors"
                      >
                        {CONTACT_CONFIG.email}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-[#999B96]">
                        Placeholder · Configure email
                      </span>
                    )}
                  </dd>
                </div>

                {/* GitHub */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#999B96]">
                    <Github className="w-4 h-4 text-[#C6F36B]" aria-hidden="true" />
                    <span>GitHub</span>
                  </dt>
                  <dd className="text-sm text-right">
                    {CONTACT_CONFIG.githubUrl ? (
                      <a
                        href={CONTACT_CONFIG.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F2F0E8] hover:text-[#C6F36B] transition-colors"
                      >
                        {CONTACT_CONFIG.githubHandle || 'View Profile'}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-[#999B96]">
                        Placeholder · Configure URL
                      </span>
                    )}
                  </dd>
                </div>

                {/* LinkedIn */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <dt className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#999B96]">
                    <Linkedin className="w-4 h-4 text-[#C6F36B]" aria-hidden="true" />
                    <span>LinkedIn</span>
                  </dt>
                  <dd className="text-sm text-right">
                    {CONTACT_CONFIG.linkedinUrl ? (
                      <a
                        href={CONTACT_CONFIG.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F2F0E8] hover:text-[#C6F36B] transition-colors"
                      >
                        {CONTACT_CONFIG.linkedinHandle || 'View Profile'}
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-[#999B96]">
                        Placeholder · Configure URL
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Resume Module */}
            <div className="bg-[#101110] border border-[#F2F0E8]/10 rounded-sm p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#C6F36B]">
                  Curriculum Vitae
                </h3>
                <span className="font-mono text-[11px] text-[#999B96]">
                  {resumeStatus === 'available'
                    ? 'PDF Ready'
                    : resumeStatus === 'checking'
                      ? 'Checking...'
                      : 'Pending File'}
                </span>
              </div>

              {resumeStatus === 'available' ? (
                <>
                  <p className="text-sm text-[#999B96]">
                    Download a copy of Sharanya&apos;s academic background and technical summary.
                  </p>
                  <a
                    href={SITE_META.resumePath}
                    download="Sharanya_Resume.pdf"
                    className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-semibold text-[#101110] bg-[#C6F36B] hover:bg-[#d5f78e] transition-colors rounded-sm"
                  >
                    <FileDown className="w-4 h-4" aria-hidden="true" />
                    <span>Download Resume (PDF)</span>
                  </a>
                </>
              ) : (
                <p className="text-sm text-[#999B96] leading-relaxed">
                  Resume download activates automatically once a PDF is placed at{' '}
                  <code className="font-mono text-xs text-[#F2F0E8]/85">/public/resume.pdf</code>.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#101110] border border-[#F2F0E8]/12 rounded-sm p-6 sm:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs uppercase tracking-wider text-[#999B96] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full px-4 py-3 bg-[#191B19] border border-[#F2F0E8]/15 rounded-sm text-sm text-[#F2F0E8] placeholder:text-[#999B96]/60 focus:border-[#C6F36B] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs uppercase tracking-wider text-[#999B96] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-4 py-3 bg-[#191B19] border border-[#F2F0E8]/15 rounded-sm text-sm text-[#F2F0E8] placeholder:text-[#999B96]/60 focus:border-[#C6F36B] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs uppercase tracking-wider text-[#999B96] mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Collaboration, study inquiry, or project idea"
                  aria-invalid={Boolean(errors.subject)}
                  className="w-full px-4 py-3 bg-[#191B19] border border-[#F2F0E8]/15 rounded-sm text-sm text-[#F2F0E8] placeholder:text-[#999B96]/60 focus:border-[#C6F36B] focus:outline-none transition-colors"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider text-[#999B96] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Share what you are building or exploring..."
                  aria-invalid={Boolean(errors.message)}
                  className="w-full px-4 py-3 bg-[#191B19] border border-[#F2F0E8]/15 rounded-sm text-sm text-[#F2F0E8] placeholder:text-[#999B96]/60 focus:border-[#C6F36B] focus:outline-none transition-colors resize-y"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Status Feedback */}
              {feedbackMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-4 rounded-sm border text-sm space-y-3 ${
                    status === 'success'
                      ? 'bg-[#C6F36B]/10 border-[#C6F36B]/40 text-[#F2F0E8]'
                      : status === 'unconfigured'
                        ? 'bg-[#191B19] border-[#F2F0E8]/20 text-[#F2F0E8]'
                        : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {status === 'success' ? (
                      <Check className="w-4 h-4 text-[#C6F36B] shrink-0 mt-0.5" aria-hidden="true" />
                    ) : (
                      <AlertCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          status === 'unconfigured' ? 'text-[#C6F36B]' : 'text-rose-400'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    <p className="leading-relaxed">{feedbackMessage}</p>
                  </div>

                  {status === 'unconfigured' && (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-[#101110] border border-[#F2F0E8]/20 hover:border-[#C6F36B] text-[#F2F0E8] rounded-sm transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C6F36B]" aria-hidden="true" />
                            <span>Copied formatted message</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#C6F36B]" aria-hidden="true" />
                            <span>Copy formatted message</span>
                          </>
                        )}
                      </button>

                      {CONTACT_CONFIG.email && (
                        <a
                          href={`mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent(
                            form.subject
                          )}&body=${encodeURIComponent(form.message)}`}
                          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-[#C6F36B] text-[#101110] rounded-sm"
                        >
                          <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Open Email Client</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <span className="font-mono text-xs text-[#999B96]">
                  {CONTACT_CONFIG.formEndpoint
                    ? 'Direct delivery active'
                    : 'Form endpoint awaiting configuration'}
                </span>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#101110] bg-[#C6F36B] hover:bg-[#d5f78e] disabled:opacity-60 transition-colors rounded-sm"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
