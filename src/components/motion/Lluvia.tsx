import { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

/*
  Gotas finas que caen lento: un detalle de la selva de niebla.
  Posiciones y tiempos deterministas para que no cambien entre renders.
*/
export default function Lluvia({ count = 28, tone = 'claro' }: { count?: number; tone?: 'claro' | 'noche' }) {
  const reduce = useReducedMotion();
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          left: r(1) * 100,
          dur: 3.2 + r(2) * 3.4,
          delay: -r(3) * 6,
          h: 50 + r(4) * 70,
          o: 0.25 + r(5) * 0.45,
        };
      }),
    [count],
  );
  if (reduce) return null;
  const color = tone === 'noche' ? 'rgb(255 255 255 / 0.55)' : 'rgb(255 255 255 / 0.95)';
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute top-0 w-px"
          style={{
            left: `${d.left}%`,
            height: d.h,
            opacity: d.o,
            background: `linear-gradient(transparent, ${color})`,
            animation: `gota ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
