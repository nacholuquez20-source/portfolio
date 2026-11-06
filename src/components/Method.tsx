import { useRef } from 'react';
import { motion } from 'motion/react';
import { THESIS } from '../data';
import Obra from './motion/Obra';
import { useInkReveal } from './motion/useInkReveal';
import { Counter, LineReveal, Reveal, SectionLabel } from './ui/primitives';

export default function Method() {
  const ref = useRef<HTMLElement>(null);
  const clipPath = useInkReveal(ref);

  return (
    // overflow-clip (y no hidden) para que el plano pueda quedar fijo mientras se recorre
    <motion.section ref={ref} id="metodo" className="grano relative overflow-clip bg-tinta text-papel" style={{ clipPath }}>
      <div className="grilla-plano-oscura pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-[2] mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="01" title="Método" tone="tinta" />
          </div>

          <div className="min-w-0">
            <h2 className="display max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.6rem)]">
              <LineReveal lines={['Primero el proceso.', <span className="text-grafito-claro">Después la IA.</span>]} />
            </h2>
            <Reveal className="mt-8 max-w-[62ch] text-lg leading-relaxed text-papel/80" delay={0.1}>
              La mayoría de las automatizaciones fallan antes de escribir código: se automatiza un proceso que nadie midió. Trabajo
              con el método de la ingeniería industrial. Mido el proceso, encuentro el cuello de botella, lo mejoro y{' '}
              <span className="text-senal">recién después automatizo</span>.
            </Reveal>
            <Reveal className="rotulo mt-10 flex items-center gap-3 text-grafito-claro" delay={0.15}>
              <span className="inline-block h-px w-8 bg-current" />
              Bajá para recorrer las cuatro fases
            </Reveal>
          </div>
        </div>

        {/* La Obra: plano que se transforma con el scroll */}
        <Obra />

        {/* Prueba del método: la tesis */}
        <div className="pb-24 lg:pb-32">
          <Reveal className="border border-linea-oscura">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-linea-oscura px-5 py-3 sm:px-6">
              <span className="rotulo text-grafito-claro">Prueba del método</span>
              <span className="rotulo text-grafito-claro">{THESIS.place}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
              <p className="titular border-b border-linea-oscura p-5 text-2xl sm:p-6 lg:border-b-0 lg:border-r">“{THESIS.title}”</p>
              <dl className="grid grid-cols-1 sm:grid-cols-3">
                {THESIS.facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex flex-col p-5 sm:p-6 ${i > 0 ? 'border-t border-linea-oscura sm:border-l sm:border-t-0' : ''}`}
                  >
                    <dd className={`display order-1 text-5xl ${i === 1 ? 'text-cinabrio' : 'text-papel'}`}>
                      <Counter value={f.value} />
                    </dd>
                    <dt className="rotulo order-2 mt-3 text-grafito-claro">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </motion.section>
  );
}
