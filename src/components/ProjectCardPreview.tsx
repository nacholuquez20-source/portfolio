import { motion } from 'motion/react';

interface ProjectCardPreviewProps {
  projectId: string;
}

// Mini-demo animada que se muestra al hacer hover sobre la tarjeta del proyecto.
// Loops infinitos puramente presentacionales: sin estado, costo mínimo.
export default function ProjectCardPreview({ projectId }: ProjectCardPreviewProps) {
  return (
    <div className="absolute inset-0 bg-[#0d1117] p-4 flex flex-col pointer-events-none overflow-hidden">
      {/* Grid de fondo sutil */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(#FAF9F5 1px, transparent 1px)', backgroundSize: '16px 16px' }}
      />

      {/* Badge */}
      <div className="relative z-10 flex justify-between items-center mb-3">
        <span className="font-mono text-[8px] tracking-widest text-neutral-500 uppercase">
          // PREVIEW EN VIVO
        </span>
        <span className="flex items-center gap-1 font-mono text-[8px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SIM
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center">

        {/* AUDITBOT: chat de WhatsApp llegando */}
        {projectId === 'auditbot' && (
          <div className="space-y-2">
            {[
              { side: 'left', text: '📋 Paso 2/5: foto de la heladera de vacunas', cls: 'bg-slate-800 text-slate-200 mr-auto rounded-tl-none' },
              { side: 'right', text: '📷 Evidencia enviada · GPS ✓', cls: 'bg-emerald-700 text-white ml-auto rounded-tr-none' },
              { side: 'left', text: '⚠️ 9.2°C — Desvío detectado. Alerta escalada al panel.', cls: 'bg-rose-950/90 text-rose-200 border border-rose-800/60 mr-auto rounded-tl-none' },
            ].map((b, i) => (
              <motion.div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg text-[10px] leading-snug ${b.cls}`}
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 0] }}
                transition={{ duration: 6.5, times: [0, 0.08, 0.85, 1], repeat: Infinity, delay: i * 1.4 }}
              >
                {b.text}
              </motion.div>
            ))}
          </div>
        )}

        {/* TALLERHUB: forma de onda de voz + transcripción */}
        {projectId === 'tallerhub' && (
          <div className="space-y-3">
            <div className="flex items-end justify-center gap-1 h-16">
              {Array.from({ length: 22 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-teal-400 rounded-t origin-bottom"
                  style={{ height: '100%' }}
                  animate={{ scaleY: [0.15, 0.9, 0.3, 0.7, 0.15] }}
                  transition={{ duration: 1.1 + (i % 5) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.1 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 font-mono text-[9px] text-teal-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>OT-1182 · dictado del mecánico</span>
              <motion.span
                className="text-neutral-500"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                transcribiendo…
              </motion.span>
            </div>
          </div>
        )}

        {/* KERNIUM: plano de planta con unidad en movimiento */}
        {projectId === 'kernium' && (
          <div className="relative h-28 rounded-lg border border-neutral-800 bg-black/40 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 24 30 L 110 30 L 110 78 L 210 78 L 210 46 L 290 46"
                fill="none"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
            <span className="absolute top-2 left-3 font-mono text-[7px] text-neutral-500 uppercase">Rack A</span>
            <span className="absolute bottom-2 right-3 font-mono text-[7px] text-neutral-500 uppercase">Bahía de Carga</span>

            {/* Unidad recorriendo la ruta */}
            <motion.div
              className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              animate={{
                left: ['6%', '34%', '34%', '66%', '66%', '90%'],
                top: ['28%', '28%', '70%', '70%', '40%', '40%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Alerta predictiva pulsando */}
            <div className="absolute left-[34%] top-[70%]">
              <span className="absolute -inset-2 rounded-full bg-rose-500/20 animate-ping" />
              <span className="relative block w-2 h-2 rounded-full bg-rose-500" />
            </div>
            <span className="absolute left-[40%] top-[78%] font-mono text-[7px] text-rose-400">ZE-12 · mantenimiento</span>
          </div>
        )}

        {/* FLUJONORTE: pipeline de datos fluyendo */}
        {projectId === 'flujonorte' && (
          <div className="space-y-4">
            <div className="relative flex items-center justify-between gap-2 font-mono text-[8px]">
              {['Planillas', 'n8n', 'Metabase'].map((node, i) => (
                <div
                  key={node}
                  className={`px-2.5 py-2 rounded-lg border text-center flex-1 ${
                    i === 1
                      ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300'
                      : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                  }`}
                >
                  {node}
                </div>
              ))}
              {/* Dato viajando por el pipeline */}
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
                animate={{ left: ['8%', '48%', '88%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Mini dashboard creciendo */}
            <div className="flex items-end justify-between gap-1.5 h-12 px-1">
              {[35, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t origin-bottom ${i === 7 ? 'bg-emerald-500' : 'bg-neutral-700'}`}
                  style={{ height: `${h}%` }}
                  animate={{ scaleY: [0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2.2, delay: i * 0.12, ease: 'easeOut' }}
                />
              ))}
            </div>
            <p className="font-mono text-[8px] text-neutral-500 text-center">reportes consolidados en tiempo real</p>
          </div>
        )}

      </div>
    </div>
  );
}
