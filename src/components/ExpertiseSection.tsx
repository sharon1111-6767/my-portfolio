import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SKILLS_DATA, SkillEntry } from '../data/portfolioData';

export function ExpertiseSection() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedSkill, setSelectedSkill] = useState<{
    categoryLabel: string;
    skill: SkillEntry;
  }>({
    categoryLabel: SKILLS_DATA[0].label,
    skill: SKILLS_DATA[0].items[0],
  });

  return (
    <section
      id="expertise"
      className="py-24 lg:py-32 bg-[#191B19] border-b border-[#F2F0E8]/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#F2F0E8]/10 pb-8">
          <div>
            <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
              02. Technical Expertise
            </span>
            <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] text-balance">
              Tools, languages &amp; <em className="italic font-normal text-[#C6F36B]">disciplines.</em>
            </h2>
          </div>

          {/* Interactive Skill Context Readout */}
          <div
            aria-live="polite"
            className="lg:max-w-md w-full bg-[#101110] border border-[#F2F0E8]/12 rounded-sm p-5"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-mono text-xs text-[#C6F36B] uppercase tracking-wider">
                {selectedSkill.categoryLabel}
              </span>
              <span className="font-mono text-xs text-[#999B96]">
                {selectedSkill.skill.focus}
              </span>
            </div>
            <p className="font-display text-lg font-semibold text-[#F2F0E8] mb-1">
              {selectedSkill.skill.name}
            </p>
            <p className="text-sm text-[#999B96] leading-relaxed">
              {selectedSkill.skill.context}
            </p>
          </div>
        </div>

        {/* 3-Column Editorial Discipline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {SKILLS_DATA.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.45,
                delay: catIdx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-between bg-[#101110] border border-[#F2F0E8]/10 rounded-sm p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[#F2F0E8]/10">
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#C6F36B]">
                    {category.label}
                  </h3>
                  <span className="font-mono text-xs text-[#999B96] tabular-nums">
                    0{category.items.length}
                  </span>
                </div>

                <p className="text-sm text-[#999B96] leading-relaxed mb-6">
                  {category.summary}
                </p>

                <ul className="divide-y divide-[#F2F0E8]/10">
                  {category.items.map((item) => {
                    const isSelected =
                      selectedSkill.skill.name === item.name &&
                      selectedSkill.categoryLabel === category.label;

                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSkill({ categoryLabel: category.label, skill: item })
                          }
                          onMouseEnter={() =>
                            setSelectedSkill({ categoryLabel: category.label, skill: item })
                          }
                          className={`w-full py-3.5 flex items-center justify-between gap-3 text-left transition-colors duration-150 group ${
                            isSelected ? 'text-[#C6F36B]' : 'text-[#F2F0E8] hover:text-[#C6F36B]'
                          }`}
                        >
                          <div>
                            <span className="block font-display text-lg font-medium tracking-tight">
                              {item.name}
                            </span>
                            <span className="block text-xs text-[#999B96] mt-0.5">
                              {item.focus}
                            </span>
                          </div>
                          <ArrowUpRight
                            className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                              isSelected
                                ? 'text-[#C6F36B] translate-x-0.5 -translate-y-0.5'
                                : 'text-[#999B96] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
