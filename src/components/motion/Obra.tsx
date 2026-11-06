import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { METHOD_STEPS } from '../../data';

/*
  La Obra: el método en cuatro fases, contado como un plano que se transforma con el scroll.
  01 Relevar  · el proceso como es: piezas sueltas, recorridos enredados.
  02 Medir    · aparece la línea, las estaciones y el tiempo de cada etapa.
  03 Diseñar  · el cuello de botella se marca en amarillo y se diseña la herramienta justa.
  04 Sostener · la espera baja, las piezas circulan solas y el cambio queda (cinabrio).
*/

const EASE = [0.2, 0, 0, 1] as const;
const LINE_Y = 250;
const STATIONS = [100, 210, 320, 430, 540];
const BAR_H = [46, 70, 150, 58, 36];
const BAR_BASE = 218;

// Cada fase toma el color de su etapa en La Obra: tinta (contorno), papel, señal y cinabrio
const VERB_STYLE = [
  'text-transparent [-webkit-text-stroke:1.5px_var(--color-papel)]',
  'text-papel',
  'text-senal',
  'text-cinabrio',
];

const FIGS = [
  'FIG. 01.A — El proceso como es',
  'FIG. 01.B — Tiempo por etapa',
  'FIG. 01.C — La herramienta justa',
  'FIG. 01.D — En régimen',
];

// Posiciones de cada pieza: suelta (caos), en cola antes del cuello de botella, y en circulación pareja
const CHAOS = [
  [70, 92, 24], [148, 150, -18], [232, 78, 40], [292, 182, -30], [366, 118, 12], [418, 64, -42],
  [478, 168, 28], [548, 96, -14], [596, 210, 36], [128, 318, -26], [392, 340, 18], [520, 330, -36],
];
const QUEUE = [
  [138, 0], [162, 0], [244, 0], [258, 0], [272, 0], [286, 0], [258, -14], [272, -14], [286, -14], [272, -28], [360, 0], [470, 0],
];

