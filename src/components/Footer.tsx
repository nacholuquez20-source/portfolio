import { ArrowUpRight } from 'lucide-react';
import { EMAIL, LINKEDIN_URL, GITHUB_URL, WHATSAPP_URL } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1c1a] text-[#F8F8F5] pt-24 pb-12 border-t border-neutral-800 text-left relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-neutral-800/60 pointer-events-none" />
      <div className="absolute inset-y-0 right-6 md:right-12 w-[1px] bg-neutral-800/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">

          {/* Tagline Column */}
          <div className="md:col-span-6 space-y-6">
            <h3 className="font-serif text-3xl font-medium tracking-tight">Juan Ignacio Luquez</h3>
            <p className="text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              Ingeniero Industrial, consultor y desarrollador. No construyo herramientas
              en el vacío — las construyo junto a la gente que las va a usar.
            </p>
          </div>

          {/* Links Column 1: Projects */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-bold">// PROYECTOS</p>
            <ul className="space-y-2 text-sm font-light text-neutral-400">
              <li>
                <button onClick={() => onNavigate('demos')} className="hover:text-amber-300 text-amber-200/90 transition cursor-pointer flex items-center gap-1 font-medium">
                  💡 Demos Interactivas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition cursor-pointer">
                  AuditBot — Auditorías por WhatsApp
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition cursor-pointer">
                  TallerHub — Gestión de Talleres
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition cursor-pointer">
                  Kernium — Flota Industrial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition cursor-pointer">
                  FlujoNorte — Automatización Citrícola
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Socials */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase font-bold">// ENLACES</p>
            <ul className="space-y-2 text-sm font-light text-neutral-400">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="hover:text-white transition flex items-center gap-1 w-fit"
                >
                  Correo Electrónico <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1 w-fit"
                >
                  WhatsApp <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1 w-fit"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1 w-fit"
                >
                  GitHub <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="/privacy.html"
                  className="hover:text-white transition flex items-center gap-1 w-fit"
                >
                  Política de Privacidad <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer: massive serif logo and copyright */}
        <div className="pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="order-2 md:order-1 text-center md:text-left space-y-1">
            <p className="text-xs text-neutral-500 font-mono">
              © {currentYear} Juan Ignacio Luquez. Tucumán, Argentina. Todos los derechos reservados.
            </p>
            <p className="text-[10px] text-neutral-600 font-mono">
              Quebrada del Portugués · Al pie de las Yungas.
            </p>
          </div>

          <div className="order-1 md:order-2 select-none pointer-events-none opacity-[0.04]">
            <h2 className="font-serif text-7xl sm:text-9xl lg:text-[12rem] leading-none font-bold tracking-tighter">
              Luquez
            </h2>
          </div>
        </div>

      </div>
    </footer>
  );
}
