import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS, SITE_META } from '../data/portfolioData';

export function Navbar() {
  const [activeHref, setActiveHref] = useState<string>('#home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHref(`#${id}`);
            }
          });
        },
        {
          rootMargin: '-35% 0px -50% 0px',
          threshold: 0.01,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveHref(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#101110]/90 backdrop-blur-md border-b border-[#F2F0E8]/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-display text-lg font-bold tracking-tight text-[#F2F0E8] whitespace-nowrap shrink-0 hover:text-[#C6F36B] transition-colors duration-200"
        >
          {SITE_META.brand}
        </a>

        {/* Zone 2: Navigation Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive ? 'text-[#F2F0E8]' : 'text-[#999B96] hover:text-[#F2F0E8]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C6F36B] origin-left transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Availability Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#101110] bg-[#C6F36B] hover:bg-[#d5f78e] transition-colors duration-200 whitespace-nowrap shrink-0 rounded-sm"
          >
            <span>{SITE_META.availabilityLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F2F0E8] border border-[#F2F0E8]/15 rounded-sm hover:border-[#C6F36B]/60 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#101110] border-t border-b border-[#F2F0E8]/10 px-5 py-6">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`py-3 px-2 text-base font-medium border-b border-[#F2F0E8]/6 flex items-center justify-between transition-colors ${
                    isActive ? 'text-[#C6F36B]' : 'text-[#F2F0E8] hover:text-[#C6F36B]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" aria-hidden="true" />
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#101110] bg-[#C6F36B] rounded-sm"
            >
              <span>{SITE_META.availabilityLabel}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
