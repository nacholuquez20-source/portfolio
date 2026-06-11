import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Settings, ShieldAlert } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  // Simulator state triggers
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 1. AuditBot states — cadena de frío
  const [temperature, setTemperature] = useState<number>(4.5);
  const [threshold, setThreshold] = useState<number>(8);
  const [deviationForced, setDeviationForced] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  // 2. TallerHub states — voz a orden de trabajo
  const [service, setService] = useState<'frenos' | 'motor' | 'suspension'>('frenos');
  const [npsEnabled, setNpsEnabled] = useState<boolean>(true);
  const [orderProgress, setOrderProgress] = useState<number>(15);
  const [voiceLogs, setVoiceLogs] = useState<string[]>([]);

  // 3. Kernium states — flota interna
  const [powerSaving, setPowerSaving] = useState<boolean>(false);
  const [reportInterval, setReportInterval] = useState<number>(5);
  const [unitIndex, setUnitIndex] = useState<number>(0);
  const [bottleneck, setBottleneck] = useState<boolean>(false);

  // 4. FlujoNorte states — pipeline de datos
  const [recordsSynced, setRecordsSynced] = useState<number>(128);
  const [outOfRange, setOutOfRange] = useState<boolean>(false);

  const addLog = (msg: string, setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    const time = new Date().toLocaleTimeString();
    setFn((prev) => [`[${time}] ${msg}`, ...prev].slice(0, 15));
  };

  const currentTemp = deviationForced ? 9.2 : temperature;
  const hasDeviation = currentTemp > threshold;

  // Simulation clock
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (project.id === 'auditbot') {
        if (hasDeviation) {
          addLog(`DESVÍO: Heladera de vacunas a ${currentTemp.toFixed(1)}°C (límite ${threshold}°C). Alerta escalada al panel.`, setLogs);
        } else if (Math.random() > 0.6) {
          addLog(`CHECKLIST: Evidencia validada. Cadena de frío estable a ${currentTemp.toFixed(1)}°C.`, setLogs);
        }
      }

      if (project.id === 'tallerhub') {
        setOrderProgress((p) => Math.min(100, p + (Math.random() * 6 + 2)));
        if (Math.random() > 0.5) {
          const frases: Record<string, string[]> = {
            frenos: ['"...pastillas al 20%, disco delantero con rebaba..."', '"...recomiendo cambio de pastillas y rectificado..."'],
            motor: ['"...ruido en frío del lado de la distribución..."', '"...correa con desgaste visible, tensor flojo..."'],
            suspension: ['"...amortiguador trasero derecho transpirado..."', '"...bujes de parrilla con juego, golpeteo en pozos..."'],
          };
          const opts = frases[service];
          addLog(`VOZ→TEXTO: ${opts[Math.floor(Math.random() * opts.length)]}`, setVoiceLogs);
        }
      }

      if (project.id === 'kernium') {
        setUnitIndex((i) => (i + 1) % 4);
      }

      if (project.id === 'flujonorte') {
        setRecordsSynced((total) => total + Math.floor(Math.random() * 4 + 1));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, project.id, hasDeviation, currentTemp, threshold, service]);

  // Initial populate logs
  useEffect(() => {
    if (project.id === 'auditbot') {
      setLogs([
        `[${new Date().toLocaleTimeString()}] Auditoría iniciada vía WhatsApp Business.`,
        `[${new Date().toLocaleTimeString()}] Presencia confirmada por geolocalización.`,
        `[${new Date().toLocaleTimeString()}] Esperando evidencia fotográfica de cadena de frío...`,
      ]);
    }
    if (project.id === 'tallerhub') {
      setVoiceLogs([
        `[${new Date().toLocaleTimeString()}] Micrófono del box activo. Transcripción en tiempo real lista.`,
        `[${new Date().toLocaleTimeString()}] Orden de trabajo #OT-1182 abierta.`,
      ]);
    }
  }, [project.id]);

  // Posiciones de unidades para el plano de planta de Kernium
  const fleetUnits = [
    { x: 50, y: 35, name: 'Montacargas MT-42', desc: 'Trasladando pallets a Rack B' },
    { x: 140, y: 50, name: 'Apilador AP-05', desc: 'Carga en bahía de descarga' },
    { x: 230, y: 38, name: 'Zorra ZE-12', desc: 'Mantenimiento preventivo programado' },
    { x: 310, y: 62, name: 'Montacargas MT-43', desc: 'Ruta optimizada por pasillo lateral' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 15 }}
        className="bg-[#F8F8F5] w-full max-w-6xl rounded-2xl border border-neutral-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >

        {/* Modal Header */}
        <div className="bg-[#F1F1ED] px-6 py-4 md:px-8 border-b border-neutral-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              DETALLES DEL PROYECTO & SIMULADOR
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full border border-neutral-300 bg-white cursor-pointer hover:bg-neutral-100 transition-colors"
            id="close-project-details"
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 md:p-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Tech Details & Specs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight leading-none mb-4">
                {project.title}
              </h2>

              <p className="text-base text-neutral-600 font-light leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Facts row */}
            <div className="grid grid-cols-3 gap-4 border-y border-neutral-200/80 py-5">
              {project.metrics.map((m) => (
                <div key={m.label} className="space-y-1">
                  <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wide leading-none">{m.label}</p>
                  <p className="font-serif text-lg md:text-xl font-semibold text-[#1c1c1a] leading-snug">{m.value}</p>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 font-sans text-sm">
              <div>
                <h4 className="font-mono text-xs text-neutral-400 uppercase font-semibold mb-1">// EL PROBLEMA</h4>
                <p className="text-neutral-600 leading-relaxed font-light">{project.challenge}</p>
              </div>
              <div className="pt-2">
                <h4 className="font-mono text-xs text-neutral-400 uppercase font-semibold mb-1">// LA SOLUCIÓN</h4>
                <p className="text-neutral-600 leading-relaxed font-light">{project.solution}</p>
              </div>
            </div>

            {/* Technology Badge Stack */}
            <div>
              <h4 className="font-mono text-xs text-neutral-400 uppercase font-semibold mb-3">// STACK TECNOLÓGICO</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-neutral-600 bg-white border border-neutral-200 px-3 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: INTERACTIVE SIMULATOR */}
          <div className="lg:col-span-6 bg-neutral-900 p-6 md:p-8 rounded-xl text-white flex flex-col justify-between h-full min-h-[460px] relative overflow-hidden shadow-inner border border-stone-800">

            {/* Header info simulator */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 shrink-0 z-10 relative">
              <div className="flex items-center gap-2">
                <Settings className={`w-4 h-4 text-emerald-400 ${isPlaying ? 'animate-spin' : ''}`} />
                <span className="font-mono text-xs tracking-wider text-neutral-400">
                  SIMULADOR CONCEPTUAL DEL PRODUCTO
                </span>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-white/10 hover:bg-white/20 p-1 rounded font-mono text-[10px] text-neutral-300 hover:text-white transition cursor-pointer"
                id="simulator-toggle-play"
              >
                {isPlaying ? 'PAUSAR' : 'REANUDAR'}
              </button>
            </div>

            {/* SIMULATOR RENDER LAYER */}
            <div className="flex-1 flex flex-col justify-center space-y-6 z-10 relative">

              {/* CASO: AUDITBOT — Cadena de frío */}
              {project.id === 'auditbot' && (
                <div className="space-y-6">
                  <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-2 text-left">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase">Temperatura Heladera de Vacunas</span>
                    <div className="flex items-baseline justify-between">
                      <span className={`font-mono text-3xl font-bold ${hasDeviation ? 'text-rose-400' : 'text-cyan-400'}`}>
                        {currentTemp.toFixed(1)}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">°C</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => {
                        setTemperature(parseFloat(e.target.value));
                        setDeviationForced(false);
                      }}
                      className="w-full accent-cyan-400"
                      id="sim-temp-slider"
                    />
                  </div>

                  {/* Threshold Settings */}
                  <div className="flex justify-between items-center text-xs font-mono bg-black/20 p-3 rounded-lg border border-white/5 text-left">
                    <div>
                      <span className="text-neutral-400 font-semibold block uppercase text-[10px]">Umbral Reglamentario</span>
                      <span className="text-neutral-300 font-light pt-0.5">Desvío por encima de {threshold}°C</span>
                    </div>
                    <input
                      type="number"
                      value={threshold}
                      onChange={(e) => setThreshold(parseInt(e.target.value) || 8)}
                      className="bg-black/50 border border-white/10 rounded px-2 py-1 w-16 text-center text-emerald-400 font-semibold"
                      id="sim-threshold-input"
                    />
                  </div>

                  {/* Alarm display */}
                  <div
                    className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-colors duration-400 ${
                      hasDeviation ? 'bg-rose-950/40 border-rose-700' : 'bg-emerald-950/30 border-emerald-800/50'
                    }`}
                  >
                    <ShieldAlert
                      className={`w-5 h-5 shrink-0 mt-0.5 ${hasDeviation ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}
                    />
                    <div>
                      <h5 className="font-mono text-xs font-bold uppercase tracking-wide">
                        {hasDeviation ? 'DESVÍO_CADENA_DE_FRÍO' : 'DENTRO_DE_NORMA'}
                      </h5>
                      <p className="text-[11px] text-neutral-400 font-light mt-1">
                        {hasDeviation
                          ? 'Alerta escalada por severidad al panel web. El farmacéutico recibe la acción correctiva por WhatsApp.'
                          : 'Evidencia fotográfica validada. La auditoría avanza al siguiente paso de la checklist.'}
                      </p>
                    </div>
                  </div>

                  {/* Injection actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeviationForced(!deviationForced)}
                      className={`flex-1 font-mono text-[10px] py-2.5 rounded hover:opacity-90 cursor-pointer ${
                        deviationForced ? 'bg-[#1c1c1a] text-white border border-white/30' : 'bg-rose-600 text-white'
                      }`}
                      id="force-deviation-btn"
                    >
                      {deviationForced ? '✓ RESOLVER DESVÍO' : '⚠ SIMULAR HELADERA DESCALIBRADA'}
                    </button>
                    <button
                      onClick={() => {
                        setTemperature(4.5);
                        setDeviationForced(false);
                        setLogs([`[${new Date().toLocaleTimeString()}] Auditoría reiniciada por el operador.`]);
                      }}
                      className="bg-white/15 hover:bg-white/20 p-2.5 rounded font-mono text-[10px] text-white shrink-0 font-bold transition cursor-pointer"
                      id="reset-auditbot-sim"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              )}

              {/* CASO: TALLERHUB — Voz a orden de trabajo */}
              {project.id === 'tallerhub' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase">Tipo de Servicio</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value as typeof service)}
                        className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-2 font-mono text-xs text-stone-300 cursor-pointer focus:outline-none"
                      >
                        <option value="frenos">Frenos</option>
                        <option value="motor">Motor / Distribución</option>
                        <option value="suspension">Suspensión / Tren delantero</option>
                      </select>
                    </div>

                    <div className="space-y-1 flex flex-col justify-end">
                      <div className="flex justify-between items-center bg-black/30 px-3 py-2 rounded-lg border border-white/5">
                        <span className="font-mono text-[10px] uppercase">NPS Automático</span>
                        <button
                          onClick={() => setNpsEnabled(!npsEnabled)}
                          className={`font-mono text-[10px] px-3 py-1 rounded transition cursor-pointer ${
                            npsEnabled ? 'bg-emerald-600 text-white' : 'bg-neutral-700 text-neutral-300'
                          }`}
                        >
                          {npsEnabled ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Audio waveform: el mecánico dicta mientras trabaja */}
                  <div className="bg-black p-4 rounded-lg border border-white/10 relative h-20 overflow-hidden flex items-end justify-center">
                    <div className="absolute top-2 left-3 font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                      Dictado del Mecánico — Transcripción en Vivo
                    </div>
                    <div className="flex items-end gap-0.5 w-full h-10">
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const randomHeight = isPlaying ? Math.random() * 40 + 3 : 4;
                        return (
                          <div
                            key={idx}
                            style={{ height: `${randomHeight}px` }}
                            className="flex-1 transition-all duration-150 bg-teal-400"
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Order progress */}
                  <div className="space-y-1 z-10">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span>Orden de Trabajo #OT-1182:</span>
                      <span className={`font-bold ${orderProgress >= 100 ? 'text-emerald-400' : 'text-teal-300'}`}>
                        {orderProgress >= 100 ? 'Lista para entrega' : `${orderProgress.toFixed(0)}% completa`}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, orderProgress)}%` }}
                        className="h-full transition-all duration-300 bg-teal-500"
                      />
                    </div>
                    <p className="text-[10px] font-mono text-neutral-500 pt-1">
                      {npsEnabled
                        ? 'Al cerrar la orden, el cliente recibe seguimiento y encuesta NPS por WhatsApp.'
                        : 'Encuesta NPS desactivada para esta orden.'}
                    </p>
                  </div>
                </div>
              )}

              {/* CASO: KERNIUM — Plano de planta y flota */}
              {project.id === 'kernium' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-2">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">Modo Telemetría</span>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-sm font-semibold">
                          {powerSaving ? 'AHORRO ENERGÍA' : 'MÁX. PRECISIÓN'}
                        </span>
                        <input
                          type="checkbox"
                          checked={powerSaving}
                          onChange={(e) => setPowerSaving(e.target.checked)}
                          className="w-4 h-4 cursor-pointer accent-amber-500"
                        />
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded-lg border border-white/5 space-y-1">
                      <span className="font-mono text-[9px] text-neutral-400 uppercase">Reporte cada: {reportInterval} min</span>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        value={reportInterval}
                        onChange={(e) => setReportInterval(parseInt(e.target.value))}
                        className="w-full accent-amber-500 pt-1"
                      />
                    </div>
                  </div>

                  {/* Plano de planta con unidades */}
                  <div className="bg-black p-4 rounded-lg border border-white/10 text-left space-y-3">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase">PLANO DE PLANTA — FLOTA EN VIVO</span>

                    <div className="relative h-24 bg-[#0d1117] rounded border border-neutral-800 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#FAF9F5 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                      <svg className="w-full h-full">
                        <path
                          d="M 30 30 L 130 30 L 130 70 L 240 70 L 240 40 L 330 40"
                          fill="none"
                          stroke={bottleneck ? '#ef4444' : '#10b981'}
                          strokeWidth="2"
                          strokeDasharray={bottleneck ? '4 4' : 'none'}
                        />
                        {fleetUnits.map((u, idx) => (
                          <circle
                            key={idx}
                            cx={u.x}
                            cy={u.y}
                            r={idx === unitIndex ? '6' : '3'}
                            className={`transition ${idx === unitIndex ? 'fill-amber-500 animate-pulse' : 'fill-emerald-500/50'}`}
                          />
                        ))}
                      </svg>

                      <div className="absolute bottom-1 left-2 right-2 flex justify-between items-center text-[10px] font-mono bg-black/60 p-1 rounded border border-white/5">
                        <span className="text-amber-400">{fleetUnits[unitIndex].name}</span>
                        <span className="text-neutral-400 text-right truncate max-w-[170px]">
                          {fleetUnits[unitIndex].desc}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottleneck trigger */}
                  <div
                    className={`p-4 rounded-lg text-left border flex justify-between items-center ${
                      bottleneck ? 'bg-amber-950/40 border-amber-500/80' : 'bg-black/35 border-white/10'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold block uppercase">Estado del Pasillo Central</span>
                      <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                        {bottleneck
                          ? 'Cuello de botella detectado: rutas recalculadas por pasillos laterales.'
                          : 'Flujo libre. Rutas internas operando en trayecto óptimo.'}
                      </p>
                    </div>
                    <button
                      onClick={() => setBottleneck(!bottleneck)}
                      className={`font-mono text-[9px] py-1.5 px-3 rounded transition cursor-pointer ${
                        bottleneck ? 'bg-amber-500 text-black font-semibold' : 'bg-white/10 text-white'
                      }`}
                    >
                      {bottleneck ? '✓ LIBERAR PASILLO' : 'SIMULAR CONGESTIÓN'}
                    </button>
                  </div>
                </div>
              )}

              {/* CASO: FLUJONORTE — Pipeline de datos */}
              {project.id === 'flujonorte' && (
                <div className="space-y-6">
                  {/* Pipeline visual: Sheets → n8n → Metabase */}
                  <div className="bg-black/40 p-5 rounded-lg border border-white/5 text-left space-y-4">
                    <span className="font-mono text-[9px] text-neutral-400 uppercase">PIPELINE DE CONSOLIDACIÓN AUTOMÁTICA</span>

                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      {['Planillas de Campo', 'n8n Workflows', 'Dashboard Metabase'].map((node, idx) => (
                        <React.Fragment key={node}>
                          <div className={`px-3 py-2.5 rounded-lg border text-center flex-1 ${
                            idx === 1
                              ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300'
                              : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                          }`}>
                            {node}
                          </div>
                          {idx < 2 && (
                            <span className={`shrink-0 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-neutral-600'}`}>→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-white/5">
                      <span className="text-neutral-400">Registros consolidados hoy:</span>
                      <span className="text-emerald-400 font-bold text-base">{recordsSynced}</span>
                    </div>
                  </div>

                  {/* Quality alert trigger */}
                  <div
                    className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-colors duration-400 ${
                      outOfRange ? 'bg-rose-950/40 border-rose-700' : 'bg-emerald-950/30 border-emerald-800/50'
                    }`}
                  >
                    <ShieldAlert
                      className={`w-5 h-5 shrink-0 mt-0.5 ${outOfRange ? 'text-rose-500 animate-pulse' : 'text-emerald-500'}`}
                    />
                    <div>
                      <h5 className="font-mono text-xs font-bold uppercase tracking-wide">
                        {outOfRange ? 'ALERTA_DE_CALIDAD' : 'INDICADORES_EN_RANGO'}
                      </h5>
                      <p className="text-[11px] text-neutral-400 font-light mt-1">
                        {outOfRange
                          ? 'Indicador de calidad fuera de rango: notificación automática enviada al responsable de turno.'
                          : 'Producción y calidad dentro de los parámetros definidos. Sin intervención necesaria.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setOutOfRange(!outOfRange)}
                    className={`w-full font-mono text-[10px] py-2.5 rounded hover:opacity-90 cursor-pointer ${
                      outOfRange ? 'bg-[#1c1c1a] text-white border border-white/30' : 'bg-rose-600 text-white'
                    }`}
                    id="force-quality-alert-btn"
                  >
                    {outOfRange ? '✓ NORMALIZAR INDICADOR' : '⚠ SIMULAR DATO FUERA DE RANGO'}
                  </button>
                </div>
              )}

            </div>

            {/* Terminal Live logs output footer */}
            <div className="mt-6 border-t border-white/10 pt-4 text-left font-mono text-[10px] text-neutral-400 z-10 relative">
              <span className="block font-bold text-neutral-400 pr-2 uppercase pb-2">
                &gt;_ REGISTROS DEL SISTEMA EN VIVO (SIMULACIÓN)
              </span>
              <div className="bg-black/50 p-2.5 rounded border border-white/5 h-24 overflow-y-auto space-y-1 scrollbar-thin select-none">
                {project.id === 'auditbot' ? (
                  logs.map((log, index) => (
                    <div key={index} className="truncate select-none text-cyan-300">
                      {log}
                    </div>
                  ))
                ) : project.id === 'tallerhub' ? (
                  voiceLogs.map((log, index) => (
                    <div key={index} className="truncate select-none text-teal-300">
                      {log}
                    </div>
                  ))
                ) : (
                  <div>
                    <span className="text-yellow-400">[SYSTEM]</span> Motor de simulación activo.
                    <br />
                    <span className="text-emerald-400">[INFO]</span> Datos ilustrativos del funcionamiento del producto.
                    <br />
                    <span className="text-purple-400">[OK]</span> Telemetría sincronizada cada {project.id === 'kernium' ? `${reportInterval} min` : '5 min'}.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
