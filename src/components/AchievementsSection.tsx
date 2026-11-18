import { useState } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import {
  ACHIEVEMENTS_DATA,
  ACHIEVEMENT_CATEGORIES,
  AchievementCategory,
} from '../data/portfolioData';

export function AchievementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AchievementCategory>('all');

  const filtered =
    selectedCategory === 'all'
      ? ACHIEVEMENTS_DATA
      : ACHIEVEMENTS_DATA.filter((item) => item.category === selectedCategory);

  const activeCategoryLabel =
    ACHIEVEMENT_CATEGORIES.find((cat) => cat.id === selectedCategory)?.label || 'All Entries';

  return (
    <section
      id="achievements"
      className="py-24 lg:py-28 bg-[#101110] border-b border-[#F2F0E8]/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#F2F0E8]/10 pb-8">
          <div>
            <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
              05. Record
            </span>
            <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl tracking-[-0.025em]">
              Achievements &amp; Certifications.
            </h2>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="group"
            aria-label="Filter achievements by category"
            className="flex flex-wrap items-center gap-1.5 bg-[#191B19] p-1 border border-[#F2F0E8]/10 rounded-sm"
          >
            {ACHIEVEMENT_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#C6F36B] text-[#101110]'
                      : 'text-[#999B96] hover:text-[#F2F0E8]'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="bg-[#191B19] border border-[#F2F0E8]/12 rounded-sm p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-xs font-mono text-[#999B96]">
                    <span className="text-[#C6F36B] uppercase">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#F2F0E8]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-[#999B96]">{item.issuer}</p>
                  <p className="text-sm text-[#999B96] leading-relaxed">{item.description}</p>
                </div>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#C6F36B] hover:underline"
                  >
                    <span>Verify credential</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-[#191B19] border border-[#F2F0E8]/10 rounded-sm p-8 sm:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="w-10 h-10 shrink-0 rounded-sm bg-[#101110] border border-[#F2F0E8]/12 flex items-center justify-center text-[#C6F36B]">
                <Award className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-lg font-medium text-[#F2F0E8]">
                  No {activeCategoryLabel.toLowerCase()} recorded yet
                </h3>
                <p className="text-sm text-[#999B96] leading-relaxed">
                  This section is intentionally kept free of placeholder credentials. Verified
                  certifications, hackathons, technical competitions, workshops, and academic
                  milestones will appear here as they are earned and added to{' '}
                  <code className="font-mono text-xs text-[#F2F0E8]/85">ACHIEVEMENTS_DATA</code>.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#999B96] whitespace-nowrap shrink-0">
              Archive initialized · 0 entries
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
