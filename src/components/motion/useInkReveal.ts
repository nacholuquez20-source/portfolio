import { RefObject } from 'react';
import { useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Bandas de tinta que se despliegan como una hoja: entran un poco más angostas
 * y llegan al ancho completo cuando su borde superior pasa el tercio de la pantalla.
 */
export function useInkReveal(ref: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const side = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [4, 0]);
  return useMotionTemplate`inset(0 ${side}% 0 ${side}%)`;
}
