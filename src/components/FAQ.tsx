import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQS } from '../data';
import { LineReveal } from './ui/primitives';

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(FAQS[0].id);

  return (
    <section id="preguntas" className="relative border-t border-linea bg-papel">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[200px_minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:px-10 lg:py-32">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1.5">
            <span className="rotulo text-grafito">05.2</span>
            <span className="text-sm font-bold uppercase tracking-[0.08em]">Preguntas</span>
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="display text-[clamp(2.4rem,5vw,4.2rem)]">
            <LineReveal lines={['Lo que suelen', 'preguntarme.']} />
          </h2>
          <p className="mt-6 max-w-[40ch] text-[16px] leading-relaxed text-tinta-2">
            Sobre cómo trabajo, cuánto cambia el día a día de tu equipo y dónde entra la inteligencia artificial.
          </p>
        </div>

        <div className="border-t border-tinta">
          {FAQS.map((f, i) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="border-b border-linea">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    className="group flex w-full items-start gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${f.id}`}
                  >
                    <span className="rotulo pt-1.5 text-grafito">{String(i + 1).padStart(2, '0')}</span>
                    <span className="titular flex-1 text-xl sm:text-2xl">{f.question}</span>
                    <span className="relative mt-2 h-3 w-3 shrink-0" aria-hidden>
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-tinta" />
                      <motion.span
                        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-tinta"
                        animate={{ scaleY: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${f.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-6 pl-9 text-[16px] leading-relaxed text-tinta-2">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
