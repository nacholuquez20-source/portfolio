import { useEffect, useRef, useState } from 'react';
import { animate, AnimatePresence, motion } from 'motion/react';
import { Firma } from '../ui/primitives';

/*
  Apertura de lámina: el logotipo entra letra por letra, se dibuja una cota y la hoja sube.
  Dura 1,5 s, se ve una vez por sesión y se saltea con un clic, con Esc o si el sistema pide menos movimiento.
*/

const NBSP = String.fromCharCode(160);
const EASE = [0.2, 0, 0, 1] as const;
const LOGO = 'Yunga Devs';
const KEY = 'jl-intro-vista';

function shouldShow() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return window.sessionStorage.getItem(KEY) !== '1';
  } catch {
    return true;
  }
}

export default function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(shouldShow);
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setShow(false);
    onDone();
  };

  useEffect(() => {
    if (!show) {
      finish();
      return;
    }
    try {
      window.sessionStorage.setItem(KEY, '1');
    } catch {
      /* sin almacenamiento: se vuelve a ver la próxima vez, no pasa nada */
    }
    document.documentElement.style.overflow = 'hidden';
    const counter = animate(0, 100, { duration: 1.5, ease: EASE, onUpdate: (v) => setCount(Math.round(v)) });
    const t = setTimeout(finish, 1750);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && finish();
    window.addEventListener('keydown', onKey);
    return () => {
      counter.stop();
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = '';
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[80] flex cursor-pointer flex-col justify-between bg-papel px-4 py-5 text-tinta sm:px-6 lg:px-10"
          onClick={finish}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.75, ease: [0.7, 0, 0.2, 1] }}
          aria-hidden
        >
          <div className="grilla-plano pointer-events-none absolute inset-0 opacity-70" />

          <div className="rotulo relative flex justify-between text-grafito">
            <span>FIG. 00 — Apertura</span>
            <span className="tabular-nums text-tinta">{String(count).padStart(3, '0')}</span>
          </div>

          <div className="relative mx-auto w-full max-w-[1240px]">
            <p className="display flex overflow-hidden pb-[0.1em] text-[clamp(3.6rem,15vw,13rem)] leading-[0.85]">
              {LOGO.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.035, ease: EASE }}
                >
                  {ch === ' ' ? NBSP : ch}
                </motion.span>
              ))}
            </p>
            <p className="-mt-1 text-[clamp(1.9rem,4.6vw,3.6rem)] text-tinta">
              <Firma play delay={0.45} />
            </p>
            <div className="mt-4 flex items-center gap-3 text-grafito">
              <motion.span
                className="block h-3 w-px bg-current"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.25, delay: 0.35 }}
              />
              <motion.span
                className="block h-px flex-1 origin-left bg-current"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
              />
              <motion.span
                className="rotulo text-tinta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.85 }}
              >
                ingeniería + IA →
              </motion.span>
              <motion.span
                className="block h-3 w-px bg-current"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.25, delay: 1.1 }}
              />
            </div>
          </div>

          <div className="rotulo relative flex justify-between text-grafito">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Primero el proceso. Después la IA.
            </motion.span>
            <span className="hidden sm:inline">Tucumán · AR</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
