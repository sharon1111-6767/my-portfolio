import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AREAS_OF_INTEREST, InterestArea } from '../data/portfolioData';

function InterestSchematicOverlay({ type }: { type: InterestArea['visualType'] }) {
  if (type === 'electronics') {
    return (
      <svg aria-hidden="true" viewBox="0 0 600 340" className="w-full h-full">
        <g stroke="#C6F36B" strokeWidth="1.1" fill="none" strokeOpacity="0.65">
          <path d="M 40 170 L 120 170 L 145 110 L 175 230 L 205 90 L 235 245 L 265 135 L 295 190 L 325 170 L 560 170" />
          <line x1="40" y1="85" x2="560" y2="85" stroke="#F2F0E8" strokeOpacity="0.14" strokeDasharray="3 5" />
          <line x1="40" y1="255" x2="560" y2="255" stroke="#F2F0E8" strokeOpacity="0.14" strokeDasharray="3 5" />
        </g>
      </svg>
    );
  }

  if (type === 'ai') {
    return (
      <svg aria-hidden="true" viewBox="0 0 600 340" className="w-full h-full">
        <g stroke="#C6F36B" strokeWidth="0.9" fill="none" strokeOpacity="0.5">
          <line x1="150" y1="90" x2="300" y2="70" />
          <line x1="150" y1="90" x2="300" y2="170" />
          <line x1="150" y1="170" x2="300" y2="70" />
          <line x1="150" y1="170" x2="300" y2="270" />
          <line x1="150" y1="250" x2="300" y2="170" />
          <line x1="150" y1="250" x2="300" y2="270" />
          <line x1="300" y1="70" x2="450" y2="130" />
          <line x1="300" y1="170" x2="450" y2="130" />
          <line x1="300" y1="170" x2="450" y2="210" />
          <line x1="300" y1="270" x2="450" y2="210" />
          <circle cx="150" cy="90" r="5" fill="#101110" />
          <circle cx="150" cy="170" r="5" fill="#101110" />
          <circle cx="150" cy="250" r="5" fill="#101110" />
          <circle cx="300" cy="70" r="6" fill="#C6F36B" />
          <circle cx="300" cy="170" r="6" fill="#101110" />
          <circle cx="300" cy="270" r="6" fill="#101110" />
          <circle cx="450" cy="130" r="6" fill="#F2F0E8" />
          <circle cx="450" cy="210" r="6" fill="#C6F36B" />
        </g>
      </svg>
    );
  }

  if (type === 'iot') {
    return (
      <svg aria-hidden="true" viewBox="0 0 600 340" className="w-full h-full">
        <g stroke="#C6F36B" strokeWidth="1" fill="none" strokeOpacity="0.55">
          <circle cx="300" cy="170" r="36" />
          <circle cx="300" cy="170" r="78" strokeDasharray="4 4" strokeOpacity="0.35" />
          <circle cx="300" cy="170" r="122" stroke="#F2F0E8" strokeOpacity="0.18" />
          <line x1="300" y1="134" x2="300" y2="48" />
          <line x1="336" y1="170" x2="440" y2="170" />
          <line x1="274" y1="196" x2="176" y2="262" />
          <circle cx="300" cy="48" r="5" fill="#C6F36B" />
          <circle cx="440" cy="170" r="5" fill="#F2F0E8" />
          <circle cx="176" cy="262" r="5" fill="#C6F36B" />
        </g>
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 600 340" className="w-full h-full">
      <g stroke="#C6F36B" strokeWidth="1" fill="none" strokeOpacity="0.5">
        <rect x="88" y="54" width="424" height="232" stroke="#F2F0E8" strokeOpacity="0.25" />
        <line x1="88" y1="96" x2="512" y2="96" stroke="#F2F0E8" strokeOpacity="0.25" />
        <rect x="112" y="120" width="180" height="142" />
        <rect x="312" y="120" width="176" height="62" stroke="#F2F0E8" strokeOpacity="0.3" />
        <rect x="312" y="200" width="176" height="62" />
      </g>
    </svg>
  );
}

export function AreasOfInterestSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeArea = AREAS_OF_INTEREST[activeIndex];

  return (
    <section
      id="interests"
      className="py-24 lg:py-32 bg-[#191B19] border-b border-[#F2F0E8]/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#F2F0E8]/10 pb-8">
          <div>
            <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
              04. Domains of Curiosity
            </span>
            <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] text-balance">
              Areas of interest.
            </h2>
          </div>
          <p className="text-sm text-[#999B96] max-w-md leading-relaxed">
            Four interconnected fields that shape how I study hardware, intelligence, connectivity,
            and digital interfaces.
          </p>
        </div>

        {/* Interactive Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Index Selector List */}
          <div className="lg:col-span-5 flex flex-col border-t border-[#F2F0E8]/10">
            {AREAS_OF_INTEREST.map((area, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={area.index}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  aria-pressed={isActive}
                  className={`w-full text-left py-6 px-4 border-b border-[#F2F0E8]/10 transition-colors duration-200 flex items-start gap-5 ${
                    isActive
                      ? 'bg-[#101110] text-[#F2F0E8]'
                      : 'bg-transparent text-[#999B96] hover:bg-[#101110]/50 hover:text-[#F2F0E8]'
                  }`}
                >
                  <span
                    className={`font-mono text-sm tabular-nums pt-1 transition-colors ${
                      isActive ? 'text-[#C6F36B]' : 'text-[#999B96]'
                    }`}
                  >
                    {area.index}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#999B96] leading-relaxed">
                      {area.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dedicated Visual Experience Stage */}
          <div className="lg:col-span-7 flex">
            <motion.div
              key={activeArea.index}
              initial={prefersReducedMotion ? false : { opacity: 0.4, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-[#101110] border border-[#F2F0E8]/12 rounded-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] bg-[#101110] overflow-hidden border-b border-[#F2F0E8]/10">
                {activeArea.image && !failedImages[activeArea.index] ? (
                  <img
                    src={activeArea.image}
                    alt={`${activeArea.title} visual plate`}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [activeArea.index]: true }))
                    }
                    className="w-full h-full object-cover opacity-75"
                  />
                ) : null}

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#101110] via-[#101110]/35 to-transparent"
                />

                <div className="absolute inset-0 pointer-events-none">
                  <InterestSchematicOverlay type={activeArea.visualType} />
                </div>

                <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C6F36B] tabular-nums">
                    {activeArea.index} — {activeArea.title}
                  </span>
                  <span className="text-[#999B96]">Focus Study</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-display text-2xl font-semibold text-[#F2F0E8]">
                    {activeArea.title}
                  </h4>
                  <p className="text-sm sm:text-base text-[#999B96] leading-[1.7] max-w-[60ch]">
                    {activeArea.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2F0E8]/10 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-[#F2F0E8]/80">
                  <span className="text-[#999B96] uppercase tracking-wider">Key Themes:</span>
                  {activeArea.explorations.map((topic, index) => (
                    <span key={topic} className="inline-flex items-center gap-3">
                      {index > 0 && (
                        <span className="text-[#C6F36B]" aria-hidden="true">
                          ·
                        </span>
                      )}
                      <span>{topic}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
