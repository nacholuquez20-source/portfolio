import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useInkReveal } from './motion/useInkReveal';
import { conOcultos, LineReveal, Reveal, SectionLabel } from './ui/primitives';

/*
  Demo del patrón que comparten casi todos los sistemas:
  la gente trabaja en el canal que ya usa → la IA interpreta → el sistema valida → se registra y se ve.
  Los datos son de ejemplo.
*/

type Msg = {
  side: 'in' | 'out';
  kind: 'text' | 'audio' | 'photo';
  text?: string;
  seconds?: string;
  chips?: string[];
  card?: { label: string; lines: string[] };
};

type Step = {
  stage: string;
  detail: string;
  quote?: string;
  messages?: Msg[];
  fields?: Record<string, string>;
  status?: string;
};

type Scenario = {
  id: string;
  tab: string;
  project: string;
  channel: { title: string; subtitle: string };
  output: string;
  fieldOrder: string[];
  steps: Step[];
};

const SCENARIOS: Scenario[] = [
  {
    id: 'taller',
    tab: 'Taller · ingreso por audio',
    project: 'TallerHub',
    channel: { title: 'TallerHub', subtitle: 'Asesora de servicio' },
    output: 'Orden de trabajo',
    fieldOrder: ['Cliente', 'Patente', 'Modelo', 'Trabajo', 'Estado'],
    steps: [
      {
        stage: 'Mensaje',
        detail: 'La asesora dicta el ingreso mientras recibe el auto.',
        messages: [{ side: 'out', kind: 'audio', seconds: '0:14' }],
      },
      {
        stage: 'Transcripción',
        detail: 'El audio se convierte en texto.',
        quote: '“Recibí al cliente Ferreyra, patente [[AB 123 CD]], una [[SUV compacta]], viene por el service de los 40 mil.”',
      },
      {
        stage: 'Extracción',
        detail: 'La IA devuelve los datos estructurados.',
        fields: { Cliente: 'Ferreyra', Patente: '[[AB 123 CD]]', Modelo: '[[SUV compacta]]', Trabajo: 'Service 40.000 km' },
      },
      {
        stage: 'Validación',
        detail: 'Reglas del negocio: formato de patente y modelo dentro de los aprobados.',
        status: 'Datos validados',
      },
      {
        stage: 'Confirmación',
        detail: 'Nada se carga sin un sí de la asesora.',
        messages: [
          {
            side: 'in',
            kind: 'text',
            card: { label: '¿Registro el ingreso?', lines: ['Ferreyra · [[AB 123 CD]]', '[[SUV compacta]] · Service 40.000 km'] },
            chips: ['Sí', 'No'],
          },
          { side: 'out', kind: 'text', text: 'Sí' },
        ],
      },
      {
        stage: 'Registro',
        detail: 'Orden creada en el tablero y aviso al área que sigue.',
        fields: { Estado: 'Ingresado · OR 4826' },
        messages: [{ side: 'in', kind: 'text', text: '✓ Ingreso registrado. OR 4826 ya está en el tablero.' }],
        status: 'Registrado',
      },
    ],
  },
  {
    id: 'farmacia',
    tab: 'Farmacia · pendiente con foto',
    project: 'Circuito',
    channel: { title: 'Circuito', subtitle: 'Referente · Sucursal Centro' },
    output: 'Pendiente de la visita',
    fieldOrder: ['Sucursal', 'Tipo', 'Producto', 'Acción', 'Evidencia', 'Estado'],
    steps: [
      {
        stage: 'Aviso',
        detail: 'La sucursal recibe el pendiente sin tener que escribir “hola”.',
        messages: [
          {
            side: 'in',
            kind: 'text',
            card: { label: 'Vencido · perfumería', lines: ['Protector solar FPS 50', 'Vence 01/2027 → exhibir en punta'] },
            chips: ['Mando foto', 'No puedo'],
          },
        ],
        fields: { Sucursal: 'Centro', Tipo: 'Vencido', Producto: 'Protector solar FPS 50', Acción: 'Exhibir en punta' },
      },
      {
        stage: 'Respuesta',
        detail: 'El referente resuelve con una foto, desde el mostrador.',
        messages: [{ side: 'out', kind: 'photo', text: 'Listo, ya está en la punta.' }],
      },
      {
        stage: 'Evidencia',
        detail: 'Las fotos mandadas en ráfaga se agrupan en el mismo pendiente.',
        fields: { Evidencia: '1 foto' },
      },
      {
        stage: 'Por aprobar',
        detail: 'Resuelto no es cerrado: el cierre es del auditor.',
        fields: { Estado: 'Por aprobar' },
        messages: [{ side: 'in', kind: 'text', text: '✓ Recibido. Queda por aprobar.' }],
      },
      {
        stage: 'Verificación',
        detail: 'El auditor compara antes y después y aprueba.',
        fields: { Estado: 'Aprobado' },
        status: 'Cerrado',
      },
      {
        stage: 'Resumen',
        detail: 'El lunes, el dueño ve lo resuelto y la plata con acción.',
        status: 'En el resumen del lunes',
      },
    ],
  },
  {
    id: 'campo',
    tab: 'Campo · parte diario',
    project: 'AudiCampo',
    channel: { title: 'Partes de campo', subtitle: 'Capataz · finca norte' },
    output: 'Fila de la planilla',
    fieldOrder: ['Capataz', 'Lote', 'Sección', 'Tarea', 'Cantidad', 'Trabajador', 'Contratista'],
    steps: [
      {
        stage: 'Audio',
        detail: 'El capataz dicta el parte al terminar la tarea.',
        messages: [{ side: 'out', kind: 'audio', seconds: '0:12' }],
      },
      {
        stage: 'Interpretación',
        detail: 'Un modelo multimodal escucha el audio y devuelve solo datos.',
        quote: '“Lote veinte, sección tres, fertilización, veinticinco hectáreas, Ramón Díaz, cuadrilla propia.”',
        fields: { Lote: '20', Sección: '3', Tarea: 'Fertilización', Cantidad: '25 ha', Trabajador: 'R. Díaz', Contratista: 'Propio' },
      },
      {
        stage: 'Validación',
        detail: 'Contra los catálogos: el capataz se identifica por su teléfono.',
        fields: { Capataz: 'L. Gómez' },
        status: 'Validado contra catálogos',
      },
      {
        stage: 'Confirmación',
        detail: 'Ningún parte se guarda sin CONFIRMAR.',
        messages: [
          { side: 'in', kind: 'text', card: { label: 'Parte del día', lines: ['Lote 20 · Sec. 3 · Fertilización', '25 ha · R. Díaz · Propio'] }, text: 'Respondé CONFIRMAR para guardarlo.' },
          { side: 'out', kind: 'text', text: 'CONFIRMAR' },
        ],
      },
      {
        stage: 'Registro',
        detail: 'Una fila con exactamente 10 columnas en la planilla.',
        messages: [{ side: 'in', kind: 'text', text: '✓ Guardado en la planilla.' }],
        status: 'Guardado · fila 214',
      },
    ],
  },
];

