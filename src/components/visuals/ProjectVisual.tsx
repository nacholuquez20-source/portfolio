import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { VisualId } from '../../types';
import { Oculto } from '../ui/primitives';

/*
  Mockups propios de cada sistema, dibujados con la paleta de la marca.
  Todos los datos son de ejemplo: no se muestran clientes, patentes ni personas reales.
*/

type Tone = 'papel' | 'tinta';

export default function ProjectVisual({ id, tone, compact = false }: { id: VisualId; tone: Tone; compact?: boolean }) {
  switch (id) {
    case 'tallerhub':
      return <TallerHubVisual tone={tone} compact={compact} />;
    case 'circuito':
      return <CircuitoVisual tone={tone} compact={compact} />;
    case 'aula':
      return <AulaVisual tone={tone} />;
    case 'audicampo':
      return <AudiCampoVisual tone={tone} />;
    case 'bioglosse':
      return <BioglosseVisual tone={tone} />;
    case 'obras':
      return <ObrasVisual tone={tone} />;
  }
}

/* ───────────────────────── piezas comunes ───────────────────────── */

function palette(tone: Tone) {
  return tone === 'tinta'
    ? {
        surface: 'bg-tinta-2',
        surface2: 'bg-tinta-3',
        border: 'border-linea-oscura',
        text: 'text-papel',
        muted: 'text-grafito-claro',
        bubbleIn: 'bg-tinta-3 text-papel',
        bubbleOut: 'bg-papel text-tinta',
      }
    : {
        surface: 'bg-hoja',
        surface2: 'bg-papel',
        border: 'border-linea',
        text: 'text-tinta',
        muted: 'text-grafito',
        bubbleIn: 'bg-papel text-tinta',
        bubbleOut: 'bg-tinta text-papel',
      };
}

function Phone({ tone, title, subtitle, children }: { tone: Tone; title: string; subtitle: string; children: ReactNode }) {
  const p = palette(tone);
  return (
    <div className={`mx-auto w-full max-w-[290px] overflow-hidden rounded-[22px] border ${p.border} ${p.surface} shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]`}>
      <div className={`flex items-center gap-2.5 border-b ${p.border} px-3.5 py-2.5`}>
        <span className={`flex h-7 w-7 items-center justify-center rounded-full ${tone === 'tinta' ? 'bg-papel text-tinta' : 'bg-tinta text-papel'} text-[11px] font-bold`}>
          {title.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className={`truncate text-[13px] font-semibold ${p.text}`}>{title}</p>
          <p className={`rotulo text-[9px] ${p.muted}`}>{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2 p-3">{children}</div>
    </div>
  );
}

function Bubble({ tone, side, children, delay = 0 }: { tone: Tone; side: 'in' | 'out'; children: ReactNode; delay?: number }) {
  const p = palette(tone);
  return (
    <motion.div
      className={`flex ${side === 'out' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.2, 0, 0, 1] }}
    >
      <div className={`max-w-[86%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${side === 'out' ? p.bubbleOut : p.bubbleIn}`}>{children}</div>
    </motion.div>
  );
}

function Chip({ children, solid = false }: { children: ReactNode; tone?: Tone; solid?: boolean }) {
  return (
    <span
      className={`rotulo inline-flex items-center border px-2 py-1 text-[9px] ${
        solid ? 'border-senal bg-senal text-tinta' : 'border-current/40 text-current'
      }`}
    >
      {children}
    </span>
  );
}

function AudioWave({ tone, seconds }: { tone: Tone; seconds: string }) {
  const bars = [4, 9, 6, 12, 7, 14, 9, 5, 11, 7, 13, 6, 9, 4, 8, 12, 6, 10, 5];
  return (
    <div className="flex items-center gap-2">
      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${tone === 'tinta' ? 'bg-tinta text-papel' : 'bg-papel text-tinta'} text-[8px]`}>▶</span>
      <div className="flex h-4 items-center gap-[2px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="block w-[2px] origin-center bg-current"
            style={{ height: h, animation: `onda 1.4s ${i * 0.07}s ease-in-out infinite` }}
          />
        ))}
      </div>
      <span className="rotulo text-[9px] opacity-70">{seconds}</span>
    </div>
  );
}

