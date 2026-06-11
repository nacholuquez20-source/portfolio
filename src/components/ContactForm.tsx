import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { EMAIL, WHATSAPP_URL } from '../data';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    category: 'Diagnóstico & Procesos',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const categories = [
    { label: 'Diagnóstico & Auditoría Operativa', value: 'Diagnóstico & Procesos' },
    { label: 'Automatización con IA', value: 'Automatización IA' },
    { label: 'SaaS / Software a Medida', value: 'SaaS a Medida' },
    { label: 'Otro / Consulta General', value: 'Otro' },
  ];

  // El envío abre WhatsApp con la propuesta ya redactada: sin backend, sin fricción.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    const text = [
      `Hola Juan, soy ${form.name}${form.company ? ` (${form.company})` : ''}.`,
      '',
      `Área: ${form.category}`,
      `Email de contacto: ${form.email}`,
      '',
      form.message,
    ].join('\n');

    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');

    setStatus('success');
    setForm({
      name: '',
      email: '',
      company: '',
      message: '',
      category: 'Diagnóstico & Procesos',
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#F1F1ED] border-t border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column - Contact Intro */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-neutral-200/55">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest text-[#1c1c1a] uppercase font-semibold">
              CONTÁCTANOS EN VIVO // INCIAR UN PROYECTO
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-[#1c1c1a]">
            ¿Tenés un proceso que <br /><em className="font-light">debería</em> funcionar mejor?
          </h2>

          <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-light max-w-sm">
            Ya sea un cuello de botella en tu operación, reportes que alguien carga a mano todos los días, o un software a medida que tu equipo realmente use — hablemos.
          </p>

          <div className="pt-6 space-y-3 font-mono text-xs text-neutral-500">
            <div>
              <p className="uppercase text-neutral-400 font-semibold mb-0.5">Localización</p>
              <p className="text-[#1c1c1a]">Tucumán, AR — Remoto en Argentina & LATAM</p>
            </div>
            <div>
              <p className="uppercase text-neutral-400 font-semibold mb-0.5">Canal Directo</p>
              <a
                href={`mailto:${EMAIL}`}
                className="text-[#1c1c1a] hover:underline flex items-center gap-1 font-medium"
              >
                {EMAIL} <ArrowUpRight className="w-3.5 h-3.5 inline" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1c1c1a] hover:underline flex items-center gap-1 font-medium mt-1"
              >
                WhatsApp directo <ArrowUpRight className="w-3.5 h-3.5 inline" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Premium Form */}
        <div className="lg:col-span-7 bg-[#F8F8F5] p-8 md:p-12 rounded-2xl border border-neutral-200/60 shadow-sm relative">
          
          <AnimatePresence mode="wait">
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-[#F8F8F5] z-10 rounded-2xl flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 stroke-1.2" />
                <h3 className="font-serif text-3xl font-medium text-neutral-900 mb-2">
                  Mensaje listo en WhatsApp
                </h3>
                <p className="text-sm text-neutral-500 max-w-sm font-light leading-relaxed mb-6">
                  Se abrió WhatsApp con tu mensaje ya redactado — solo falta que lo envíes. Respondo dentro de las 24 horas hábiles.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="bg-[#1c1c1a] text-[#F8F8F5] py-2.5 px-6 rounded-full text-xs font-mono hover:bg-neutral-800 transition"
                  id="send-another-btn"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-semibold">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre aquí"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F1F1ED] border border-neutral-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1c1c1a] text-sm font-light text-[#1c1c1a] transition"
                  id="form-name-input"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-semibold">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F1F1ED] border border-neutral-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1c1c1a] text-sm font-light text-[#1c1c1a] transition"
                  id="form-email-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-semibold">
                  Organización / Empresa
                </label>
                <input
                  type="text"
                  placeholder="Opcional"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-[#F1F1ED] border border-neutral-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1c1c1a] text-sm font-light text-[#1c1c1a] transition"
                  id="form-company-input"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-semibold">
                  Área del Proyecto
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#F1F1ED] border border-neutral-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1c1c1a] text-sm font-light text-[#1c1c1a] transition cursor-pointer appearance-none"
                  id="form-category-select"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase font-semibold">
                Detalles del Requerimiento *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Describe el reto técnico, los plazos teóricos y los resultados esperados..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#F1F1ED] border border-neutral-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1c1c1a] text-sm font-light text-[#1c1c1a] transition leading-relaxed resize-none"
                id="form-message-area"
              />
            </div>

            {/* Submit & Error Feedback */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              {status === 'error' ? (
                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2.5 rounded-xl border border-rose-100 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Por favor, rellena los campos marcados con *.
                </div>
              ) : (
                <div className="text-xs text-neutral-400 font-mono">
                  * Campos requeridos para validar propuesta.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto bg-[#1c1c1a] text-[#F8F8F5] text-xs font-mono py-4 px-8 rounded-full hover:bg-neutral-800 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer shadow disabled:opacity-50"
                id="submit-contact-form-btn"
              >
                {status === 'submitting' ? 'Abriendo WhatsApp...' : 'Enviar por WhatsApp'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
