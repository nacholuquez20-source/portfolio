import { PROJECTS } from '../data';
import { Project } from '../types';
import ProjectCard, { FeaturedProjectCard } from './ProjectCard';
import { Cota, LineReveal, Reveal, SectionLabel } from './ui/primitives';

export default function Projects({ onSelect }: { onSelect: (p: Project) => void }) {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  const enUso = PROJECTS.filter((p) => p.status.kind === 'live').length;

  return (
    <section id="proyectos" className="relative">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="02" title="Proyectos" />
          </div>
          <div className="min-w-0">
            <h2 className="display max-w-[14ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">
              <LineReveal lines={['Sistemas que', 'ya están en campo.']} />
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              <Reveal className="max-w-[60ch] text-lg leading-relaxed text-tinta/75" delay={0.1}>
                Cada proyecto nació de un proceso concreto: un taller que no veía su estado real, una cadena que detectaba pero no
                corregía, un parte de campo que alguien pasaba a mano. Ninguno empezó por la tecnología.
              </Reveal>
              <Reveal className="rotulo flex gap-6 text-grafito md:justify-end" delay={0.15}>
                <span>
                  <b className="text-tinta">{String(PROJECTS.length).padStart(2, '0')}</b> proyectos
                </span>
                <span>
                  <b className="text-tinta">{String(enUso).padStart(2, '0')}</b> en uso
                </span>
              </Reveal>
            </div>
            <Cota className="mt-10" label="Casos reales · clientes reales" />
          </div>
        </div>

        <div className="mt-14 space-y-6 lg:mt-20">
          {featured.map((p) => (
            <FeaturedProjectCard key={p.id} project={p} onSelect={onSelect} />
          ))}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
