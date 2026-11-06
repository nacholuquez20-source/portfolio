import { ReactNode, useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'motion/react';
import { StatusKind } from '../../types';

const EASE = [0.2, 0, 0, 1] as const;

/** Aparición precisa: entra en pocos cuadros, sin rebote. */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'p';
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Titular que entra línea por línea desde una máscara. */
export function LineReveal({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  play,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Si se pasa, la entrada depende de este valor y no de que el titular entre en pantalla. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const show = play ?? inView;
  return (
    <span ref={ref} className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '105%' }}
            animate={show ? { y: '0%' } : { y: '105%' }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Resaltador amarillo que se pinta detrás de la palabra al entrar en pantalla. */
export function Senal({ children, delay = 0, play }: { children: ReactNode; delay?: number; play?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const on = play ?? inView;
  return (
    <span
      ref={ref}
      className={`marca-senal ${on ? 'is-on' : ''}`}
      style={{ transitionDelay: `${0.25 + delay}s` }}
    >
      {children}
    </span>
  );
}

/** Cota de plano: línea de medida con topes que se dibuja, y su leyenda. */
export function Cota({
  label,
  className = '',
  tone = 'claro',
  delay = 0,
}: {
  label?: ReactNode;
  className?: string;
  /** claro: sobre papel · oscuro: líneas más marcadas sobre papel · tinta: sobre fondo oscuro */
  tone?: 'claro' | 'oscuro' | 'tinta';
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const color = tone === 'claro' ? 'text-grafito-claro' : 'text-grafito';
  const labelColor = tone === 'tinta' ? 'text-grafito-claro' : 'text-grafito';
  return (
    <div ref={ref} className={`flex items-center gap-3 ${color} ${className}`} aria-hidden={label ? undefined : true}>
      <Tope show={inView} delay={delay} />
      <motion.span
        className="h-px flex-1 origin-left bg-current"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.1, ease: EASE }}
      />
      {label && (
        <motion.span
          className={`rotulo shrink-0 ${labelColor}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.55 }}
        >
          {label}
        </motion.span>
      )}
      {label && (
        <motion.span
          className="h-px flex-1 origin-right bg-current"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: EASE }}
        />
      )}
      <Tope show={inView} delay={delay} />
    </div>
  );
}

function Tope({ show, delay }: { show: boolean; delay: number }) {
  return (
    <motion.span
      className="block h-3 w-px bg-current"
      initial={{ scaleY: 0 }}
      animate={show ? { scaleY: 1 } : { scaleY: 0 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
    />
  );
}

/** Contador para cifras: anima solo la parte numérica y respeta el resto del texto. */
export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match || !inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const [, pre, num, post] = match;
    const decimals = num.includes(',') ? num.split(',')[1].length : num.includes('.') ? num.split('.')[1].length : 0;
    const target = parseFloat(num.replace(',', '.'));
    const controls = animate(0, target, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => {
        const txt = decimals ? v.toFixed(decimals).replace('.', ',') : Math.round(v).toString();
        setDisplay(`${pre}${txt}${post}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {match ? display : value}
    </span>
  );
}

/** Rótulo de sección al estilo del manual: número y título en columna. */
export function SectionLabel({
  num,
  title,
  tone = 'papel',
}: {
  num: string;
  title: string;
  tone?: 'papel' | 'tinta';
}) {
  return (
    <div className="flex items-baseline gap-3 lg:flex-col lg:gap-1.5">
      <span className={`rotulo ${tone === 'tinta' ? 'text-grafito-claro' : 'text-grafito'}`}>{num}</span>
      <span className={`text-sm font-bold uppercase tracking-[0.08em] ${tone === 'tinta' ? 'text-papel' : 'text-tinta'}`}>
        {title}
      </span>
    </div>
  );
}

/** Estado del proyecto: un cuadrado lleno, a medias o vacío. Sin semáforos de colores genéricos. */
export function StatusTag({
  label,
  kind,
  tone = 'papel',
}: {
  label: string;
  kind: StatusKind;
  tone?: 'papel' | 'tinta';
}) {
  const border = tone === 'tinta' ? 'border-linea-oscura text-papel' : 'border-linea text-tinta';
  const fill = tone === 'tinta' ? 'bg-senal' : 'bg-tinta';
  return (
    <span className={`rotulo inline-flex items-center gap-2 border px-2.5 py-1 ${border}`}>
      <span className={`relative block h-2 w-2 border ${tone === 'tinta' ? 'border-senal' : 'border-tinta'}`}>
        {kind === 'live' && <span className={`absolute inset-0 ${fill}`} />}
        {kind === 'build' && <span className={`absolute inset-y-0 left-0 w-1/2 ${fill}`} />}
      </span>
      {label}
    </span>
  );
}

/** Esquinas de encuadre para marcos tipo plano. */
export function Corners() {
  return (
    <>
      <span className="esq esq-tl" />
      <span className="esq esq-tr" />
      <span className="esq esq-bl" />
      <span className="esq esq-br" />
    </>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-block transition-transform duration-300 ease-[var(--ease-plano)] ${className}`}>
      →
    </span>
  );
}

/** Dato sensible desenfocado (patentes, modelos): se ve la forma, no el contenido. */
export function Oculto({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <span aria-hidden className="inline-block select-none blur-[3.5px]">
        {children}
      </span>
      <span className="sr-only">dato oculto</span>
    </span>
  );
}

/** Convierte los tramos marcados con [[...]] en datos ocultos. */
export function conOcultos(text: string): ReactNode {
  const parts = text.split(/\[\[(.+?)\]\]/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <Oculto key={i}>{part}</Oculto> : part));
}