function Frame({ tone, label, children }: { tone: Tone; label: string; children: ReactNode }) {
  const p = palette(tone);
  return (
    <div className={`overflow-hidden rounded-[22px] border ${p.border} ${p.surface} shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]`}>
      <div className={`flex items-center justify-between border-b ${p.border} px-3.5 py-2`}>
        <span className={`rotulo text-[9px] ${p.muted}`}>{label}</span>
        <span className="flex gap-1">
          <span className={`h-1.5 w-1.5 rounded-full ${tone === 'tinta' ? 'bg-linea-oscura' : 'bg-linea'}`} />
          <span className={`h-1.5 w-1.5 rounded-full ${tone === 'tinta' ? 'bg-linea-oscura' : 'bg-linea'}`} />
          <span className={`h-1.5 w-1.5 rounded-full ${tone === 'tinta' ? 'bg-linea-oscura' : 'bg-linea'}`} />
        </span>
      </div>
      {children}
    </div>
  );
}

/* ───────────────────────── TallerHub ───────────────────────── */

const ORDENES = [
  { or: '4821', pat: 'AB 102 CD', mod: 'SUV compacto', est: 'En diagnóstico', tec: 'Téc. 03', t: '1 h 20', p: 1 },
  { or: '4822', pat: 'AC 448 KL', mod: 'Pick-up 4x4', est: 'Espera repuesto', tec: 'Téc. 07', t: '3 h 05', p: 2, alert: true },
  { or: '4823', pat: 'AD 731 MN', mod: 'SUV urbano', est: 'En reparación', tec: 'Téc. 01', t: '0 h 45', p: 2 },
  { or: '4824', pat: 'AE 219 PQ', mod: 'Todoterreno', est: 'Lavadero', tec: '—', t: '0 h 15', p: 3 },
  { or: '4825', pat: 'AF 560 RS', mod: 'SUV 7 plazas', est: 'Listo para entregar', tec: 'Téc. 03', t: '—', p: 3, done: true },
];