const STEP_MS = 1900;
const LOOP_PAUSE_MS = 3600;

export default function LiveFlow() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const clipPath = useInkReveal(sectionRef);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-120px' });
  const scenario = SCENARIOS[scenarioIdx];
  const last = scenario.steps.length - 1;

  useEffect(() => {
    if (!playing || !inView) return;
    const t = setTimeout(
      () => setStep((s) => (s >= last ? 0 : s + 1)),
      step >= last ? LOOP_PAUSE_MS : step === 0 ? STEP_MS * 0.8 : STEP_MS,
    );
    return () => clearTimeout(t);
  }, [playing, inView, step, last]);

  const selectScenario = (i: number) => {
    setScenarioIdx(i);
    setStep(0);
    setPlaying(true);
  };

  const messages = useMemo(() => scenario.steps.slice(0, step + 1).flatMap((s) => s.messages ?? []), [scenario, step]);
  const fields = useMemo(
    () => scenario.steps.slice(0, step + 1).reduce<Record<string, string>>((acc, s) => ({ ...acc, ...(s.fields ?? {}) }), {}),
    [scenario, step],
  );
  const status = useMemo(() => {
    const done = scenario.steps.slice(0, step + 1).filter((s) => s.status);
    return done.length ? done[done.length - 1].status : undefined;
  }, [scenario, step]);
  const quote = scenario.steps.slice(0, step + 1).reverse().find((s) => s.quote)?.quote;

  return (
    <motion.section ref={sectionRef} id="como-funciona" className="grano relative overflow-hidden bg-tinta text-papel" style={{ clipPath }}>
      <div className="grilla-plano-oscura pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-[2] mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="03" title="Cómo funciona" tone="tinta" />
          </div>
          <div className="min-w-0">
            <h2 className="display text-[clamp(2.6rem,6.4vw,5.6rem)]">
              <LineReveal lines={['Del mensaje al dato.']} />
            </h2>
            <Reveal className="mt-8 max-w-[62ch] text-lg leading-relaxed text-papel/80" delay={0.1}>
              Casi todos mis sistemas siguen el mismo patrón. La gente trabaja en el canal que ya usa, la IA interpreta lo que
              manda y el sistema <span className="text-senal">valida, registra y muestra</span>. Elegí un caso y miralo funcionar.
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="mt-14 overflow-hidden rounded-[30px] border border-linea-oscura bg-tinta-2 lg:mt-16">
          {/* Selector de caso */}
          <div className="flex flex-col border-b border-linea-oscura sm:flex-row" role="tablist" aria-label="Casos de ejemplo">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === scenarioIdx}
                onClick={() => selectScenario(i)}
                className={`rotulo relative flex-1 border-linea-oscura px-4 py-4 text-left transition-colors sm:border-r sm:last:border-r-0 ${
                  i === scenarioIdx ? 'bg-tinta-2 text-papel' : 'text-grafito-claro hover:text-papel'
                } ${i > 0 ? 'border-t sm:border-t-0' : ''}`}
              >
                <span className="block text-[10px] text-grafito-claro">{s.project}</span>
                {s.tab}
                {i === scenarioIdx && (
                  <motion.span layoutId="tab-flujo" className="absolute inset-x-0 bottom-0 h-[2px] bg-senal" transition={{ duration: 0.35 }} />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* 1 · Canal */}
            <Column num="1" title="Canal" note="WhatsApp">
              <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[22px] border border-linea-oscura bg-tinta-2">
                <div className="flex items-center gap-2.5 border-b border-linea-oscura px-3.5 py-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-papel text-[11px] font-bold text-tinta">
                    {scenario.channel.title.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold">{scenario.channel.title}</p>
                    <p className="rotulo text-[9px] text-grafito-claro">{scenario.channel.subtitle}</p>
                  </div>
                </div>
                <div className="flex h-[340px] flex-col justify-end gap-2 overflow-hidden p-3 [mask-image:linear-gradient(to_bottom,transparent,black_16%)]">
                  <AnimatePresence initial={false} mode="popLayout">
                    {messages.map((m, i) => (
                      <motion.div
                        key={`${scenario.id}-${i}`}
                        layout
                        className={`flex ${m.side === 'out' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                      >
                        <Message m={m} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Column>

            {/* 2 · Sistema */}
            <Column num="2" title="Sistema" note="IA + reglas">
              <ol className="space-y-1">
                {scenario.steps.map((s, i) => {
                  const state = i < step ? 'done' : i === step ? 'active' : 'todo';
                  return (
                    <li key={`${scenario.id}-${s.stage}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setStep(i);
                          setPlaying(false);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors ${
                          state === 'active' ? 'bg-tinta-2' : 'hover:bg-tinta-2/60'
                        }`}
                      >
                        <span
                          className={`mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border text-[8px] ${
                            state === 'done'
                              ? 'border-papel bg-papel text-tinta'
                              : state === 'active'
                                ? 'border-senal bg-senal'
                                : 'border-linea-oscura'
                          }`}
                          aria-hidden
                        >
                          {state === 'done' ? '✓' : ''}
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[15px] font-semibold ${state === 'todo' ? 'text-grafito-claro' : 'text-papel'}`}>
                            <span className="rotulo mr-2 text-[10px] text-grafito-claro">{String(i + 1).padStart(2, '0')}</span>
                            {s.stage}
                          </span>
                          {state === 'active' && (
                            <motion.span
                              className="block pt-1 text-[13px] leading-snug text-papel/70"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {s.detail}
                            </motion.span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <AnimatePresence mode="wait">
                {quote && (
                  <motion.p
                    key={quote}
                    className="mt-4 border-l-2 border-senal pl-3 font-mono text-[12px] leading-relaxed text-papel/75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {conOcultos(quote)}
                  </motion.p>
                )}
              </AnimatePresence>
            </Column>

            {/* 3 · Registro */}
            <Column num="3" title="Registro" note="Tablero" last>
              <div className="overflow-hidden rounded-[22px] border border-linea-oscura bg-papel text-tinta">
                <div className="flex items-center justify-between border-b border-linea px-3.5 py-2.5">
                  <span className="rotulo text-[10px] text-grafito">{scenario.output}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={status ?? 'pendiente'}
                      className={`rotulo rounded-full px-2 py-0.5 text-[9px] ${status ? 'bg-senal text-tinta' : 'text-grafito'}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                    >
                      {status ?? 'Esperando datos'}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <dl className="divide-y divide-linea">
                  {scenario.fieldOrder.map((k) => (
                    <div key={`${scenario.id}-${k}`} className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-3 px-3.5 py-2.5">
                      <dt className="rotulo text-[10px] text-grafito">{k}</dt>
                      <dd className="min-h-[20px] text-[14px] font-medium">
                        <AnimatePresence mode="wait">
                          {fields[k] ? (
                            <motion.span
                              key={fields[k]}
                              className="block"
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {conOcultos(fields[k])}
                            </motion.span>
                          ) : (
                            <span className="block h-[6px] w-16 rounded-full bg-linea" />
                          )}
                        </AnimatePresence>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Column>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-linea-oscura px-4 py-3 sm:px-6">
            <div className="flex items-center gap-1.5" aria-hidden>
              {scenario.steps.map((_, i) => (
                <span key={i} className={`h-[3px] transition-all duration-300 ${i <= step ? 'w-6 bg-papel' : 'w-3 bg-linea-oscura'}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setPlaying(true);
                }}
                className="rotulo border border-linea-oscura px-3 py-2 text-grafito-claro transition-colors hover:text-papel"
              >
                ↺ Reiniciar
              </button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="rotulo border border-papel px-3 py-2 text-papel transition-colors hover:bg-papel hover:text-tinta"
                aria-pressed={!playing}
              >
                {playing ? '❚❚ Pausa' : '▶ Reproducir'}
              </button>
            </div>
          </div>
        </div>
        <p className="rotulo mt-4 text-grafito-claro">Datos de ejemplo. Recreación del flujo real de cada sistema.</p>
      </div>
    </motion.section>
  );
}

function Column({
  num,
  title,
  note,
  children,
  last = false,
}: {
  num: string;
  title: string;
  note: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-5 border-linea-oscura p-4 sm:p-6 ${last ? '' : 'border-b lg:border-b-0 lg:border-r'}`}>
      <div className="flex items-baseline justify-between">
        <span className="rotulo text-papel">
          <span className="text-grafito-claro">{num} · </span>
          {title}
        </span>
        <span className="rotulo text-[10px] text-grafito-claro">{note}</span>
      </div>
      {children}
    </div>
  );
}

function Message({ m }: { m: Msg }) {
  const out = m.side === 'out';
  return (
    <div className={`max-w-[88%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${out ? 'bg-papel text-tinta' : 'bg-tinta-3 text-papel'}`}>
      {m.kind === 'audio' && (
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tinta text-[8px] text-papel">▶</span>
          <span className="flex h-4 items-center gap-[2px]">
            {[4, 9, 6, 12, 7, 14, 9, 5, 11, 7, 13, 6, 9, 4, 8, 12].map((h, i) => (
              <span key={i} className="block w-[2px] bg-current" style={{ height: h, animation: `onda 1.4s ${i * 0.07}s ease-in-out infinite` }} />
            ))}
          </span>
          <span className="rotulo text-[9px] opacity-70">{m.seconds}</span>
        </span>
      )}
      {m.kind === 'photo' && <span className="grilla-plano-oscura mb-1.5 block aspect-[4/3] w-36 rounded-xl bg-tinta-3" aria-label="Foto" />}
      {m.card && (
        <span className="block">
          <span className="rotulo block text-[9px] opacity-70">{m.card.label}</span>
          {m.card.lines.map((l) => (
            <span key={l} className="block font-medium">
              {conOcultos(l)}
            </span>
          ))}
        </span>
      )}
      {m.text && <span className={`block ${m.card ? 'mt-1' : ''}`}>{m.text}</span>}
      {m.chips && (
        <span className="mt-2 flex gap-1.5">
          {m.chips.map((c) => (
            <span key={c} className="rotulo border border-current px-2 py-1 text-[9px]">
              {c}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}
