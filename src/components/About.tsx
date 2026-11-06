import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { EXPERIENCE, PROFILE_PHOTO, SKILLS } from '../data';
import { Corners, Firma, LineReveal, Reveal, SectionLabel } from './ui/primitives';

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section id="perfil" className="relative border-t border-linea bg-hoja">
      <div className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel num="05" title="Perfil" />
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
              {/* Retrato */}
              <Reveal className="max-w-md">
                <div className="rotulo mb-2 flex justify-between text-grafito">
                  <span>FIG. 08</span>
                  <span>En el escritorio</span>
                </div>
                <div ref={photoRef} className="encuadre relative aspect-[4/5] overflow-hidden bg-tinta text-tinta">
                  <motion.img
                    src={PROFILE_PHOTO}
                    alt="Juan Ignacio Luquez trabajando con su computadora y un cuaderno"
                    className="absolute inset-x-0 top-[-5%] h-[110%] w-full object-cover contrast-[1.05] grayscale"
                    style={{ y }}
                    loading="lazy"
                  />
                  <Corners />
                </div>
                <p className="rotulo mt-3 text-grafito">Juan Ignacio Luquez · Ing. Industrial · San Miguel de Tucumán</p>
              </Reveal>

              {/* Texto */}
              <div>
                <h2 className="display text-[clamp(2.4rem,5.4vw,4.6rem)]">
                  <LineReveal lines={['De la calidad', 'al código.']} />
                </h2>
                <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-tinta-2">
                  <Reveal as="p" delay={0.05}>
                    Soy ingeniero industrial (UNT) y técnico electromecánico. Empecé en calidad, en el sector automotriz: participé en tres
                    certificaciones ISO 9001 e ISO 14001, auditorías internas y análisis de causa raíz. Ahí aprendí que un proceso
                    mejora cuando se mide y se sostiene, no cuando se compra una herramienta.
                  </Reveal>
                  <Reveal as="p" delay={0.1}>
                    Hoy soy analista de procesos y mejora continua en un concesionario oficial, donde
                    desarrollé TallerHub, el sistema que el taller usa todos los días. En paralelo construyo soluciones de
                    transformación digital para empresas de otros rubros: cadenas de farmacias, trade marketing, agro y construcción.
                  </Reveal>
                  <Reveal as="p" delay={0.15}>
                    Trabajo desde Tucumán, al pie de las Yungas, con empresas de Argentina y LATAM.
                  </Reveal>
                  <p className="pt-2 text-[clamp(2rem,3.6vw,2.8rem)] text-tinta">
                    <Firma delay={0.3} />
                  </p>
                </div>
              </div>
            </div>

            {/* Trayectoria */}
            <div className="mt-20">
              <p className="rotulo mb-4 text-grafito">Trayectoria</p>
              <ol className="border-t border-tinta">
                {EXPERIENCE.map((e, i) => (
                  <Reveal
                    as="li"
                    key={e.role}
                    delay={i * 0.06}
                    className="group grid grid-cols-1 gap-2 border-b border-linea py-5 md:grid-cols-[160px_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8"
                  >
                    <span className="rotulo pt-1 text-grafito">{e.period}</span>
                    <div>
                      <p className="titular text-xl">{e.role}</p>
                      <p className="rotulo mt-1 text-grafito">{e.org}</p>
                    </div>
                    <div className="text-[15px] leading-relaxed text-tinta-2">
                      {e.detail}
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Herramientas */}
            <div className="mt-16 grid grid-cols-1 gap-px border border-linea bg-linea sm:grid-cols-2 xl:grid-cols-4">
              {SKILLS.map((s, i) => (
                <Reveal key={s.area} delay={i * 0.06} className="bg-hoja p-5">
                  <p className="rotulo text-grafito">{s.area}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <li key={it} className="border border-linea px-2 py-1 text-[13px] text-tinta">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
