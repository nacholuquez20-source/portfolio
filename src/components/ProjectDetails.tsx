import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data';
import ProjectVisual from './visuals/ProjectVisual';
import { Counter, StatusTag } from './ui/primitives';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export default function ProjectDetails({ project, onClose, onNavigate }: ProjectDetailsProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(next);
      if (e.key === 'ArrowLeft') onNavigate(prev);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose, onNavigate, next, prev]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const dark = project.tone === 'tinta';

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="caso-titulo"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-tinta/60 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <motion.div
        ref={scrollRef}
        className="relative h-full w-full max-w-[1080px] overflow-y-auto bg-papel text-tinta shadow-2xl"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
      >
        {/* Barra superior */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-linea bg-papel/95 px-4 py-3 backdrop-blur sm:px-8">
          <span className="rotulo text-grafito">
            {project.fig} · Caso {String(index + 1).padStart(2, '0')} de {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rotulo border border-tinta px-3 py-2 transition-colors hover:bg-tinta hover:text-papel"
          >
            Cerrar ✕
          </button>
        </div>

        {/* Portada del caso */}
        <header className={`${dark ? 'grano bg-tinta text-papel' : 'bg-hoja text-tinta'} relative`}>
          <div className="relative z-[2] grid grid-cols-1 gap-10 px-4 py-10 sm:px-8 sm:py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <StatusTag label={project.status.label} kind={project.status.kind} tone={project.tone} />
                <span className={`rotulo ${dark ? 'text-grafito-claro' : 'text-grafito'}`}>{project.year}</span>
              </div>
              <h2 id="caso-titulo" className="display text-[clamp(3.2rem,8vw,6rem)]">
                {project.title}
              </h2>
              <p className={`rotulo ${dark ? 'text-grafito-claro' : 'text-grafito'}`}>
                {project.client} · {project.sector}
                {project.previously && <> · antes {project.previously}</>}
              </p>
              <p className="titular max-w-[24ch] text-2xl sm:text-3xl">{project.tagline}</p>
            </div>
            <div className={`${dark ? 'grilla-plano-oscura' : 'grilla-plano'} px-2 py-8 sm:px-6`}>
              <ProjectVisual id={project.visual} tone={project.tone} />
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-8">
          <Block num="A" title="El problema">
            <p className="max-w-[64ch] text-lg leading-relaxed text-tinta-2">{project.problem}</p>
          </Block>

          <Block num="B" title="La solución">
            <p className="max-w-[64ch] text-lg leading-relaxed text-tinta-2">{project.solution}</p>
          </Block>

          <Block num="C" title="El flujo">
            <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-y-3">
              {project.flow.map((step, i) => (
                <motion.li
                  key={step}
                  className="flex items-center gap-2 md:gap-0"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.08 }}
                >
                  {i > 0 && (
                    <span className="hidden items-center md:flex" aria-hidden>
                      <span className="block h-px w-6 bg-tinta" />
                      <span className="-ml-1 text-xs">▸</span>
                    </span>
                  )}
                  <span className="flex items-center gap-2 border border-tinta bg-hoja px-3 py-2 text-sm">
                    <span className="rotulo text-[10px] text-grafito">{String(i + 1).padStart(2, '0')}</span>
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>
          </Block>

          <Block num="D" title="Qué hace">
            <ul className="grid grid-cols-1 gap-px border border-linea bg-linea md:grid-cols-2">
              {project.highlights.map((h, i) => (
                <li key={h} className="flex gap-4 bg-papel p-4 text-[15px] leading-relaxed text-tinta-2">
                  <span className="rotulo pt-1 text-grafito">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </li>
              ))}
            </ul>
          </Block>

          {project.results.length > 0 && (
            <Block num="E" title="En números">
              <dl className="grid grid-cols-1 gap-px border border-linea bg-linea sm:grid-cols-3">
                {project.results.map((r) => (
                  <div key={r.label} className="flex flex-col bg-hoja p-5">
                    <dd className="display order-1 text-5xl">
                      <Counter value={r.value} />
                    </dd>
                    <dt className="rotulo order-2 mt-2 text-grafito">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </Block>
          )}

          {project.lesson && (
            <Block num="F" title="Criterio de ingeniería">
              <div className="border-l-[3px] border-senal pl-5">
                <p className="titular text-2xl sm:text-3xl">{project.lesson.title}</p>
                <p className="mt-3 max-w-[64ch] text-[17px] leading-relaxed text-tinta-2">{project.lesson.body}</p>
              </div>
            </Block>
          )}

          {project.stack.length > 0 && (
            <Block num="G" title="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="rotulo border border-linea bg-hoja px-2.5 py-1.5 text-tinta">
                    {s}
                  </li>
                ))}
              </ul>
              {project.extraLink && (
                <a href={project.extraLink.href} className="rotulo mt-5 inline-flex items-center gap-2 text-grafito underline underline-offset-4 hover:text-tinta">
                  {project.extraLink.label} ↗
                </a>
              )}
            </Block>
          )}

          <p className="rotulo border-t border-linea py-5 text-grafito">
            Las pantallas de este caso son una recreación con datos de ejemplo.
          </p>
        </div>

        {/* Cierre: contacto y navegación entre casos */}
        <div className="grano relative bg-tinta text-papel">
          <div className="relative z-[2] px-4 py-10 sm:px-8">
            <p className="titular max-w-[20ch] text-3xl sm:text-4xl">¿Tenés un proceso parecido en tu empresa?</p>
            <a
              href="#contacto"
              onClick={onClose}
              className="rotulo mt-6 inline-flex items-center gap-3 bg-senal px-5 py-3.5 text-tinta"
            >
              Contame cómo funciona hoy →
            </a>
          </div>
          <div className="relative z-[2] grid grid-cols-2 border-t border-linea-oscura">
            <button
              type="button"
              onClick={() => onNavigate(prev)}
              className="group flex flex-col items-start gap-1 border-r border-linea-oscura px-4 py-6 text-left sm:px-8"
            >
              <span className="rotulo text-grafito-claro">← Anterior</span>
              <span className="display text-2xl transition-transform duration-300 group-hover:-translate-x-1 sm:text-3xl">{prev.title}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(next)}
              className="group flex flex-col items-end gap-1 px-4 py-6 text-right sm:px-8"
            >
              <span className="rotulo text-grafito-claro">Siguiente →</span>
              <span className="display text-2xl transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">{next.title}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Block({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-b border-linea py-8 md:grid-cols-[160px_minmax(0,1fr)] md:gap-8 md:py-10">
      <div className="flex items-baseline gap-3 md:flex-col md:gap-1">
        <span className="rotulo text-grafito">{num}</span>
        <h3 className="text-sm font-bold uppercase tracking-[0.08em]">{title}</h3>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
