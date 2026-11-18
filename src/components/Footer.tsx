import { ArrowUpRight } from 'lucide-react';
import { CONTACT_CONFIG, NAV_LINKS, SITE_META } from '../data/portfolioData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const configuredSocials = [
    CONTACT_CONFIG.email
      ? { label: 'Email', href: `mailto:${CONTACT_CONFIG.email}`, external: false }
      : null,
    CONTACT_CONFIG.githubUrl
      ? { label: 'GitHub', href: CONTACT_CONFIG.githubUrl, external: true }
      : null,
    CONTACT_CONFIG.linkedinUrl
      ? { label: 'LinkedIn', href: CONTACT_CONFIG.linkedinUrl, external: true }
      : null,
  ].filter(Boolean) as { label: string; href: string; external: boolean }[];

  const handleShortcut = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#101110] text-[#F2F0E8] py-14 sm:py-16">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F2F0E8]/10">
          {/* Brand & Closing Statement */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleShortcut('#home');
              }}
              className="font-display text-2xl font-bold tracking-tight text-[#F2F0E8] hover:text-[#C6F36B] transition-colors inline-block"
            >
              {SITE_META.brand}
            </a>
            <p className="text-sm text-[#999B96] max-w-xs leading-relaxed">
              {SITE_META.degree} · {SITE_META.institution}
            </p>
          </div>

          {/* Navigation Shortcuts */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#999B96] mb-4">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleShortcut(link.href);
                    }}
                    className="text-[#F2F0E8]/85 hover:text-[#C6F36B] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Configured Social Links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#999B96] mb-4">
              Connect
            </h3>
            {configuredSocials.length > 0 ? (
              <ul className="space-y-2.5 text-sm">
                {configuredSocials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 text-[#F2F0E8]/85 hover:text-[#C6F36B] transition-colors"
                    >
                      <span>{item.label}</span>
                      {item.external && <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs font-mono text-[#999B96] leading-relaxed">
                Social links will appear here once configured in CONTACT_CONFIG.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Closing Line */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#999B96]">
          <p className="font-mono tabular-nums">
            &copy; {currentYear} {SITE_META.name}. All rights reserved.
          </p>
          <p className="font-display text-sm text-[#F2F0E8]/85 italic">
            {SITE_META.closingPhrase}
          </p>
        </div>
      </div>
    </footer>
  );
}
