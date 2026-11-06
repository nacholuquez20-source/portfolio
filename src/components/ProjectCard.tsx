import { motion } from 'motion/react';
import { Project } from '../types';
import ProjectVisual from './visuals/ProjectVisual';
import { Arrow, Corners, Counter, StatusTag } from './ui/primitives';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const toneClasses = (tone: Project['tone']) =>
  tone === 'tinta'
    ? { box: 'bg-tinta text-papel grano', muted: 'text-grafito-claro', border: 'border-linea-oscura', grid: 'grilla-plano-oscura' }
    : { box: 'bg-hoja text-tinta', muted: 'text-grafito', border: 'border-white/80', grid: 'grilla-plano' };

export function FeaturedProjectCard({ project, onSelect }: ProjectCardProps) {
  const t = toneClasses(project.tone);
  return (
    <motion.article
      className={`group encuadre relative overflow-hidden border ${t.border} ${t.box}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="relative z-[2] grid w-full grid-cols-1 text-left lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
        aria-label={`Ver el caso ${project.title}`}
      >
        <div className={`flex flex-col gap-6 border-b p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 ${t.border}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`rotulo ${t.muted}`}>
              {project.fig} · {project.sector}
            </span>
            <StatusTag label={project.status.label} kind={project.status.kind} tone={project.tone} />
          </div>

          <div>
            <h3 className="display text-[clamp(3rem,6vw,5.2rem)]">{project.title}</h3>
            <p className={`rotulo mt-3 ${t.muted}`}>
              {project.client}
              {project.previously && <> · antes {project.previously}</>}
            </p>
          </div>

          <p className="titular max-w-[26ch] text-2xl">{project.tagline}</p>
          <p className={`max-w-[52ch] text-[15px] leading-relaxed ${project.tone === 'tinta' ? 'text-papel/75' : 'text-tinta/75'}`}>
            {project.problem}
          </p>

          <dl className={`mt-auto grid grid-cols-1 gap-3 border-t pt-5 sm:grid-cols-3 sm:gap-0 ${t.border}`}>
            {project.results.slice(0, 3).map((r) => (
              <div key={r.label} className="flex items-baseline gap-4 sm:flex-col sm:items-start sm:gap-0 sm:pr-3">
                <dd className="display order-1 w-20 shrink-0 text-4xl sm:w-auto">
                  <Counter value={r.value} />
                </dd>
                <dt className={`rotulo order-2 text-[10px] leading-snug sm:mt-2 ${t.muted}`}>{r.label}</dt>
              </div>
            ))}
          </dl>

          <span className="rotulo inline-flex items-center gap-2">
            Ver el caso completo <Arrow className="group-hover:translate-x-1.5" />
          </span>
        </div>

        <div className={`relative flex items-center justify-center overflow-hidden px-5 py-12 sm:px-10 lg:py-14 ${t.grid}`}>
          <HoverCotas label={`${project.fig} · Esc. 1:1`} muted={t.muted} />
          <div className="w-full max-w-[560px] transition-transform duration-500 ease-[var(--ease-plano)] group-hover:-translate-y-1.5">
            <ProjectVisual id={project.visual} tone={project.tone} />
          </div>
        </div>
      </button>
      <Corners />
    </motion.article>
  );
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const t = toneClasses(project.tone);
  return (
    <motion.article
      className={`group encuadre relative h-full overflow-hidden border ${t.border} ${t.box}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="relative z-[2] flex h-full w-full flex-col text-left"
        aria-label={`Ver el caso ${project.title}`}
      >
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`rotulo ${t.muted}`}>{project.fig}</span>
            <StatusTag label={project.status.label} kind={project.status.kind} tone={project.tone} />
          </div>
          <div>
            <h3 className="display text-5xl sm:text-6xl">{project.title}</h3>
            <p className={`rotulo mt-2 ${t.muted}`}>
              {project.client} · {project.sector}
            </p>
          </div>
          <p className="titular max-w-[30ch] text-xl">{project.tagline}</p>
        </div>

        <div className={`relative flex flex-1 items-center justify-center border-y px-5 py-10 ${t.border} ${t.grid}`}>
          <HoverCotas label={`${project.fig} · Esc. 1:1`} muted={t.muted} />
          <div className="w-full max-w-[340px] transition-transform duration-500 ease-[var(--ease-plano)] group-hover:-translate-y-1.5">
            <ProjectVisual id={project.visual} tone={project.tone} compact />
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 p-6 sm:px-8">
          {project.results[0] ? (
            <div className="flex items-baseline gap-3">
              <span className="display text-3xl">
                <Counter value={project.results[0].value} />
              </span>
              <span className={`rotulo max-w-[22ch] text-[10px] leading-snug ${t.muted}`}>{project.results[0].label}</span>
            </div>
          ) : (
            <span className={`rotulo ${t.muted}`}>{project.sector}</span>
          )}
          <span className="rotulo inline-flex shrink-0 items-center gap-2">
            Ver caso <Arrow className="group-hover:translate-x-1.5" />
          </span>
        </div>
      </button>
      <Corners />
    </motion.article>
  );
}

/** Cotas de plano que se dibujan alrededor del mockup al pasar el mouse. */
function HoverCotas({ label, muted }: { label: string; muted: string }) {
  const line = 'block bg-current transition-transform duration-500 ease-[var(--ease-plano)]';
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 z-[1] hidden md:block ${muted}`}>
      {/* horizontal */}
      <span className="absolute inset-x-6 top-4 flex items-center gap-2">
        <span className={`${line} h-2.5 w-px scale-y-0 group-hover:scale-y-100`} />
        <span className={`${line} h-px flex-1 origin-left scale-x-0 group-hover:scale-x-100`} />
        <span className="rotulo text-[9px] opacity-0 transition-opacity delay-200 duration-300 group-hover:opacity-100">{label}</span>
        <span className={`${line} h-px flex-1 origin-right scale-x-0 group-hover:scale-x-100`} />
        <span className={`${line} h-2.5 w-px scale-y-0 group-hover:scale-y-100`} />
      </span>
      {/* vertical */}
      <span className="absolute inset-y-10 left-4 flex flex-col items-center">
        <span className={`${line} h-px w-2.5 scale-x-0 group-hover:scale-x-100`} />
        <span className={`${line} w-px flex-1 origin-top scale-y-0 delay-100 group-hover:scale-y-100`} />
        <span className={`${line} h-px w-2.5 scale-x-0 group-hover:scale-x-100`} />
      </span>
    </span>
  );
}
