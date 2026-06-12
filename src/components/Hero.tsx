import { PORTRAIT } from '../data';

interface HeroProps {
  onExploreProjects: () => void;
}

export default function Hero({ onExploreProjects }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F8F8F5]">
      {/* Structural visual grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <div className="w-[1px] h-full bg-[#1c1c1a]" />
        <div className="w-[1px] h-full bg-[#1c1c1a] hidden md:block" />
        <div className="w-[1px] h-full bg-[#1c1c1a] hidden md:block" />
        <div className="w-[1px] h-full bg-[#1c1c1a]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Subtle tag at the top */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] md:text-[11px] tracking-widest text-neutral-500 uppercase">
              TUCUMÁN · ARGENTINA // INGENIERÍA INDUSTRIAL & IA APLICADA
            </span>
          </div>

          {/* Majestic Hero Typography */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] text-[#1c1c1a] mb-8 font-light select-none">
            Ingeniero <br />
            <span className="font-serif italic font-light text-neutral-400 pr-2 lowercase">industrial</span>
            <span className="font-serif font-semibold text-neutral-800">+ IA.</span>
          </h1>

          {/* Premium Sub-narrative */}
          <p className="font-sans text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed mb-10 font-light">
            Diseño sistemas donde los procesos industriales y la inteligencia
            artificial producen resultados reales — medibles, sostenidos, humanos.
          </p>

          {/* Interactive CTA pills */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreProjects}
              className="group flex items-center gap-3 bg-[#1c1c1a] text-[#F8F8F5] text-xs font-mono py-4 px-8 rounded-full border border-neutral-800 hover:bg-transparent hover:text-[#1c1c1a] transition-all duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer"
              id="view-projects-hero-btn"
            >
              VER PROYECTOS
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </button>

            <a
              href="https://wa.me/5493814758763"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono py-4 px-8 rounded-full border border-neutral-300 text-neutral-600 hover:border-[#1c1c1a] hover:text-[#1c1c1a] transition-all duration-300"
            >
              HABLEMOS ↗
            </a>
          </div>
        </div>

        {/* Large cinematic workspace image */}
        <div className="mt-16 md:mt-24 relative">
          <div className="overflow-hidden rounded-2xl bg-neutral-200 aspect-[16/10] md:aspect-[21/9] shadow-inner relative group border border-neutral-200/40">
            <img
              src={PORTRAIT}
              alt="Juan Ignacio Luquez — Ingeniero Industrial y consultor"
              className="w-full h-full object-cover contrast-[1.02] brightness-100 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Elegant overlay card containing live indicators */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-[#F8F8F5]/85 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl border border-white/20 shadow-lg text-left max-w-xs transition-opacity duration-300">
              <p className="font-mono text-[9px] tracking-widest text-[#1c1c1a] font-semibold uppercase mb-1 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                DISPONIBLE PARA CONSULTORÍA
              </p>
              <p className="text-xs text-neutral-500 font-light leading-snug">
                Juan Ignacio Luquez — procesos, automatizaciones con IA y SaaS industriales.
              </p>
            </div>
          </div>
        </div>

        {/* Ficha técnica: lo esencial, escaneable en segundos */}
        <div className="mt-16 pt-10 border-t border-neutral-200/60">
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-6">
            // FICHA TÉCNICA
          </p>
          <dl className="divide-y divide-neutral-200/70 border-y border-neutral-200/70">
            {[
              { label: 'UBICACIÓN', value: 'San Miguel de Tucumán, Argentina — remoto en Argentina & LATAM' },
              { label: 'ESPECIALIZACIÓN', value: 'Procesos industriales · Automatización con IA · SaaS a medida' },
              { label: 'STACK', value: 'Python · FastAPI · React · n8n · Claude API · PostgreSQL · Docker' },
              { label: 'PRODUCTOS EN CAMPO', value: '04 — AuditBot · TallerHub · Kernium · FlujoNorte' },
            ].map((row) => (
              <div key={row.label} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-3.5">
                <dt className="sm:col-span-3 font-mono text-[10px] sm:text-xs tracking-wider text-neutral-500 uppercase pt-0.5">
                  {row.label}
                </dt>
                <dd className="sm:col-span-9 font-sans text-sm text-neutral-700">
                  {row.value}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-3.5">
              <dt className="sm:col-span-3 font-mono text-[10px] sm:text-xs tracking-wider text-neutral-500 uppercase pt-0.5">
                ESTADO
              </dt>
              <dd className="sm:col-span-9 font-sans text-sm text-neutral-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Disponible para consultoría
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
