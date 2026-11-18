import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, FileDown } from 'lucide-react';
import { SITE_META } from '../data/portfolioData';
import { ResumeStatus } from '../hooks/useResumeAvailable';

interface HeroSectionProps {
  resumeStatus: ResumeStatus;
}

export function HeroSection({ resumeStatus }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({ x: relX * 14, y: relY * 14 });
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between bg-[#101110] overflow-hidden border-b border-[#F2F0E8]/10"
    >
      {/* Subtle architectural grid & restrained gradient atmosphere */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-obsidian-grid opacity-70 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 28%, rgba(198, 243, 107, 0.06) 0%, rgba(16, 17, 16, 0) 52%)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-5 sm:px-8 my-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Typographic Editorial Column */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <p className="text-xs font-mono tracking-[0.16em] uppercase text-[#999B96]">
                ECE STUDENT / TECHNOLOGY ENTHUSIAST / LIFELONG LEARNER
              </p>

              <motion.h1
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold text-[#F2F0E8] tracking-[-0.03em] leading-[1.02] text-[clamp(2.65rem,5.4vw,4.75rem)] text-balance"
              >
                Curiosity builds.
                <br />
                <span className="font-normal text-[#F2F0E8]/90">Technology </span>
                <em className="italic font-semibold text-[#C6F36B]">
                  transforms.
                </em>
              </motion.h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-[#999B96] leading-[1.65] max-w-[54ch]"
              >
                I&apos;m Sharanya — an Electronics and Communication Engineering student exploring the
                intersection of electronics, artificial intelligence and technology.
              </motion.p>
            </div>

            {/* Action Hierarchy: Single Primary CTA + Secondary Action + Conditional Resume */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#projects');
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#101110] bg-[#C6F36B] hover:bg-[#d5f78e] transition-colors duration-200 rounded-sm whitespace-nowrap shrink-0"
              >
                <span>Explore my work</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#F2F0E8] border border-[#F2F0E8]/20 hover:border-[#C6F36B]/70 hover:text-[#C6F36B] transition-colors duration-200 rounded-sm whitespace-nowrap shrink-0"
              >
                <span>Get in touch</span>
              </a>

              {resumeStatus === 'available' && (
                <a
                  href={SITE_META.resumePath}
                  download="Sharanya_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-[#999B96] hover:text-[#F2F0E8] transition-colors duration-200 whitespace-nowrap shrink-0"
                >
                  <FileDown className="w-4 h-4 text-[#C6F36B]" aria-hidden="true" />
                  <span>Download Resume</span>
                </a>
              )}
            </div>

            {/* Hairline Institutional Context Row */}
            <div className="pt-6 border-t border-[#F2F0E8]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="block font-mono text-[#999B96] uppercase tracking-wider mb-1">
                  Academic Base
                </span>
                <span className="text-[#F2F0E8]/90">{SITE_META.institution}</span>
              </div>
              <div>
                <span className="block font-mono text-[#999B96] uppercase tracking-wider mb-1">
                  Focus Intersection
                </span>
                <span className="text-[#F2F0E8]/90">
                  Electronics · AI · IoT · Web Development
                </span>
              </div>
            </div>
          </div>

          {/* Right Architectural Visual & Circuit System Container */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full min-h-[340px] lg:min-h-[480px] bg-[#191B19] border border-[#F2F0E8]/12 rounded-sm overflow-hidden">
              {!imageError ? (
                <img
                  src={SITE_META.heroImage}
                  alt="Macro architectural study of matte obsidian silicon microchip and precision circuit traces"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  style={{
                    transform: prefersReducedMotion
                      ? undefined
                      : `scale(1.03) translate3d(${pointerOffset.x * 0.4}px, ${pointerOffset.y * 0.4}px, 0)`,
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#191B19] text-center">
                  <span className="font-mono text-xs text-[#C6F36B] uppercase tracking-widest mb-2">
                    Circuit Architecture Study
                  </span>
                  <p className="text-sm text-[#999B96] max-w-xs">
                    Interconnected hardware pathways and digital node topology.
                  </p>
                </div>
              )}

              {/* Subtle Measured Scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#101110]/85 via-[#101110]/15 to-transparent pointer-events-none"
              />

              {/* Delicate Interactive SVG Circuit Node Overlay */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-65"
              >
                <g
                  stroke="#C6F36B"
                  strokeWidth="0.75"
                  fill="none"
                  style={{
                    transform: prefersReducedMotion
                      ? undefined
                      : `translate3d(${pointerOffset.x * -0.35}px, ${pointerOffset.y * -0.35}px, 0)`,
                    transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <path d="M 48 72 L 136 72 L 168 104 L 260 104" strokeOpacity="0.45" />
                  <path d="M 110 218 L 194 218 L 228 184 L 336 184" strokeOpacity="0.35" />
                  <path d="M 260 104 L 260 154 L 228 184" strokeOpacity="0.3" />
                  <circle cx="48" cy="72" r="3" fill="#C6F36B" fillOpacity="0.8" />
                  <circle cx="260" cy="104" r="3.5" fill="#101110" stroke="#C6F36B" />
                  <circle cx="228" cy="184" r="3.5" fill="#101110" stroke="#C6F36B" />
                  <circle cx="336" cy="184" r="2.5" fill="#F2F0E8" fillOpacity="0.8" />
                </g>
              </svg>

              {/* Editorial Plate Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <span className="block font-mono text-[11px] text-[#C6F36B] tracking-wider uppercase">
                    Study 00 — Signal &amp; Logic
                  </span>
                  <span className="text-xs text-[#F2F0E8]/85">
                    Hardware architecture meets computational design
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#999B96] tabular-nums shrink-0">
                  12.97° N · 77.59° E
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Strip */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-5 sm:px-8 pt-4">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#about');
          }}
          className="inline-flex items-center gap-3 text-xs font-mono text-[#999B96] hover:text-[#C6F36B] transition-colors group"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 border border-[#F2F0E8]/15 rounded-sm group-hover:border-[#C6F36B]/60 transition-colors">
            <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
          <span>Scroll to explore</span>
        </a>
      </div>
    </section>
  );
}
