import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { NAV, WHATSAPP_URL, EMAIL } from '../data';
import { Firma } from './ui/primitives';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // La barra se vuelve cristal oscuro cuando pasa sobre una banda de noche
  const [overDark, setOverDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const dark = Array.from(document.querySelectorAll('.grano.bg-tinta')).some((el) => {
        if (el.closest('[role="dialog"]')) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 44 && r.bottom >= 44;
      });
      setOverDark(dark);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-4">
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-tarco via-lapacho to-durazno"
          style={{ scaleX: progress }}
        />
        <div
          className={`mx-auto flex max-w-[1240px] items-center justify-between gap-6 rounded-full border px-4 py-2.5 transition-[background-color,box-shadow,border-color] duration-300 sm:px-6 ${
            overDark
              ? 'border-white/15 bg-tinta/55 text-papel shadow-[0_18px_50px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl'
              : scrolled
                ? 'border-white/70 bg-white/55 shadow-[0_18px_50px_-30px_rgb(27_33_40/0.45)] backdrop-blur-xl'
                : 'border-white/50 bg-white/30 backdrop-blur-md'
          }`}
        >
          <a href="#inicio" className="group flex items-baseline gap-3" aria-label="Yunga Devs, Juan Ignacio Luquez — inicio">
            <span className="display text-[28px] leading-none">Yunga Devs</span>
            <span className={`hidden text-[22px] leading-none xl:inline ${overDark ? 'text-grafito-claro' : 'text-grafito'}`} aria-hidden>
              <Firma delay={0.4} />
            </span>
            <span className="rotulo hidden text-grafito sm:inline xl:hidden">
              ingeniería + IA <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Secciones">
            {NAV.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3 py-2 text-[13px] font-medium transition-colors ${
                    overDark
                      ? active
                        ? 'text-papel'
                        : 'text-grafito-claro hover:text-papel'
                      : active
                        ? 'text-tinta'
                        : 'text-grafito hover:text-tinta'
                  }`}
                  aria-current={active ? 'true' : undefined}
                >
                  <span className={`rotulo mr-1.5 text-[10px] ${overDark ? 'text-grafito-claro' : 'text-grafito'}`}>{item.num}</span>
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-activo"
                      className={`absolute inset-x-3 -bottom-0.5 h-px rounded-full ${overDark ? 'bg-papel' : 'bg-tinta'}`}
                      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rotulo boton-degrade hidden items-center gap-2 px-5 py-2.5 sm:inline-flex"
            >
              Hablemos <span aria-hidden>↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`rotulo flex items-center gap-2 border px-3 py-2.5 lg:hidden ${overDark ? 'border-white/40' : 'border-tinta/40'}`}
              aria-expanded={open}
              aria-controls="menu-movil"
            >
              Menú
              <span className="flex flex-col gap-[3px]" aria-hidden>
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="grano fixed inset-0 z-50 flex flex-col overflow-y-auto bg-tinta text-papel"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            <div className="relative z-10 flex items-center justify-between px-4 py-5 sm:px-6">
              <span className="display text-[28px]">Yunga Devs</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rotulo border border-linea-oscura px-3 py-2.5 text-papel"
              >
                Cerrar ✕
              </button>
            </div>
            <nav className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-4 sm:px-6" aria-label="Secciones">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-linea-oscura py-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.2, 0, 0, 1] }}
                >
                  <span className="rotulo text-grafito-claro">{item.num}</span>
                  <span className={`display text-5xl ${activeSection === item.id ? 'text-senal' : ''}`}>{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <div className="relative z-10 space-y-3 px-4 pb-8 pt-6 sm:px-6">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rotulo boton-degrade flex items-center justify-between px-5 py-4"
              >
                Escribime por WhatsApp <span aria-hidden>↗</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="rotulo block text-grafito-claro">
                {EMAIL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
