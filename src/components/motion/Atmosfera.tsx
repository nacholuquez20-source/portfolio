/*
  Fondo fijo de niebla: manchas pastel (tarco, helecho, lluvia, lapacho, durazno)
  muy desenfocadas que se mueven despacio detrás de todo el sitio.
*/
const BLOBS = [
  { c: 'var(--color-tarco)', w: 46, x: -8, y: -6, a: 'deriva-a', d: 38, o: 0.75 },
  { c: 'var(--color-helecho)', w: 40, x: 64, y: 8, a: 'deriva-b', d: 44, o: 0.8 },
  { c: 'var(--color-lluvia)', w: 50, x: 30, y: 56, a: 'deriva-a', d: 52, o: 0.85 },
  { c: 'var(--color-lapacho)', w: 30, x: 78, y: 62, a: 'deriva-b', d: 36, o: 0.7 },
  { c: 'var(--color-durazno)', w: 24, x: 8, y: 70, a: 'deriva-b', d: 48, o: 0.55 },
];

export default function Atmosfera() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-papel">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${b.w}vw`,
            height: `${b.w}vw`,
            left: `${b.x}vw`,
            top: `${b.y}vh`,
            background: b.c,
            opacity: b.o,
            filter: 'blur(80px)',
            animation: `${b.a} ${b.d}s ease-in-out infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
