import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, ChevronUp, ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../data/portfolioData';

function BlueprintSchematic({ slotNumber }: { slotNumber: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 360"
      className="w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`grid-${slotNumber}`}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="rgba(242, 240, 232, 0.06)"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>
      <rect width="640" height="360" fill="#141614" />
      <rect width="640" height="360" fill={`url(#grid-${slotNumber})`} />

      {slotNumber === '01' && (
        <g stroke="#C6F36B" strokeOpacity="0.45" strokeWidth="1" fill="none">
          <rect x="140" y="84" width="360" height="192" strokeDasharray="4 4" />
          <circle cx="320" cy="180" r="56" />
          <circle cx="320" cy="180" r="22" stroke="#F2F0E8" strokeOpacity="0.4" />
          <line x1="80" y1="180" x2="264" y2="180" />
          <line x1="376" y1="180" x2="560" y2="180" />
          <line x1="320" y1="36" x2="320" y2="124" />
          <line x1="320" y1="236" x2="320" y2="324" />
        </g>
      )}

      {slotNumber === '02' && (
        <g stroke="#C6F36B" strokeOpacity="0.45" strokeWidth="1" fill="none">
          <path d="M 100 220 Q 180 100, 260 180 T 420 140 T 540 200" />
          <path
            d="M 100 240 Q 180 140, 260 200 T 420 165 T 540 220"
            stroke="#F2F0E8"
            strokeOpacity="0.25"
          />
          <circle cx="180" cy="150" r="4" fill="#C6F36B" />
          <circle cx="340" cy="160" r="4" fill="#C6F36B" />
          <circle cx="480" cy="172" r="4" fill="#F2F0E8" />
        </g>
      )}

      {slotNumber === '03' && (
        <g stroke="#C6F36B" strokeOpacity="0.45" strokeWidth="1" fill="none">
          <rect x="110" y="72" width="180" height="216" />
          <rect x="330" y="72" width="200" height="96" stroke="#F2F0E8" strokeOpacity="0.35" />
          <rect x="330" y="192" width="200" height="96" />
          <line x1="290" y1="120" x2="330" y2="120" />
          <line x1="290" y1="240" x2="330" y2="240" />
        </g>
      )}
    </svg>
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggleExpand,
}: {
  project: ProjectItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [imgFailed, setImgFailed] = useState(false);

  const isPlaceholder = project.status === 'placeholder';
  const spanClasses =
    project.layoutSpan === 'featured'
      ? 'lg:col-span-7'
      : project.layoutSpan === 'compact'
        ? 'lg:col-span-5'
        : 'lg:col-span-12';

  const mediaHeightClass =
    project.layoutSpan === 'wide'
      ? 'aspect-[16/7] sm:aspect-[21/8]'
      : project.layoutSpan === 'featured'
        ? 'aspect-[16/10]'
        : 'aspect-[4/3]';

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`${spanClasses} group bg-[#191B19] border border-[#F2F0E8]/12 hover:border-[#C6F36B]/45 transition-colors duration-200 rounded-sm overflow-hidden flex flex-col`}
    >
      {/* Visual Plate */}
      <div className={`relative w-full ${mediaHeightClass} bg-[#141614] overflow-hidden border-b border-[#F2F0E8]/10`}>
        {project.image && !imgFailed ? (
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="w-full h-full relative">
            <BlueprintSchematic slotNumber={project.slotNumber} />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#C6F36B] mb-2">
                {isPlaceholder ? `Open Slot ${project.slotNumber}` : project.focusArea}
              </span>
              <span className="text-xs text-[#999B96] max-w-xs">
                {isPlaceholder
                  ? 'Placeholder container ready for future documentation and imagery'
                  : project.title}
              </span>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-4 pointer-events-none">
          <span className="font-mono text-xs text-[#F2F0E8]/85 bg-[#101110]/85 px-2.5 py-1 border border-[#F2F0E8]/15 rounded-sm tabular-nums">
            Slot {project.slotNumber}
          </span>
          <span className="font-mono text-[11px] text-[#999B96] bg-[#101110]/85 px-2.5 py-1 border border-[#F2F0E8]/10 rounded-sm">
            {isPlaceholder ? 'Placeholder Template' : 'Published'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-3">
          {/* Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#999B96] font-mono">
            <span>{project.focusArea}</span>
            {project.technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2">
                <span aria-hidden="true">·</span>
                <span>{tech}</span>
              </span>
            ))}
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F2F0E8] tracking-tight group-hover:text-[#C6F36B] transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[#999B96] leading-relaxed max-w-[65ch]">
            {project.description}
          </p>
        </div>

        {/* Actions & Expandable Details Trigger */}
        <div className="pt-5 border-t border-[#F2F0E8]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F2F0E8] hover:text-[#C6F36B] transition-colors"
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Repository</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#999B96]/70">
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                <span>GitHub link pending</span>
              </span>
            )}

            <span className="text-[#F2F0E8]/20" aria-hidden="true">
              /
            </span>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#F2F0E8] hover:text-[#C6F36B] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[#999B96]/70">
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Live demo pending</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#C6F36B] hover:text-[#d5f78e] transition-colors py-1"
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isExpanded ? 'Hide slot structure' : 'Inspect slot structure'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Expandable Slot Specification Drawer */}
        {isExpanded && (
          <div className="pt-4 border-t border-[#F2F0E8]/10 text-xs space-y-3 text-[#999B96]">
            <p className="text-[#F2F0E8]/90 font-medium">
              {isPlaceholder
                ? 'How to populate this slot:'
                : 'Project technical specification:'}
            </p>
            <p className="leading-relaxed">
              {isPlaceholder
                ? `Edit entry "${project.id}" in src/data/portfolioData.ts by changing status to "published" and supplying title, description, technologies, image path, githubUrl, and liveUrl.`
                : `Focused on ${project.focusArea} using ${project.technologies.join(', ')}.`}
            </p>
            {isPlaceholder && (
              <pre className="bg-[#101110] border border-[#F2F0E8]/10 rounded-sm p-3 overflow-x-auto font-mono text-[11px] text-[#F2F0E8]/80">
{`{
  id: '${project.id}',
  status: 'published',
  title: 'Your Project Title',
  technologies: ['C', 'Python', 'React'],
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...'
}`}
              </pre>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="py-24 lg:py-32 bg-[#101110] border-b border-[#F2F0E8]/10"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#F2F0E8]/10 pb-8">
          <div>
            <span className="block font-mono text-xs text-[#C6F36B] tracking-widest uppercase mb-3">
              03. Archive &amp; Showcase
            </span>
            <h2 className="font-display font-semibold text-[#F2F0E8] text-3xl sm:text-4xl lg:text-5xl tracking-[-0.025em] text-balance">
              Things I&apos;ve been exploring.
            </h2>
          </div>

          <p className="text-sm text-[#999B96] max-w-md leading-relaxed">
            This showcase is structured with three open slots ready to document upcoming engineering
            and web builds without fabricating completed work.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {PROJECTS_DATA.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggleExpand={() =>
                setExpandedId((prev) => (prev === project.id ? null : project.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
