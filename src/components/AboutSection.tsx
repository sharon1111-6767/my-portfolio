import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_PROFILE, SITE_META } from '../data/portfolioData';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-[#101110] border-b border-[#F2F0E8]/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Index & Heading */}
        <div className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F2F0E8]/10 pb-8">
          <div>
            <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
              01. Profile
            </span>
            <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] text-balance">
              {ABOUT_PROFILE.heading}
            </h2>
          </div>
          <p className="text-sm text-[#999B96] max-w-sm">
            Bridging classroom theory in electronics and communication with hands-on software exploration.
          </p>
        </div>

        {/* Asymmetric Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Portrait Editorial Image Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[380px] bg-[#191B19] border border-[#F2F0E8]/10 rounded-sm overflow-hidden">
              {!imageError ? (
                <img
                  src={SITE_META.aboutImage}
                  alt="Minimalist electronics engineering workbench with matte black PCB prototype, brass calipers, and technical grid notebook"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <span className="font-mono text-xs text-[#C6F36B] uppercase tracking-wider mb-2">
                    Engineering Workbench
                  </span>
                  <p className="text-sm text-[#999B96]">
                    Bangalore Institute of Technology · Bengaluru
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#101110]/75 via-transparent to-transparent pointer-events-none"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-center justify-between text-xs text-[#F2F0E8]/85">
                <span>Workbench Study</span>
                <span className="font-mono text-[#999B96]">Bengaluru, IN</span>
              </div>
            </div>
          </motion.div>

          {/* Editorial Prose & Factual Matrix */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-10"
          >
            <div className="space-y-6">
              <p className="font-display text-xl sm:text-2xl text-[#F2F0E8] leading-[1.45] font-medium">
                I believe curiosity is most rewarding when it crosses boundaries—connecting how a
                circuit behaves physically with how intelligent software interprets the world.
              </p>

              <div className="space-y-4 text-[#999B96] text-base leading-[1.7] max-w-[64ch]">
                {ABOUT_PROFILE.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Clean Hairline Specification Rows */}
            <dl className="border-t border-[#F2F0E8]/10 divide-y divide-[#F2F0E8]/10">
              {ABOUT_PROFILE.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-[#999B96] shrink-0">
                    {fact.label}
                  </dt>
                  <dd className="text-sm sm:text-base text-[#F2F0E8] sm:text-right font-medium">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
