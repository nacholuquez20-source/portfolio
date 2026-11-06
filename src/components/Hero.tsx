import { PointerEvent, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import { HERO_FACTS, PORTRAIT, WHATSAPP_URL } from '../data';
import HeroLine from './motion/HeroLine';
import { Corners, Counter, LineReveal, Senal } from './ui/primitives';

const FICHA =
  'Ingeniero industrial dedicado al desarrollo, la digitalización y la mejora de procesos. Acompaño a empresas en su transición hacia la digitalización y la inteligencia artificial.';

const SECTORES = [
  'Posventa automotriz',
  'Retail farmacéutico',
  'Agro',
  'Trade marketing',
  'Construcción',
  'Calidad ISO 9001',
  'Capacitación interna',
  'Mejora continua',
];

export default function Hero({ ready }: { ready: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  // Retícula que sigue al puntero sobre la foto, con lectura de coordenadas como en un plano
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cx.set(x);
    cy.set(y);
    setCoords({ x: Math.round((x / r.width) * 2912), y: Math.round((y / r.height) * 1248) });
  };

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="grilla-plano pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        {/* Rótulo de lámina */}
        <motion.div
          className="rotulo flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-linea pb-3 text-grafito"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span>FIG. 00 — Portada</span>
          <span className="hidden md:inline">San Miguel de Tucumán · 26°49′S 65°13′O</span>
          <span className="flex items-center gap-2 text-tinta">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping bg-senal opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-senal ring-1 ring-tinta/30" />
            </span>
            Disponible para proyectos
          </span>
        </motion.div>

        <div className="pt-10 lg:pt-14">
          <motion.p
            className="rotulo mb-6 text-grafito"
            initial={{ opacity: 0, y: 8 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Juan Ignacio Luquez · Ingeniero industrial
          </motion.p>
          <h1 className="display text-[clamp(2.75rem,7.2vw,6.6rem)]">
            <LineReveal
              play={ready}
              delay={0.2}
              lines={[
                'Transformo procesos',
                'manuales en sistemas',
                <>
                  que <Senal play={ready} delay={0.6}>funcionan solos.</Senal>
                </>,
              ]}
            />
          </h1>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-8 border-t border-linea pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.2, 0, 0, 1] }}
        >
          <div className="lg:col-span-7">
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-tinta-2 sm:text-lg">
              Soy ingeniero industrial y desarrollo soluciones digitales para la{' '}
              <strong className="font-semibold text-tinta">transformación digital de empresas</strong>: automatización de
              procesos, agentes de IA por WhatsApp, integraciones con los sistemas que ya usan y tableros para decidir con datos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#proyectos"
                className="group rotulo inline-flex items-center gap-3 bg-tinta px-6 py-4 text-papel transition-colors hover:bg-tinta-3"
              >
                Ver proyectos
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group rotulo inline-flex items-center gap-3 border border-tinta px-6 py-4 text-tinta transition-colors hover:bg-tinta hover:text-papel"
              >
                Contame tu proceso
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 lg:col-span-4 lg:col-start-9">
            <p className="titular text-3xl">
              Primero el proceso.
              <span className="block text-grafito">Después la IA.</span>
            </p>
            <HeroLine play={ready} />
          </div>
        </motion.div>

        {/* Foto con encuadre de plano */}
        <motion.div
          className="mt-14 lg:mt-20"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="rotulo mb-2 flex justify-between text-grafito">
            <span>FIG. 01 — J. I. Luquez</span>
            <span className="tabular-nums">{coords ? `X ${String(coords.x).padStart(4, '0')} · Y ${String(coords.y).padStart(4, '0')}` : '2912 × 1248 px'}</span>
          </div>
          <div
            ref={frameRef}
            className="encuadre grano relative aspect-[4/3] cursor-crosshair overflow-hidden bg-tinta text-tinta sm:aspect-[16/8] lg:aspect-[21/9]"
            onPointerMove={onMove}
            onPointerLeave={() => setCoords(null)}
          >
            <motion.img
              src={PORTRAIT}
              alt="Juan Ignacio Luquez sentado junto a un ventanal"
              className="absolute inset-x-0 top-[-6%] h-[112%] w-full object-cover object-[64%_center]"
              style={{ y: imgY }}
              // El filtro animado incluye el blanco y negro: un filtro en línea reemplaza al de las clases
              initial={{ opacity: 0, filter: 'grayscale(1) contrast(1.05) brightness(1.9) blur(12px)' }}
              animate={ready ? { opacity: 1, filter: 'grayscale(1) contrast(1.05) brightness(1) blur(0px)' } : undefined}
              transition={{ duration: 2.2, delay: 0.5, ease: [0.2, 0, 0, 1] }}
              fetchPriority="high"
            />
            {/* Halo cálido: entra fuerte con la foto y queda como un susurro */}
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{ background: 'radial-gradient(55% 75% at 66% 38%, rgb(255 214 160 / 0.55), transparent 70%)' }}
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: [0, 1, 0.22] } : undefined}
              transition={{ duration: 3, delay: 0.5, times: [0, 0.25, 1], ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tinta/50 via-transparent to-transparent" />
            {coords && (
              <>
                <motion.span className="pointer-events-none absolute inset-y-0 z-[2] w-px bg-papel/50" style={{ x: cx }} />
                <motion.span className="pointer-events-none absolute inset-x-0 z-[2] h-px bg-papel/50" style={{ y: cy }} />
              </>
            )}
            <div className="absolute bottom-6 left-6 z-[2] hidden max-w-xs text-papel sm:block">
              <p className="rotulo text-grafito-claro">Ficha</p>
              <p className="mt-1 text-sm leading-snug">{FICHA}</p>
            </div>
            <Corners />
          </div>
          <div className="border-x border-b border-linea bg-hoja p-4 sm:hidden">
            <p className="rotulo text-grafito">Ficha</p>
            <p className="mt-1 text-[15px] leading-snug text-tinta-2">{FICHA}</p>
          </div>
        </motion.div>

        {/* Datos duros */}
        <dl className="mt-px grid grid-cols-2 gap-px border border-linea bg-linea lg:grid-cols-4">
          {HERO_FACTS.map((f) => (
            <div key={f.label} className="flex flex-col bg-papel p-5 sm:p-6">
              <dt className="rotulo order-2 mt-2 block text-grafito">{f.label}</dt>
              <dd className="display order-1 text-5xl sm:text-6xl">
                <Counter value={f.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Cinta de rubros */}
      <div className="mt-16 overflow-hidden border-y border-linea py-4" aria-label="Rubros en los que trabajé">
        <div className="cinta flex w-max gap-10 whitespace-nowrap">
          {[...SECTORES, ...SECTORES].map((s, i) => (
            <span key={i} className="rotulo flex items-center gap-10 text-grafito" aria-hidden={i >= SECTORES.length}>
              {s}
              <span className="text-grafito-claro">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
