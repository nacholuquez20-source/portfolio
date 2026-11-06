import { motion } from 'motion/react';
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL, NAV, WHATSAPP_URL } from '../data';
import { Cota, Firma } from './ui/primitives';

const NBSP = String.fromCharCode(160);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-linea-oscura bg-tinta text-papel">
      <div className="mx-auto max-w-[1240px] px-4 pt-16 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-linea-oscura pb-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="titular max-w-[22ch] text-3xl">
              Primero el proceso.
              <span className="block text-grafito-claro">Después la IA.</span>
            </p>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-papel/70">
              Ingeniero industrial. Desarrollo soluciones digitales para la transformación digital de empresas y la
              automatización de procesos.
            </p>
          </div>
          <nav aria-label="Secciones del pie">
            <p className="rotulo mb-4 text-grafito-claro">Índice</p>
            <ul className="space-y-2 text-[15px]">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-papel/80 transition-colors hover:text-senal">
                    <span className="rotulo mr-2 text-[10px] text-grafito-claro">{n.num}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="rotulo mb-4 text-grafito-claro">Contacto</p>
            <ul className="space-y-2 text-[15px]">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-papel/80 hover:text-senal">
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="text-papel/80 hover:text-senal">
                  Email ↗
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-papel/80 hover:text-senal">
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-papel/80 hover:text-senal">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="/privacy.html" className="text-papel/60 hover:text-senal">
                  Política de privacidad (AuditBot)
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logotipo a todo el ancho */}
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <motion.p
          className="display flex select-none overflow-hidden whitespace-nowrap pb-[0.14em] pt-8 text-[clamp(4rem,18.2vw,16rem)] leading-[0.82]"
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          aria-hidden
        >
          {'Yunga Devs'.split('').map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{ oculto: { y: '108%' }, visible: { y: '0%' } }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: [0.2, 0, 0, 1] }}
            >
              {ch === ' ' ? NBSP : ch}
            </motion.span>
          ))}
        </motion.p>
        <div className="-mt-[0.4em] mb-6 flex justify-end pr-2 text-[clamp(2rem,6vw,4.6rem)] text-senal sm:-mt-[0.55em]">
          <Firma glow delay={0.7} />
        </div>
        <Cota tone="tinta" label="Fin de lámina · 06 / 06" className="mb-2" delay={0.5} />
        <div className="rotulo flex flex-col gap-3 border-t border-linea-oscura py-6 text-grafito-claro sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Juan Ignacio Luquez · Yunga Devs · Tucumán, Argentina</span>
          <span>ingeniería + IA →</span>
          <a href="#inicio" className="text-grafito-claro hover:text-papel">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
