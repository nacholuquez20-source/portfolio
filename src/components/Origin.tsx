import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { LineReveal, Reveal, SectionLabel } from './ui/primitives';
import { useInkReveal } from './motion/useInkReveal';
import Lluvia from './motion/Lluvia';

/*
  Origen del nombre: Yunga Devs nace de la biodiversidad de las yungas tucumanas.
  El dibujo es un plano, no una ilustración: curvas de nivel de la sierra y especies
  como nodos de una red que coexiste.
*/

const EASE = [0.2, 0, 0, 1] as const;
const CX = 330;
const CY = 215;
const LEVELS = 8;

// Curvas de nivel: contornos cerrados y anidados, con ruido suave y determinista
function contour(level: number) {
  const base = 26 + level * 24;
  const pts: [number, number][] = [];
  const n = 48;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const r =
      base *
      (1 +
        0.16 * Math.sin(3 * t + 0.6) +
        0.09 * Math.sin(5 * t + 1.7 + level * 0.15) +
        0.05 * Math.sin(8 * t + level * 0.4));
    pts.push([CX + Math.cos(t) * r * 1.55, CY + Math.sin(t) * r * 0.92]);
  }
  // Catmull-Rom cerrado → curvas Bézier
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}
const CONTOURS = Array.from({ length: LEVELS }, (_, i) => contour(i));

type Kind = 'ave' | 'flora' | 'fauna';
const SPECIES: { name: string; kind: Kind; x: number; y: number; anchor?: 'start' | 'end' }[] = [
  { name: 'Loro alisero', kind: 'ave', x: 214, y: 118 },
  { name: 'Pava de monte', kind: 'ave', x: 470, y: 150, anchor: 'start' },
  { name: 'Aliso del cerro', kind: 'flora', x: 300, y: 178 },
  { name: 'Cedro tucumano', kind: 'flora', x: 152, y: 250 },
  { name: 'Laurel del cerro', kind: 'flora', x: 418, y: 262, anchor: 'start' },
  { name: 'Horco molle', kind: 'flora', x: 520, y: 318, anchor: 'start' },
  { name: 'Corzuela', kind: 'fauna', x: 262, y: 318 },
  { name: 'Puma', kind: 'fauna', x: 372, y: 210, anchor: 'start' },
];
const EDGES: [number, number][] = [
  [0, 2], [2, 7], [7, 1], [2, 3], [3, 6], [6, 4], [4, 7], [4, 5], [1, 5], [0, 3], [6, 2],
];