export default function Obra() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  const [phase, setPhase] = useState(0);
  const reduce = useReducedMotion();

  useMotionValueEvent(p, 'change', (v) => {
    const next = Math.min(3, Math.max(0, Math.floor(v * 4)));
    setPhase((prev) => (prev === next ? prev : next));
  });

  const step = METHOD_STEPS[phase];

  return (
    <div ref={trackRef} className="relative h-[460vh]">
      {/* Versión accesible: las cuatro fases en orden */}
      <ol className="sr-only">
        {METHOD_STEPS.map((s) => (
          <li key={s.num}>
            {s.num}. {s.verb}: {s.title}. {s.body}
          </li>
        ))}
      </ol>

      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-6 py-20 lg:py-24" aria-hidden>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          {/* Texto de la fase */}
          <div className="order-2 min-h-[220px] lg:order-1 lg:min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <p className="rotulo text-grafito-claro">
                  {step.num} / 04 · {step.title}
                </p>
                <h3 className="display mt-3 text-[clamp(3rem,7vw,6rem)]">
                  <span className={VERB_STYLE[phase]}>{step.verb}</span>
                </h3>
                <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-papel/75 sm:text-base">{step.body}</p>
                <ul className="mt-5 hidden flex-wrap gap-1.5 sm:flex">
                  {step.tools.map((t) => (
                    <li key={t} className="rotulo border border-linea-oscura px-2 py-1 text-[10px] text-grafito-claro">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Plano animado */}
          <div className="order-1 lg:order-2">
            <div className="rotulo mb-2 flex justify-between text-grafito-claro">
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {FIGS[phase]}
                </motion.span>
              </AnimatePresence>
              <span className="hidden sm:inline">Esc. 1:1 · ilustrativo</span>
            </div>
            <div className="relative overflow-hidden rounded-[28px] border border-linea-oscura bg-tinta-2">
              <Plano p={p} reduce={!!reduce} />
            </div>
          </div>
        </div>

        {/* Riel de avance */}
        <div className="grid grid-cols-4 gap-2">
          {METHOD_STEPS.map((s, i) => (
            <Rail key={s.num} p={p} index={i} label={`${s.num} ${s.verb}`} active={phase === i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Rail({ p, index, label, active }: { p: MotionValue<number>; index: number; label: string; active: boolean }) {
  const fill = useTransform(p, [index / 4, (index + 1) / 4], [0, 1]);
  const colors = ['bg-papel', 'bg-papel', 'bg-senal', 'bg-cinabrio'];
  return (
    <div>
      <div className="h-[2px] overflow-hidden rounded-full bg-linea-oscura">
        <motion.div className={`h-full origin-left ${colors[index]}`} style={{ scaleX: fill }} />
      </div>
      <p className={`rotulo mt-2 text-[10px] transition-colors duration-300 ${active ? 'text-papel' : 'text-grafito-claro/60'}`}>{label}</p>
    </div>
  );
}

/* ─────────────── el plano ─────────────── */

function Plano({ p, reduce }: { p: MotionValue<number>; reduce: boolean }) {
  // Fase 1: recorrido enredado y anotaciones sueltas
  const messDraw = useTransform(p, [0.02, 0.2], [0, 1]);
  const messFade = useTransform(p, [0, 0.03, 0.25, 0.31], [0, 0.55, 0.55, 0]);
  const notes = useTransform(p, [0.05, 0.12, 0.25, 0.3], [0, 1, 1, 0]);

  // Fase 2: línea, estaciones, tiempos
  const lineDraw = useTransform(p, [0.27, 0.37], [0, 1]);
  const tLabels = useTransform(p, [0.4, 0.46], [0, 1]);

  // Fase 3: cuello de botella y herramienta
  const neck = useTransform(p, [0.52, 0.56, 0.8, 0.86], [0, 1, 1, 0]);
  const neckCota = useTransform(p, [0.54, 0.61], [0, 1]);
  const neckCotaFade = useTransform(p, [0.54, 0.58, 0.8, 0.86], [0, 1, 1, 0]);
  const neckText = useTransform(p, [0.56, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
  const toolDraw = useTransform(p, [0.58, 0.68], [0, 1]);
  const toolNodes = useTransform(p, [0.6, 0.7], [0, 1]);
  const toolDone = useTransform(p, [0.84, 0.9], [0, 1]);

  // Fase 4: régimen y resultado
  const kpiFrame = useTransform(p, [0.8, 0.84], [0, 1]);
  const kpiDraw = useTransform(p, [0.82, 0.94], [0, 1]);
  const result = useTransform(p, [0.93, 0.97], [0, 1]);
  const flowIn = useTransform(p, [0.86, 0.9], [0, 1]);
  const itemsOut = useTransform(p, reduce ? [0, 1] : [0, 0.05, 0.86, 0.9], reduce ? [1, 1] : [0, 1, 1, 0]);

  return (
    <svg viewBox="0 0 640 400" className="block w-full text-papel">
      {/* retícula fina */}
      <g stroke="currentColor" strokeOpacity="0.05">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50 + 20} y1="0" x2={i * 50 + 20} y2="400" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50 + 25} x2="640" y2={i * 50 + 25} />
        ))}
      </g>

      {/* ── Fase 1 ── */}
      <motion.path
        d="M36 300 C 80 120, 130 360, 178 210 S 250 60, 296 230 S 360 370, 404 190 S 470 40, 520 220 S 600 340, 612 140 M70 160 C 160 60, 230 300, 330 150 S 470 260, 560 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{ pathLength: messDraw, opacity: messFade }}
      />
      <motion.g className="font-mono" fontSize="11" fill="currentColor" style={{ opacity: notes }}>
        <text x="44" y="60" fillOpacity="0.7">planilla_final_v3.xlsx</text>
        <text x="420" y="300" fillOpacity="0.7">audio 0:47 · sin cargar</text>
        <text x="236" y="380" fillOpacity="0.7">¿quién lo pasó?</text>
      </motion.g>

      {/* ── Fase 2: línea y estaciones ── */}
      <motion.line x1="40" y1={LINE_Y} x2="600" y2={LINE_Y} stroke="currentColor" strokeWidth="1.2" style={{ pathLength: lineDraw }} />

      {STATIONS.map((x, i) => (
        <Bar key={`b${x}`} p={p} x={x} h={BAR_H[i]} index={i} neck={neck} />
      ))}

      {/* piezas que se ordenan */}
      <motion.g style={{ opacity: itemsOut }}>
        {CHAOS.map((c, i) => (
          <Item key={i} p={p} chaos={c} queue={QUEUE[i]} index={i} />
        ))}
      </motion.g>

      {/* piezas en circulación continua (fase 4) */}
      {!reduce && (
        <motion.g style={{ opacity: flowIn }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <rect
              key={i}
              x="34"
              y={LINE_Y - 4}
              width="8"
              height="8"
              fill="currentColor"
              style={{ animation: `obra-flujo 7.2s linear ${-(i * 7.2) / 9}s infinite` }}
            />
          ))}
        </motion.g>
      )}

      {STATIONS.map((x, i) => (
        <Station key={`s${x}`} p={p} x={x} index={i} neck={i === 2 ? neck : undefined} />
      ))}

      <motion.g className="font-mono" fontSize="11" fill="currentColor" style={{ opacity: tLabels }}>
        {STATIONS.map((x, i) => (
          <text key={x} x={x} y={LINE_Y + 36} textAnchor="middle" fillOpacity={i === 2 ? 1 : 0.6}>
            t{['₁', '₂', '₃', '₄', '₅'][i]}
          </text>
        ))}
      </motion.g>

      {/* ── Fase 3: cuello de botella ── */}
      <motion.g style={{ opacity: neckCotaFade }}>
        <motion.line x1="352" y1={BAR_BASE - 150} x2="352" y2={BAR_BASE} stroke="#CFC1F0" strokeWidth="1" style={{ pathLength: neckCota }} />
        <line x1="346" y1={BAR_BASE - 150} x2="358" y2={BAR_BASE - 150} stroke="#CFC1F0" strokeWidth="1" />
        <line x1="346" y1={BAR_BASE} x2="358" y2={BAR_BASE} stroke="#CFC1F0" strokeWidth="1" />
      </motion.g>
      <motion.text x="364" y={BAR_BASE - 138} className="font-mono" fontSize="11" fill="#CFC1F0" style={{ opacity: neckText }}>
        CUELLO DE BOTELLA
      </motion.text>

      {/* herramienta justa: canal → IA → reglas, conectada a la estación 3 */}
      <motion.path
        d={`M320 ${LINE_Y + 13} V ${LINE_Y + 58} M232 ${LINE_Y + 82} H 408`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 3"
        style={{ pathLength: toolDraw, opacity: toolNodes }}
      />
      <motion.g style={{ opacity: toolNodes }}>
        {[
          [232, 'CANAL'],
          [320, 'IA'],
          [408, 'REGLAS'],
        ].map(([x, label]) => (
          <g key={label as string}>
            <rect x={(x as number) - 9} y={LINE_Y + 73} width="18" height="18" fill="#1B2128" stroke="currentColor" strokeWidth="1" />
            <motion.rect x={(x as number) - 5} y={LINE_Y + 77} width="10" height="10" fill="#CFC1F0" style={{ opacity: toolDone }} />
            <text x={x as number} y={LINE_Y + 112} textAnchor="middle" className="font-mono" fontSize="10" fill="currentColor" fillOpacity="0.7">
              {label}
            </text>
          </g>
        ))}
      </motion.g>

      {/* ── Fase 4: indicador ── */}
      <motion.g style={{ opacity: kpiFrame }}>
        <text x="470" y="40" className="font-mono" fontSize="10" fill="currentColor" fillOpacity="0.6">
          TIEMPO DE ESPERA
        </text>
        <line x1="470" y1="52" x2="470" y2="122" stroke="currentColor" strokeOpacity="0.4" />
        <line x1="470" y1="122" x2="610" y2="122" stroke="currentColor" strokeOpacity="0.4" />
      </motion.g>
      <motion.polyline
        points="474,60 496,58 518,70 540,88 562,100 584,106 604,108"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ pathLength: kpiDraw, opacity: kpiFrame }}
      />
      <motion.g style={{ opacity: result }}>
        <rect x="600" y="104" width="8" height="8" fill="#F2A7BB" />
        <text x="604" y="142" textAnchor="end" className="font-mono" fontSize="10" fill="#F2A7BB">
          EL CAMBIO QUEDA
        </text>
      </motion.g>
    </svg>
  );
}

function Bar({ p, x, h, index, neck }: { p: MotionValue<number>; x: number; h: number; index: number; neck: MotionValue<number> }) {
  const start = 0.36 + index * 0.018;
  const isNeck = index === 2;
  const scaleY = useTransform(p, isNeck ? [start, start + 0.08, 0.78, 0.86] : [start, start + 0.08], isNeck ? [0, 1, 1, 0.36] : [0, 1]);
  const opacity = useTransform(p, [start - 0.01, start + 0.02], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <motion.rect
        x={x - 7}
        y={BAR_BASE - h}
        width="14"
        height={h}
        fill="currentColor"
        fillOpacity={isNeck ? 0.9 : 0.55}
        style={{ scaleY, originY: 1 }}
      />
      {isNeck && <motion.rect x={x - 7} y={BAR_BASE - h} width="14" height={h} fill="#CFC1F0" style={{ scaleY, originY: 1, opacity: neck }} />}
    </motion.g>
  );
}

function Station({ p, x, index, neck }: { p: MotionValue<number>; x: number; index: number; neck?: MotionValue<number> }) {
  const start = 0.3 + index * 0.016;
  const opacity = useTransform(p, [start, start + 0.03], [0, 1]);
  const scale = useTransform(p, [start, start + 0.03], [0.4, 1]);
  return (
    <motion.g style={{ opacity, scale }}>
      <rect x={x - 13} y={LINE_Y - 13} width="26" height="26" fill="#1B2128" stroke="currentColor" strokeWidth="1.2" />
      {neck && <motion.rect x={x - 13} y={LINE_Y - 13} width="26" height="26" fill="#CFC1F0" style={{ opacity: neck }} />}
    </motion.g>
  );
}

function Item({
  p,
  chaos,
  queue,
  index,
}: {
  p: MotionValue<number>;
  chaos: number[];
  queue: number[];
  index: number;
}) {
  const flowX = 52 + index * 46;
  const s0 = 0.28 + index * 0.006;
  const x = useTransform(p, [0, s0, s0 + 0.12, 0.78, 0.86], [chaos[0], chaos[0], queue[0], queue[0], flowX]);
  const y = useTransform(p, [0, s0, s0 + 0.12, 0.78, 0.86], [chaos[1], chaos[1], LINE_Y + queue[1], LINE_Y + queue[1], LINE_Y]);
  const rotate = useTransform(p, [s0, s0 + 0.12], [chaos[2], 0]);
  return <motion.rect x="-4" y="-4" width="8" height="8" fill="currentColor" style={{ x, y, rotate }} />;
}
