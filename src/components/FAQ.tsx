import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<string | null>('faq1');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-[#F8F8F5] border-t border-neutral-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - Heading Sticky */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200/50">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
              RESPUESTAS // CONSULTAS COMUNES
            </span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-[#1c1c1a]">
            Preguntas <br />Frecuentes
          </h2>

          <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-sm">
            Sobre cómo trabajo: el cruce entre procesos industriales, automatizaciones con IA y software que la gente realmente usa.
          </p>
        </div>

        {/* Right Column - Accordion Items */}
        <div className="lg:col-span-7 flex flex-col border-t border-neutral-200">
          {FAQS.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-neutral-200 py-6 text-left cursor-pointer transition-colors hover:bg-neutral-50/40 px-2"
                onClick={() => toggleExpand(faq.id)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-neutral-900 leading-tight">
                    {faq.question}
                  </h3>
                  <button
                    className="p-1 rounded-full border border-neutral-200 hover:bg-white text-neutral-600 focus:outline-none shrink-0"
                    id={`toggle-faq-${faq.id}`}
                    aria-label="Toggle answer visibility"
                  >
                    {isExpanded ? (
                      <Minus className="w-4 h-4 transition-transform duration-300 rotate-185" />
                    ) : (
                      <Plus className="w-4 h-4 transition-transform" />
                    )}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        marginTop: 16,
                        transition: { duration: 0.35, ease: 'easeOut' },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        marginTop: 0,
                        transition: { duration: 0.25, ease: 'easeIn' },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light">
                        {faq.answer}
                      </p>
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
