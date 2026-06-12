import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import fotoJuan from '../assets/images/foto-juan.jpg';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#F8F8F5] border-t border-neutral-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Retrato */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="overflow-hidden rounded-2xl aspect-[4/5] border border-neutral-200/60 shadow-sm bg-neutral-200">
                <img
                  src={fotoJuan}
                  alt="Juan Ignacio Luquez"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mt-4 text-center lg:text-left">
                Juan Ignacio Luquez · Ing. Industrial · Consultor & Dev
              </p>
            </div>
          </motion.div>

          {/* Texto editorial */}
          <motion.div
            className="lg:col-span-8 space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
          >
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200/50">
                <Globe className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                  SOBRE MÍ // QUIÉN ESTÁ DETRÁS
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-[#1c1c1a]">
                Construir operaciones <br />
                <em className="font-light text-neutral-500">que respiren.</em>
              </h2>
            </div>

            <div className="space-y-5 text-left max-w-2xl">
              <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                Soy Ingeniero Industrial. Trabajo en el cruce entre procesos industriales y
                tecnología: diseño sistemas que combinan metodologías Lean con automatizaciones
                de IA para que las operaciones funcionen de verdad.
              </p>
              <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                Entiendo el piso de fábrica, el taller mecánico, la logística real. Eso cambia
                profundamente lo que construyo y cómo lo construyo — cada flujo nace de observar
                gente resolviendo problemas, no de una pizarra.
              </p>
              <p className="text-base md:text-lg text-neutral-600 font-light leading-relaxed">
                Basado en Tucumán, al pie de las Yungas. Trabajo con empresas de Argentina y
                LATAM que quieren operar más liviano, más claro, más medible.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-[#1c1c1a] pl-6 py-2 text-left">
              <p className="font-serif text-2xl md:text-3xl text-[#1c1c1a] leading-snug">
                No construyo herramientas <em className="text-neutral-500">en el vacío</em> —
                las construyo junto a la gente que las va a usar.
              </p>
              <cite className="block font-mono text-[10px] tracking-widest text-neutral-500 uppercase mt-3 not-italic">
                — Filosofía de trabajo
              </cite>
            </blockquote>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
