import { motion, useReducedMotion } from 'motion/react';

/*
  FIG. 00.1 — Una línea de proceso en régimen: las piezas entran a cada estación,
  se procesan adentro y siguen solas. Una sola estación en amarillo: la que se automatizó.
*/

const EASE = [0.2, 0, 0, 1] as const;
const STATIONS = [44, 136, 228, 320];
const ITEMS = 7;
const DURATION = 8.4;

export default function HeroLine({ play }: { play: boolean }) {
  const reduce = useReducedMotion();

  return (
    <figure className="w-full">
      <svg viewBox="0 0 364 64" className="w-full overflow-visible text-tinta" aria-hidden>
        {/* cota superior */}
        <motion.g
          className="text-grafito-claro"
          initial={{ opacity: 0 }}
          animate={play ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.5 }}
        >
          <line x1={STATIONS[0]} y1="6" x2={STATIONS[0]} y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1={STATIONS[3]} y1="6" x2={STATIONS[3]} y2="14" stroke="currentColor" strokeWidth="1" />
          <line x1={STATIONS[0]} y1="10" x2={STATIONS[3]} y2="10" stroke="currentColor" strokeWidth="1" />
        </motion.g>

        {/* línea */}
        <motion.line
          x1="0"
          y1="40"
          x2="364"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
        />

        {/* piezas en circulación */}
        {!reduce &&
          Array.from({ length: ITEMS }).map((_, i) => (
            <motion.rect
              key={i}
              x="-6"
              y="37"
              width="6"
              height="6"
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              style={{ animation: `hero-flujo ${DURATION}s linear ${-(i * DURATION) / ITEMS}s infinite` }}
            />
          ))}

        {/* estaciones (tapan la pieza mientras la procesan) */}
        {STATIONS.map((x, i) => (
          <motion.rect
            key={x}
            x={x - 9}
            y="31"
            width="18"
            height="18"
            className={i === 2 ? 'fill-senal' : 'fill-papel'}
            stroke="currentColor"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.3, delay: 1.0 + i * 0.12, ease: EASE }}
          />
        ))}
      </svg>
      <figcaption className="rotulo mt-3 flex items-center justify-between text-grafito">
        <span>FIG. 00.1 · Proceso en régimen</span>
        <span className="flex items-center gap-2 text-tinta">
          <span className="inline-block h-2 w-2 animate-pulse bg-senal ring-1 ring-tinta/30" />
          En marcha
        </span>
      </figcaption>
    </figure>
  );
}
