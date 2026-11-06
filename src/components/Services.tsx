import { NOT_DOING, SERVICES } from '../data';
import { LineReveal, Reveal, SectionLabel } from './ui/primitives';

export default function Services() {
  return (
    <section id="servicios" className="relative">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="04" title="Servicios" />
          </div>
          <div className="min-w-0">
            <h2 className="display max-w-[15ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">
              <LineReveal lines={['Del diagnóstico', 'al sistema andando.']} />
            </h2>
            <Reveal className="mt-8 max-w-[60ch] text-lg leading-relaxed text-tinta/75" delay={0.1}>
              Podés contratar el diagnóstico solo, o el camino completo: entender el proceso, construir la herramienta y
              acompañar hasta que el equipo la use sin pensarlo.
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.08} className="group flex flex-col gap-5 bg-hoja p-6 sm:p-7">
                  <div className="flex items-baseline justify-between">
                    <span className="rotulo text-grafito">{s.num}</span>
                    <span className="block h-2.5 w-2.5 rounded-full border border-musgo transition-colors duration-300 group-hover:bg-senal" aria-hidden />
                  </div>
                  <h3 className="titular text-[28px]">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-tinta/75">{s.body}</p>
                  <ul className="mt-auto space-y-2 border-t border-linea pt-5">
                    {s.items.map((it) => (
                      <li key={it} className="rotulo flex items-start gap-2.5 text-tinta">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-tinta" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 flex flex-wrap items-center gap-2" delay={0.1}>
              <span className="rotulo mr-2 text-grafito">Lo que no hago</span>
              {NOT_DOING.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-linea bg-hoja px-3 py-1 text-sm text-grafito line-through decoration-grafito-claro"
                >
                  {n}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