export default function Origin() {
  const sectionRef = useRef<HTMLElement>(null);
  const clipPath = useInkReveal(sectionRef);
  const figRef = useRef<HTMLDivElement>(null);
  const inView = useInView(figRef, { once: true, margin: '-120px' });

  return (
    <motion.section
      ref={sectionRef}
      id="origen"
      className="grano relative overflow-hidden bg-tinta text-papel"
      style={{ clipPath }}
    >
      <div className="grilla-plano-oscura pointer-events-none absolute inset-0 opacity-50" />
      <Lluvia tone="noche" count={22} />
      <div className="relative z-[2] mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="05.1" title="Origen" tone="tinta" />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-14">
            <div>
              <p className="rotulo text-grafito-claro">Yunga Devs · yungadevs.com.ar</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5.2rem)]">
                <LineReveal lines={['Nace en', 'las yungas.']} />
              </h2>
              <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-papel/80">
                <Reveal as="p" delay={0.05}>
                  Yunga Devs nace inspirada en la biodiversidad de las yungas tucumanas: una selva de montaña que abraza un
                  ecosistema de aves, plantas y animales que <span className="text-senal">coexisten</span> y le dan vida.
                </Reveal>
                <Reveal as="p" delay={0.1}>
                  Ninguna especie funciona sola. El monte se sostiene porque cada parte cumple su función y se conecta con las
                  demás. Así pienso los sistemas que construyo: no como herramientas aisladas, sino como un ecosistema donde
                  WhatsApp, la IA, el sistema de gestión, las planillas y las personas conviven y se potencian.
                </Reveal>
              </div>
              <Reveal className="mt-10 border-l-[3px] border-senal pl-5" delay={0.15}>
                <p className="titular text-2xl sm:text-3xl">Tecnología que convive con la operación, no que la reemplaza.</p>
              </Reveal>
            </div>

            {/* FIG. 09 — curvas de nivel y red de especies */}
            <div ref={figRef}>
              <div className="rotulo mb-2 flex justify-between text-grafito-claro">
                <span>FIG. 09 — Yungas tucumanas · curvas de nivel</span>
                <span className="hidden sm:inline">Esquema · sin escala</span>
              </div>
              <div className="relative overflow-hidden rounded-[28px] border border-linea-oscura bg-tinta-2">
                <svg viewBox="0 0 660 430" className="block w-full text-papel" aria-hidden>
                  {/* curvas de nivel */}
                  {CONTOURS.map((d, i) => (
                    <motion.path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={i % 4 === 3 ? 1.3 : 0.8}
                      strokeOpacity={i % 4 === 3 ? 0.55 : 0.28}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 1.6, delay: 0.1 + (LEVELS - i) * 0.12, ease: EASE }}
                    />
                  ))}
                  {/* cotas de altura sobre las curvas maestras */}
                  <motion.g
                    className="font-mono"
                    fontSize="10"
                    fill="currentColor"
                    fillOpacity="0.55"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    <text x={CX + 312} y={CY + 6} textAnchor="end">
                      500 m
                    </text>
                    <text x={CX + 158} y={CY - 40}>1.100 m</text>
                    <text x={CX - 18} y={CY + 4}>▲ 1.800</text>
                  </motion.g>

                  {/* vínculos entre especies */}
                  {EDGES.map(([a, b], i) => {
                    const A = SPECIES[a];
                    const B = SPECIES[b];
                    return (
                      <motion.line
                        key={`e${i}`}
                        x1={A.x}
                        y1={A.y}
                        x2={B.x}
                        y2={B.y}
                        stroke="currentColor"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                        strokeDasharray="2 3"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 2.0 + i * 0.06 }}
                      />
                    );
                  })}

                  {/* señales que circulan: el ecosistema vivo */}
                  {EDGES.slice(0, 7).map(([a, b], i) => {
                    const A = SPECIES[a];
                    const B = SPECIES[b];
                    return (
                      <motion.rect
                        key={`s${i}`}
                        x={-2.5}
                        y={-2.5}
                        width="5"
                        height="5"
                        fill="#CFC1F0"
                        initial={{ opacity: 0, x: A.x, y: A.y }}
                        animate={
                          inView
                            ? { opacity: [0, 1, 1, 0], x: [A.x, B.x], y: [A.y, B.y] }
                            : { opacity: 0 }
                        }
                        transition={{
                          duration: 2.8,
                          delay: 2.8 + i * 0.7,
                          repeat: Infinity,
                          repeatDelay: 2.2,
                          ease: 'linear',
                          opacity: { duration: 2.8, times: [0, 0.1, 0.9, 1], delay: 2.8 + i * 0.7, repeat: Infinity, repeatDelay: 2.2 },
                        }}
                      />
                    );
                  })}

                  {/* especies */}
                  {SPECIES.map((s, i) => (
                    <motion.g
                      key={s.name}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.35, delay: 1.7 + i * 0.08 }}
                    >
                      <Marker kind={s.kind} x={s.x} y={s.y} />
                      <text
                        x={s.anchor === 'start' ? s.x + 10 : s.x - 10}
                        y={s.y + 3.5}
                        textAnchor={s.anchor ?? 'end'}
                        className="font-mono"
                        fontSize="10.5"
                        fill="currentColor"
                        fillOpacity="0.85"
                      >
                        {s.name.toUpperCase()}
                      </text>
                    </motion.g>
                  ))}

                  {/* leyenda */}
                  <g className="font-mono" fontSize="10" fill="currentColor" fillOpacity="0.6" transform="translate(24 398)">
                    <Marker kind="ave" x={4} y={-3.5} />
                    <text x="14" y="0">AVES</text>
                    <Marker kind="flora" x={70} y={-3.5} />
                    <text x="80" y="0">FLORA</text>
                    <Marker kind="fauna" x={142} y={-3.5} />
                    <text x="152" y="0">FAUNA</text>
                  </g>
                </svg>
              </div>
              <p className="rotulo mt-3 text-grafito-claro">Sierra de San Javier · Tucumán, Argentina</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Marker({ kind, x, y }: { kind: Kind; x: number; y: number }) {
  if (kind === 'ave') return <rect x={x - 4} y={y - 4} width="8" height="8" fill="currentColor" />;
  if (kind === 'flora') return <rect x={x - 4} y={y - 4} width="8" height="8" fill="#1B2128" stroke="currentColor" strokeWidth="1.2" />;
  return (
    <g stroke="currentColor" strokeWidth="1.3">
      <line x1={x - 4} y1={y} x2={x + 4} y2={y} />
      <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
    </g>
  );
}