function TallerHubVisual({ tone, compact }: { tone: Tone; compact: boolean }) {
  const p = palette(tone);
  return (
    <div className="relative">
      <Frame tone={tone} label="TallerHub · Tablero del día">
        <div className={`flex flex-wrap items-center justify-between gap-2 border-b ${p.border} px-3.5 py-2.5`}>
          <div className="flex items-baseline gap-2">
            <span className={`display text-2xl ${p.text}`}>18</span>
            <span className={`rotulo text-[9px] ${p.muted}`}>órdenes abiertas</span>
          </div>
          <span className={`rotulo flex items-center gap-1.5 text-[9px] ${p.muted}`}>
            <motion.span
              className="inline-block h-2 w-2 border border-current border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
            />
            Sincronizado con el DMS · hace 2 min
          </span>
        </div>
        <div className="overflow-hidden">
          <table className="w-full whitespace-nowrap text-left text-[11px]">
            <thead>
              <tr className={`rotulo text-[9px] ${p.muted}`}>
                <th className="px-3.5 py-2 font-normal">OR</th>
                <th className="px-2 py-2 font-normal">Patente</th>
                <th className="hidden px-2 py-2 font-normal sm:table-cell">Modelo</th>
                <th className="px-2 py-2 font-normal">Estado</th>
                {!compact && <th className="hidden px-2 py-2 font-normal md:table-cell">Técnico</th>}
                <th className="px-3.5 py-2 text-right font-normal">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {ORDENES.map((o, i) => (
                <motion.tr
                  key={o.or}
                  className={`border-t ${p.border} ${p.text}`}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                >
                  <td className="px-3.5 py-2 font-mono">{o.or}</td>
                  <td className="px-2 py-2 font-mono">
                    <Oculto>{o.pat}</Oculto>
                  </td>
                  <td className="hidden px-2 py-2 sm:table-cell">
                    <Oculto>{o.mod}</Oculto>
                  </td>
                  <td className="px-2 py-2">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${o.alert ? 'bg-senal' : o.done ? (tone === 'tinta' ? 'bg-papel' : 'bg-tinta') : 'border border-current'}`}
                      />
                      {o.est}
                    </span>
                  </td>
                  {!compact && <td className={`hidden px-2 py-2 md:table-cell ${p.muted}`}>{o.tec}</td>}
                  <td className="px-3.5 py-2 text-right font-mono">{o.t}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`grid grid-cols-3 border-t ${p.border}`}>
          {[
            ['Retrabajo', '4,1 %'],
            ['Espera media', '22 min'],
            ['Entregas hoy', '11'],
          ].map(([k, v], i) => (
            <div key={k} className={`px-3.5 py-2.5 ${i > 0 ? `border-l ${p.border}` : ''}`}>
              <p className={`rotulo text-[8px] ${p.muted}`}>{k}</p>
              <p className={`font-mono text-sm ${p.text}`}>{v}</p>
            </div>
          ))}
        </div>
      </Frame>

      {/* Aviso por WhatsApp que sale del tablero */}
      <motion.div
        className="absolute -bottom-12 right-3 w-[230px] rounded-2xl border border-white/70 bg-senal p-3 text-tinta shadow-lg sm:-right-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.7, ease: [0.2, 0, 0, 1] }}
      >
        <p className="rotulo text-[9px]">WhatsApp → Repuestos</p>
        <p className="mt-1 text-[12px] font-medium leading-snug">OR 4822 · <Oculto>Pick-up 4x4</Oculto> espera filtro de combustible. ¿Fecha de llegada?</p>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Circuito ───────────────────────── */

function CircuitoVisual({ tone, compact }: { tone: Tone; compact: boolean }) {
  const p = palette(tone);
  return (
    <div className={`grid items-start gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'}`}>
      <Phone tone={tone} title="Circuito" subtitle="Sucursal Centro · referente">
        <Bubble tone={tone} side="in">
          Tenés <b>2 pendientes</b> de la visita del martes.
        </Bubble>
        <Bubble tone={tone} side="in" delay={0.15}>
          <span className="rotulo block text-[9px] opacity-70">Vencido · perfumería</span>
          Protector solar FPS 50 · vence 01/2027
          <span className="mt-1 block">
            Acción sugerida: <b>exhibir en punta</b>
          </span>
          <span className="mt-2 flex gap-1.5">
            <Chip tone={tone === 'tinta' ? 'papel' : 'tinta'}>Mando foto</Chip>
            <Chip tone={tone === 'tinta' ? 'papel' : 'tinta'}>No puedo</Chip>
          </span>
        </Bubble>
        <Bubble tone={tone} side="out" delay={0.35}>
          <span className={`mb-1.5 block aspect-[4/3] w-36 rounded-xl ${tone === 'tinta' ? 'bg-tinta-3' : 'bg-tinta-3'} grilla-plano-oscura`} />
          Listo, quedó en la punta.
        </Bubble>
        <Bubble tone={tone} side="in" delay={0.55}>
          ✓ Recibido. Queda <b>por aprobar</b> por el auditor.
        </Bubble>
      </Phone>

      {!compact && (
        <motion.div
          className={`rounded-[22px] border ${p.border} ${p.surface} p-4 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)] sm:mt-16`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <p className={`rotulo text-[9px] ${p.muted}`}>Resumen del lunes · al dueño</p>
          <ul className={`mt-3 space-y-2 text-[12px] leading-snug ${p.text}`}>
            <li className="flex justify-between gap-3">
              <span>Plata en riesgo</span>
              <span className="font-mono">$ 412.000</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Con acción en curso</span>
              <span className="font-mono">$ 268.500</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Vence en 30 días sin acción</span>
              <span className="font-mono">7 ítems</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Recuperado (notas de crédito)</span>
              <span className="font-mono text-cinabrio">$ 96.300</span>
            </li>
          </ul>
          <p className={`mt-3 border-t ${p.border} pt-2 text-[11px] ${p.muted}`}>Respondé 3 para ver las fotos.</p>
        </motion.div>
      )}
    </div>
  );
}

/* ───────────────────────── Aula Virtual ───────────────────────── */

function AulaVisual({ tone }: { tone: Tone }) {
  return (
    <Phone tone={tone} title="Asistente" subtitle="Mostrador · uso interno">
      <Bubble tone={tone} side="out">
        <span className="mb-1.5 block aspect-[3/4] w-24 rounded-xl bg-tinta-3 grilla-plano-oscura" />
        Revisame esta receta.
      </Bubble>
      <Bubble tone={tone} side="in" delay={0.2}>
        <b>⚠️ Revisá estos puntos</b>
        <span className="mt-1.5 block">✅ Recetario de la obra social</span>
        <span className="block">✅ Fecha dentro de los 30 días</span>
        <span className="block">⚠️ Sello del médico: no se ve</span>
        <span className="block">✅ Cantidad dentro del tope</span>
        <span className="mt-1.5 block opacity-75">Según la ficha vigente desde 01/08/2026.</span>
      </Bubble>
    </Phone>
  );
}

/* ───────────────────────── AudiCampo ───────────────────────── */

function AudiCampoVisual({ tone }: { tone: Tone }) {
  const p = palette(tone);
  const campos = [
    ['Lote', '20'],
    ['Sección', '3'],
    ['Tarea', 'Fertilización'],
    ['Cantidad', '25 ha'],
    ['Contratista', 'Propio'],
  ];
  return (
    <div className="space-y-3">
      <Phone tone={tone} title="Partes de campo" subtitle="Capataz · finca norte">
        <Bubble tone={tone} side="out">
          <AudioWave tone={tone} seconds="0:12" />
        </Bubble>
        <Bubble tone={tone} side="in" delay={0.2}>
          <span className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-[11px]">
            {campos.map(([k, v]) => (
              <span key={k} className="contents">
                <span className="opacity-60">{k}</span>
                <span>{v}</span>
              </span>
            ))}
          </span>
          <span className="mt-1.5 block">¿Está bien? Respondé CONFIRMAR.</span>
        </Bubble>
        <Bubble tone={tone} side="out" delay={0.4}>
          CONFIRMAR
        </Bubble>
      </Phone>
      <motion.div
        className={`mx-auto flex max-w-[290px] items-center justify-between rounded-xl border ${p.border} ${p.surface} px-3 py-2`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <span className={`rotulo text-[9px] ${p.muted}`}>Planilla · fila 214</span>
        <span className="flex gap-[3px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className={`h-3 w-3 ${i < 10 ? (tone === 'tinta' ? 'bg-papel' : 'bg-tinta') : ''}`} />
          ))}
        </span>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Bioglosse ───────────────────────── */

function BioglosseVisual({ tone }: { tone: Tone }) {
  const p = palette(tone);
  const items = [
    { n: 'Sérum hidratante', s: 'ok', u: 4 },
    { n: 'Crema de día FPS', s: 'ok', u: 6 },
    { n: 'Booster reductor', s: 'bajo', u: 1 },
    { n: 'Gel limpiador', s: 'falta', u: 0 },
    { n: 'Contorno de ojos', s: 'ok', u: 3 },
  ];
  return (
    <Phone tone={tone} title="Visita · Paso 2 de 5" subtitle="Check de surtido · 19 productos">
      <div className={`flex items-center justify-between rounded-xl border ${p.border} px-2.5 py-2`}>
        <span className={`rotulo text-[9px] ${p.muted}`}>Cumplimiento</span>
        <span className="flex items-center gap-2">
          <span className={`h-1.5 w-20 overflow-hidden rounded-full ${tone === 'tinta' ? 'bg-tinta-3' : 'bg-papel'}`}>
            <motion.span
              className="block h-full rounded-full bg-senal"
              initial={{ width: 0 }}
              whileInView={{ width: '84%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0, 0, 1] }}
            />
          </span>
          <span className={`font-mono text-[12px] ${p.text}`}>84 %</span>
        </span>
      </div>
      <ul className={`divide-y ${tone === 'tinta' ? 'divide-linea-oscura' : 'divide-linea'}`}>
        {items.map((it, i) => (
          <motion.li
            key={it.n}
            className={`flex items-center justify-between py-1.5 text-[12px] ${p.text}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <span className="flex items-center gap-2">
              <span className={`rotulo w-4 text-[9px] ${p.muted}`}>{String(i + 1).padStart(2, '0')}</span>
              {it.n}
            </span>
            <span className="flex items-center gap-2">
              <span
                className={`rotulo rounded-full px-1.5 py-0.5 text-[8px] ${
                  it.s === 'falta' ? 'bg-senal text-tinta' : it.s === 'bajo' ? `border ${p.border}` : p.muted
                }`}
              >
                {it.s === 'ok' ? 'OK' : it.s === 'bajo' ? 'Bajo mín.' : 'Falta'}
              </span>
              <span className="w-4 text-right font-mono">{it.u}</span>
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="flex gap-1.5 pt-1">
        <Chip tone={tone}>📷 Foto</Chip>
        <Chip tone={tone}>🎙 Dictar</Chip>
        <Chip tone={tone}>+ Anotar</Chip>
      </div>
    </Phone>
  );
}

/* ───────────────────────── Calidad en obra ───────────────────────── */

function ObrasVisual({ tone }: { tone: Tone }) {
  const p = palette(tone);
  const tareas = [
    { n: 'Fundaciones', plan: 100, real: 100 },
    { n: 'Estructura H°A°', plan: 80, real: 72 },
    { n: 'Mampostería', plan: 55, real: 30, desvio: true },
    { n: 'Inst. sanitaria', plan: 30, real: 26 },
    { n: 'Revoques', plan: 10, real: 0 },
  ];
  return (
    <Frame tone={tone} label="Avance real vs. plan · semana 14">
      <div className="space-y-3 p-4">
        {tareas.map((t, i) => (
          <div key={t.n}>
            <div className={`mb-1 flex items-center justify-between text-[11px] ${p.text}`}>
              <span className="flex items-center gap-2">
                {t.n}
                {t.desvio && <span className="rotulo rounded-full bg-senal px-1.5 py-0.5 text-[8px] text-tinta">Desvío crítico</span>}
              </span>
              <span className="font-mono">
                {t.real} % <span className={p.muted}>/ {t.plan} %</span>
              </span>
            </div>
            <div className={`relative h-2 rounded-full ${tone === 'tinta' ? 'bg-tinta-3' : 'bg-papel'}`}>
              <motion.span
                className={`absolute inset-y-0 left-0 rounded-full ${t.desvio ? 'bg-senal' : tone === 'tinta' ? 'bg-papel' : 'bg-tinta'}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${t.real}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.2, 0, 0, 1] }}
              />
              <span className={`absolute -top-1 bottom-[-4px] w-px ${tone === 'tinta' ? 'bg-papel' : 'bg-tinta'}`} style={{ left: `${t.plan}%` }} />
            </div>
          </div>
        ))}
        <p className={`rotulo flex items-center gap-2 pt-1 text-[9px] ${p.muted}`}>
          <span className={`inline-block h-3 w-px ${tone === 'tinta' ? 'bg-papel' : 'bg-tinta'}`} /> Plan
          <span className={`ml-3 inline-block h-2 w-4 ${tone === 'tinta' ? 'bg-papel' : 'bg-tinta'}`} /> Real
        </p>
      </div>
    </Frame>
  );
}
