import { FormEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, LINKEDIN_URL, WHATSAPP_LABEL, WHATSAPP_URL } from '../data';
import { useInkReveal } from './motion/useInkReveal';
import { LineReveal, Reveal, SectionLabel } from './ui/primitives';

const AREAS = ['Diagnóstico de procesos', 'Automatización / agentes de IA', 'Software a medida / tableros', 'Otro'];

const CHANNELS = [
  { label: 'WhatsApp', value: WHATSAPP_LABEL, href: WHATSAPP_URL, external: true },
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, external: false },
  { label: 'LinkedIn', value: 'in/juanignacioluquez', href: LINKEDIN_URL, external: true },
  { label: 'Instagram', value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL, external: true },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', area: AREAS[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'error' | 'sent'>('idle');
  const sectionRef = useRef<HTMLElement>(null);
  const clipPath = useInkReveal(sectionRef);

  // Sin backend: arma el mensaje y lo abre en WhatsApp, listo para enviar.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus('error');
      return;
    }
    const text = [
      `Hola Juan, soy ${form.name.trim()}${form.company.trim() ? ` (${form.company.trim()})` : ''}.`,
      `Tema: ${form.area}`,
      '',
      form.message.trim(),
    ].join('\n');
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setStatus('sent');
    setForm({ name: '', company: '', area: AREAS[0], message: '' });
  };

  const field =
    'w-full border border-linea-oscura bg-tinta-2 px-4 py-3.5 text-[15px] text-papel placeholder:text-grafito-claro transition-colors focus:border-papel focus:outline-none';

  return (
    <motion.section ref={sectionRef} id="contacto" className="grano relative overflow-hidden bg-tinta text-papel" style={{ clipPath }}>
      <div className="grilla-plano-oscura pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-[2] mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="06" title="Contacto" tone="tinta" />
          </div>
          <div className="min-w-0">
            <h2 className="display text-[clamp(2.6rem,6.8vw,6rem)]">
              <LineReveal
                lines={['¿Qué proceso de', 'tu empresa debería', <span className="text-senal">funcionar solo?</span>]}
              />
            </h2>
            <Reveal className="mt-8 max-w-[56ch] text-lg leading-relaxed text-papel/80" delay={0.1}>
              Contame cómo funciona hoy: quién carga qué, dónde se traba y qué te gustaría ver. La primera charla es para
              entender el proceso, no para venderte una herramienta.
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
              {/* Canales directos */}
              <Reveal>
                <p className="rotulo mb-3 text-grafito-claro">Canales directos</p>
                <ul className="border-t border-linea-oscura">
                  {CHANNELS.map((c) => (
                    <li key={c.label} className="border-b border-linea-oscura">
                      <a
                        href={c.href}
                        target={c.external ? '_blank' : undefined}
                        rel={c.external ? 'noopener noreferrer' : undefined}
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span>
                          <span className="rotulo block text-[10px] text-grafito-claro">{c.label}</span>
                          <span className="mt-1 block text-[17px] transition-colors group-hover:text-senal">{c.value}</span>
                        </span>
                        <span aria-hidden className="text-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="rotulo mt-5 text-grafito-claro">San Miguel de Tucumán · remoto en Argentina y LATAM</p>
              </Reveal>

              {/* Formulario */}
              <Reveal delay={0.1}>
                <form onSubmit={onSubmit} className="relative border border-linea-oscura p-5 sm:p-7" noValidate>
                  <p className="rotulo mb-5 flex justify-between text-grafito-claro">
                    <span>Mensaje · se abre en WhatsApp</span>
                    <span>FORM. 01</span>
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="rotulo mb-2 block text-[10px] text-grafito-claro">Nombre *</span>
                      <input
                        className={field}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre"
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="rotulo mb-2 block text-[10px] text-grafito-claro">Empresa</span>
                      <input
                        className={field}
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Opcional"
                        autoComplete="organization"
                      />
                    </label>
                  </div>

                  <fieldset className="mt-5">
                    <legend className="rotulo mb-2 block text-[10px] text-grafito-claro">Tema</legend>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => setForm({ ...form, area: a })}
                          aria-pressed={form.area === a}
                          className={`border px-3 py-2 text-[13px] transition-colors ${
                            form.area === a ? 'border-senal bg-senal text-tinta' : 'border-linea-oscura text-papel/80 hover:border-papel'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <label className="mt-5 block">
                    <span className="rotulo mb-2 block text-[10px] text-grafito-claro">¿Qué proceso querés mejorar? *</span>
                    <textarea
                      className={`${field} min-h-[140px] resize-y leading-relaxed`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ej.: los partes de producción se cargan a mano en una planilla al final del día y siempre llegan tarde."
                      required
                    />
                  </label>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className={`rotulo text-[10px] ${status === 'error' ? 'text-senal' : 'text-grafito-claro'}`} role={status === 'error' ? 'alert' : undefined}>
                      {status === 'error' ? 'Completá tu nombre y el proceso.' : '* Obligatorios'}
                    </p>
                    <button
                      type="submit"
                      className="group rotulo inline-flex items-center justify-center gap-3 bg-senal px-6 py-4 text-tinta transition-colors hover:bg-papel"
                    >
                      Enviar por WhatsApp
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {status === 'sent' && (
                      <motion.div
                        className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-4 bg-tinta p-7"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <span className="rotulo text-grafito-claro">Listo</span>
                        <p className="titular max-w-[18ch] text-3xl">Se abrió WhatsApp con tu mensaje redactado.</p>
                        <p className="text-papel/75">Solo falta que lo envíes. Respondo dentro de las 24 horas hábiles.</p>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="rotulo mt-2 border border-papel px-4 py-2.5 hover:bg-papel hover:text-tinta"
                        >
                          Escribir otro mensaje
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
