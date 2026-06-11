import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, ChevronRight, ChevronLeft, RefreshCw, 
  Truck, ShieldAlert, FileText, Navigation, CheckCircle, 
  MessageSquare, Camera, AlertTriangle, Layout, CheckSquare, 
  ArrowRight, Landmark, Zap, BarChart2, Check, Send, PhoneCall
} from 'lucide-react';

interface ScenarioStep {
  title: string;
  shortDesc: string;
  systemAction: string;
  badge: string;
}

export default function InteractiveDemos() {
  const [activeProduct, setActiveProduct] = useState<'kernium' | 'auditbot'>('kernium');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Custom states for interactive elements in Kernium
  const [filterSucursal, setFilterSucursal] = useState<string>('Norte');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [workOrderCreated, setWorkOrderCreated] = useState<boolean>(false);
  const [activeFleetTab, setActiveFleetTab] = useState<'all' | 'maintenance' | 'optimal'>('all');
  
  // Custom states for interactive elements in AuditBot
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; image?: string; devio?: boolean; done?: boolean }>>([
    { sender: 'bot', text: '👋 Hola Ignacio, aquí el asistente de AuditBot. Iniciamos la auditoría programada de hoy para la sucursal Palermo-104.' },
    { sender: 'bot', text: 'Por favor, confirma que estás en el establecimiento presionando el botón de abajo.' }
  ]);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [resolvedDeviation, setResolvedDeviation] = useState<boolean>(false);

  // Kernium Steps configuration
  const kerniumSteps: ScenarioStep[] = [
    {
      title: 'Panel Control de Flota',
      shortDesc: 'El gerente operativo supervisa la rentabilidad y disponibilidad de la flota de montacargas e hidráulicos.',
      systemAction: 'Mostrando unidades registradas, estado operativo y horas de trabajo consolidado.',
      badge: 'Supervisión en Tiempo Real'
    },
    {
      title: 'Mantenimiento Predictivo',
      shortDesc: 'La IA analiza micro-vibraciones y picos térmicos, prediciendo una falla de embrague con 92% de precisión.',
      systemAction: 'Aviso crítico de falla latente detectada. Programar servicio técnico urgente.',
      badge: 'Alerta Predictiva'
    },
    {
      title: 'Creación de Orden de Trabajo',
      shortDesc: 'Con un solo clic, se despacha la orden técnica con el repuesto requerido ya pre-asignado mecánicamente.',
      systemAction: 'Despachando Orden #OT-2049 al taller central mediante webhook automático.',
      badge: 'Sincronización de Taller'
    },
    {
      title: 'Optimización de Rutas Internas',
      shortDesc: 'El motor calcula trayectorias alternativas dinámicas para evitar cuellos de botella en pasillo central.',
      systemAction: 'Trazado de trayecto optimizado. Ahorro inmediato de un 18% en consumo eléctrico.',
      badge: 'Eficiencia Dinámica'
    },
    {
      title: 'Despacho de Reporte Diario',
      shortDesc: 'El resumen operativo es enviado automáticamente por WhatsApp al supervisor con indicadores clave.',
      systemAction: 'Reporte procesado y emitido con éxito. Estado general de flota consolidado.',
      badge: 'Resumen Automatizado'
    }
  ];

  // AuditBot Steps configuration
  const auditBotSteps: ScenarioStep[] = [
    {
      title: 'Contacto Automatizado',
      shortDesc: 'El bot detecta el horario y distribuye la checklist de auditoría reglamentaria por WhatsApp del farmacéutico.',
      systemAction: 'Invitación a auditoría emitida por Gateway de WhatsApp Business.',
      badge: 'WhatsApp Kickoff'
    },
    {
      title: 'Carga de Evidencias',
      shortDesc: 'El farmacéutico captura directamente una foto de la heladera de vacunas y reporta la temperatura local.',
      systemAction: 'Evidencia de cadena de frío y vencimientos de stock ingresada físicamente.',
      badge: 'Captura y Registro'
    },
    {
      title: 'Detección de Desvíos',
      shortDesc: 'El motor analítico identifica desvío crítico: temperatura de refrigeración descalibrada a 9.2°C (Límite: 8°C).',
      systemAction: 'Alerta reactiva instantánea generada y escalada por severidad crítica.',
      badge: 'Análisis IA Activo'
    },
    {
      title: 'Actualización en Panel Web',
      shortDesc: 'El centro operativo consolida la infracción latente en el mapa de control de riesgos regionales.',
      systemAction: 'Reporte visible inmediatamente en Palermo-104 para los supervisores centrales.',
      badge: 'Doble Validación Central'
    },
    {
      title: 'Acción Correctiva y Cierre',
      shortDesc: 'El técnico calibra la heladera, sube la nueva foto de control y disuelve el desvío de manera auditable.',
      systemAction: 'Acción correctiva aprobada. Auditoría sellada digitalmente.',
      badge: 'Trazabilidad Asegurada'
    }
  ];

  const currentSteps = activeProduct === 'kernium' ? kerniumSteps : auditBotSteps;
  const totalSteps = currentSteps.length;

  // Auto playback mechanism
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % totalSteps);
      }, 7000); // 7 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, activeProduct]);

  // Sync state adaptations when steps or products change
  useEffect(() => {
    // Reset specific states relative to flow steps
    if (activeProduct === 'kernium') {
      if (activeStep < 2) {
        setWorkOrderCreated(false);
      } else if (activeStep >= 2) {
        setWorkOrderCreated(true);
      }
    } else {
      // Setup chats based on current step of AuditBot
      if (activeStep === 0) {
        setChatMessages([
          { sender: 'bot', text: '👋 Hola Ignacio, aquí el asistente de AuditBot. Iniciamos la auditoría programada de hoy para la sucursal Palermo-104.' },
          { sender: 'bot', text: 'Por favor, confirma presionando: [📍 Confirmar Presencia]' }
        ]);
        setResolvedDeviation(false);
      } else if (activeStep === 1) {
        setChatMessages([
          { sender: 'bot', text: '👋 Hola Ignacio, aquí el asistente de AuditBot. Iniciamos la auditoría programada de hoy para la sucursal Palermo-104.' },
          { sender: 'user', text: '📍 Presencia confirmada en Sucursal Palermo-104. Geolocalización certificada.' },
          { sender: 'bot', text: 'Perfecto. Paso 2 de 5: Envía una foto del termómetro digital de la heladera principal de vacunas.' }
        ]);
      } else if (activeStep === 2) {
        setChatMessages([
          { sender: 'bot', text: 'Perfecto. Paso 2 de 5: Envía una foto del termómetro digital de la heladera principal de vacunas.' },
          { sender: 'user', text: 'Enviando imagen del panel de control...', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=60' },
          { sender: 'bot', text: '⚠️ [DESVÍO DETECTADO] El sistema inteligente detectó una lectura de 9.2°C. Esto supera el umbral seguro de 8°C para medicamentos termo-sensibles.' },
          { sender: 'bot', text: '¿Se requiere intervención correctiva inmediata? [Confirmar Alerta]' }
        ]);
      } else if (activeStep === 3) {
        setChatMessages([
          { sender: 'bot', text: '⚠️ [DESVÍO DETECTADO] El sistema inteligente detectó una lectura de 9.2°C. Esto supera el umbral seguro de 8°C para medicamentos termo-sensibles.' },
          { sender: 'user', text: 'Confirmar Alerta' },
          { sender: 'bot', text: '🚨 Alerta distribuida al panel web consolidado. El incidente número #INC-8839 está actualmente abierto para seguimiento supervisor.' }
        ]);
        setResolvedDeviation(false);
      } else if (activeStep === 4) {
        setChatMessages([
          { sender: 'bot', text: '🚨 Alerta distribuida al panel web consolidado. El incidente número #INC-8839 está actualmente abierto para seguimiento supervisor.' },
          { sender: 'user', text: 'He regulado el termostato a nivel 4 y verificado que baje a 4.5°C' },
          { sender: 'bot', text: 'Resolución aprobada por Farmacéutico de turno. Historial auditado y cerrado correctamente. ¡Gracias por asegurar el cumplimiento!' }
        ]);
        setResolvedDeviation(true);
      }
    }
  }, [activeStep, activeProduct]);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % totalSteps);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + totalSteps) % totalSteps);
    setIsPlaying(false);
  };

  const selectProduct = (prod: 'kernium' | 'auditbot') => {
    setActiveProduct(prod);
    setActiveStep(0);
    setIsPlaying(true);
  };

  // Custom function for user interactions in AuditBot Chat simulation
  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    
    const newMsg = { sender: 'user' as const, text: typedMessage };
    setChatMessages(prev => [...prev, newMsg]);
    setTypedMessage('');

    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: '⚙️ Mensaje registrado en la trazabilidad de la auditoría. Procesando actualización del panel...'
      }]);
    }, 1500);
  };

  return (
    <section id="demos" className="py-24 bg-[#FAF9F5] border-t border-b border-neutral-300/40 relative overflow-hidden scroll-mt-20">
      
      {/* Decorative Blueprint or Grid Lines representing tech precision */}
      <div className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-neutral-300/30 pointer-events-none" />
      <div className="absolute inset-y-0 right-6 md:left-12 w-[1px] bg-neutral-300/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header section with modern badge and titles */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1c1a] text-[#F8F8F5] rounded-full text-xs font-mono">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="tracking-widest uppercase text-[9px]">// INTERACTIVE SAAS DEMOS</span>
          </div>
          
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-none">
            Cómo Funciona
          </h2>
          
          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Explora walkthroughs dinámicos reales de mis productos tecnológicos. Interactúa con las pantallas web, chats de monitoreo e infraestructuras de IA como si estuvieran en producción.
          </p>
        </div>

        {/* Product Navigation Switcher - Minimal Industrial tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-neutral-200 pb-4 mb-10">
          <button
            onClick={() => selectProduct('kernium')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer ${
              activeProduct === 'kernium'
                ? 'bg-[#1c1c1a] text-[#F8F8F5] shadow-md'
                : 'bg-white hover:bg-neutral-100 text-neutral-500 border border-neutral-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>KERNIUM // INTRALOGÍSTICA</span>
          </button>
          
          <button
            onClick={() => selectProduct('auditbot')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-xs tracking-wider transition-all cursor-pointer ${
              activeProduct === 'auditbot'
                ? 'bg-[#1c1c1a] text-[#F8F8F5] shadow-md'
                : 'bg-white hover:bg-neutral-100 text-neutral-500 border border-neutral-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AUDITBOT // AUDITORÍA FARMACIAS</span>
          </button>

          <div className="ml-auto flex items-center gap-2 pl-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              Entorno Simulador Activo
            </span>
          </div>
        </div>

        {/* Outer Desktop Workspace Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT SIDEBAR: Step progression & interactive controllers */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 bg-neutral-100/50 p-6 sm:p-8 rounded-2xl border border-neutral-200 text-left">
            
            <div className="space-y-6">
              {/* Product Slogan */}
              <div>
                <p className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase">
                  {activeProduct === 'kernium' ? '// SISTEMA DE FLOTA Y RUTAS' : '// COMPLIANCE EN TIEMPO REAL'}
                </p>
                <h3 className="font-serif text-2xl font-bold mt-1 text-neutral-900">
                  {activeProduct === 'kernium' ? 'Kernium Operations' : 'AuditBot Farmacias'}
                </h3>
                <p className="text-xs text-neutral-550 mt-1.5 italic">
                  {activeProduct === 'kernium' 
                    ? '"Rutas, mantenimiento y reportes en un solo tablero con IA."' 
                    : '"Una auditoría completa y trazada directamente desde WhatsApp."'}
                </p>
              </div>

              {/* Progress Steps Timeline */}
              <div className="relative border-l border-neutral-350 ml-2 space-y-4 py-2">
                {currentSteps.map((step, idx) => {
                  const isCurrent = idx === activeStep;
                  const isPast = idx < activeStep;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveStep(idx);
                        setIsPlaying(false);
                      }}
                      className="group flex items-start gap-4 text-left w-full pl-4 relative cursor-pointer"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isCurrent 
                          ? 'bg-[#1c1c1a] border-[#1c1c1a] scale-125 shadow-sm' 
                          : isPast 
                            ? 'bg-[#1c1c1a]/80 border-neutral-805' 
                            : 'bg-neutral-200 border-neutral-300 group-hover:border-neutral-400'
                      }`} />

                      <div className="flex flex-col">
                        <span className={`font-mono text-[9px] uppercase tracking-wider ${
                          isCurrent ? 'text-[#1c1c1a] font-bold' : 'text-neutral-400'
                        }`}>
                          Paso {idx + 1} // {step.badge}
                        </span>
                        <span className={`font-sans text-sm font-medium transition-colors ${
                          isCurrent ? 'text-neutral-900 font-semibold' : 'text-neutral-500 group-hover:text-neutral-700'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step detail card */}
              <div className="bg-white p-5 rounded-xl border border-neutral-205 shadow-sm space-y-2.5">
                <span className="font-mono text-[9px] px-2 py-0.5 bg-neutral-100 text-neutral-55 tracking-wider font-semibold rounded uppercase">
                  Acción en Curso
                </span>
                <p className="text-xs text-neutral-600 leading-relaxed font-light">
                  {currentSteps[activeStep].shortDesc}
                </p>
                <div className="pt-2 border-t border-neutral-100">
                  <p className="text-[10px] font-mono text-neutral-400">
                    <span className="text-[#1c1c1a] font-bold">Estado:</span> {currentSteps[activeStep].systemAction}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Player Controls */}
            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                
                {/* Manual step togglers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    className="p-2 bg-white text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition cursor-pointer"
                    title="Anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="p-2 bg-white text-neutral-700 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition cursor-pointer"
                    title="Siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Auto Play / Pause Toggle Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                    isPlaying 
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-white text-neutral-500 border-neutral-200 hover:text-neutral-800'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                      <span>Auto-Play ON</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-neutral-500 fill-neutral-500" />
                      <span>Reproducir Demo</span>
                    </>
                  )}
                </button>

              </div>

              {/* Progress bar representing timeline ticks */}
              <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                <motion.div 
                  key={`${activeProduct}-${activeStep}-${isPlaying}`}
                  initial={{ width: '0%' }}
                  animate={isPlaying ? { width: '100%' } : { width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                  transition={isPlaying ? { duration: 7, ease: 'linear' } : { duration: 0.3 }}
                  className="bg-[#1c1c1a] h-full rounded-full"
                />
              </div>

              <p className="text-[9px] font-mono text-neutral-400 text-center uppercase tracking-widest">
                Paso {activeStep + 1} de {totalSteps} visualizado
              </p>
            </div>

          </div>

          {/* RIGHT SCREEN: HIGH-FIDELITY WEB/MOBILE APPLICATION SIMULATOR */}
          <div className="lg:col-span-8 flex flex-col bg-neutral-900 text-[#F8F8F5] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden relative min-h-[550px]">
            
            {/* Real Operating system style window bar header */}
            <div className="bg-[#1c1c1a] px-4 py-3 flex items-center justify-between border-b border-neutral-800 select-none">
              
              {/* Colored Circles */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block opacity-80" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block opacity-80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block opacity-80" />
              </div>

              {/* URL simulation string bar */}
              <div className="bg-neutral-800/80 px-4 py-1 rounded-lg text-[10px] font-mono text-neutral-400 tracking-wide max-w-sm w-3/5 truncate text-center select-none border border-neutral-700/30">
                {activeProduct === 'kernium' 
                  ? `app.kernium.io/fleet-status?sucursal=${filterSucursal}&step=${activeStep + 1}`
                  : `auditbot.io/app/workspace/pharmacy-104?step=${activeStep + 1}`}
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                <span>SECURE // WS</span>
              </div>

            </div>

            {/* MAIN APP SIMULATION AREA */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between overflow-y-auto min-h-[460px]">
              
              {activeProduct === 'kernium' ? (
                /* ==================== KERNIUM SCREEN SIMULATION ==================== */
                <div className="flex-1 flex flex-col justify-between h-full space-y-6">
                  
                  {/* Dashboard Header summary stats */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-850 p-4 rounded-xl border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FAF9F5] text-neutral-900 p-2 rounded-lg">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">// DEPARTAMENTO INTRALOGÍSTICA</span>
                        <h4 className="font-sans text-sm font-semibold text-white">Consola de Control Kernium v2.9</h4>
                      </div>
                    </div>

                    {/* Compact Interactive Filters */}
                    <div className="flex gap-2 text-[11px] font-mono">
                      <button 
                        onClick={() => setFilterSucursal(filterSucursal === 'Norte' ? 'Oeste' : 'Norte')}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-2.5 py-1 rounded border border-neutral-750 transition cursor-pointer"
                      >
                        Sucursal: {filterSucursal}
                      </button>
                      <button 
                        onClick={() => selectProduct('auditbot')}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded border border-neutral-750 transition cursor-pointer"
                      >
                        Ir a AuditBot ↗
                      </button>
                    </div>
                  </div>

                  {/* STEP SPECIFIC VIEWS FOR KERNIUM */}
                  <div className="flex-1 flex flex-col justify-center">
                    
                    {activeStep === 0 && (
                      /* KERNIUM STEP 1: FLEET GRID */
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center bg-neutral-850 p-2 px-3 rounded-lg">
                          <p className="font-mono text-xs text-neutral-300 font-semibold uppercase">Vehículos de Carga Distribuidos</p>
                          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">✓ Todo Estable</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[
                            { name: 'Montacargas Yale MT-42', status: 'Operativo', limit: '0.4%', use: '82%', load: '18 hrs', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' },
                            { name: 'Apilador Crown AP-05', status: 'Operativo', limit: '1.2%', use: '69%', load: '12 hrs', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' },
                            { name: 'Zorra Eléctrica ZE-12', status: 'Alerta', limit: '8.4%', use: '94%', load: '22 hrs', color: 'text-amber-500 border-amber-500/20 bg-amber-500/10 animate-pulse' }
                          ].map((item, idx) => (
                            <div key={idx} className="bg-neutral-850 border border-neutral-800 p-4 rounded-xl space-y-3 relative hover:border-neutral-700 transition duration-300">
                              <div className="flex justify-between items-start">
                                <h5 className="font-sans text-xs font-semibold text-white truncate max-w-[130px]">{item.name}</h5>
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${item.color}`}>
                                  {item.status}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-neutral-400">
                                <div>Uso: <span className="text-white font-semibold">{item.use}</span></div>
                                <div>Horas: <span className="text-white font-semibold">{item.load}</span></div>
                                <div className="col-span-2">Riesgo Fallas: <span className="text-white font-semibold">{item.limit}</span></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeStep === 1 && (
                      /* KERNIUM STEP 2: PREDICTIVE WARNING CARD */
                      <div className="bg-neutral-850 p-6 rounded-xl border border-rose-500/30 text-left space-y-4">
                        <div className="flex items-center gap-3 border-b border-rose-500/10 pb-3">
                          <div className="bg-rose-500/20 text-rose-400 p-2 rounded-lg border border-rose-500/40">
                            <ShieldAlert className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-mono text-[9px] text-rose-400 uppercase tracking-widest font-bold">ALERTA PREDICTIVA IA</span>
                            <h4 className="font-sans text-sm font-semibold text-white">Zorra Eléctrica ZE-12 - Análisis Vibracional Crítico</h4>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed font-light">
                          Se identificó un patrón de oscilación armónica anómala en el árbol de transmisión rotativo de la unidad. El desgaste de fricción predice una rotura catastrófica inminente de rodamientos.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                          <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-400 font-mono">Prob. Ruptura</p>
                            <p className="text-base font-semibold text-rose-400 font-mono mt-0.5">92.4%</p>
                          </div>
                          <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-400 font-mono">Ventana de Uso</p>
                            <p className="text-base font-semibold text-amber-400 font-mono mt-0.5">&lt; 48 Horas</p>
                          </div>
                          <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-400 font-mono">Pico Térmico</p>
                            <p className="text-base font-semibold text-white font-mono mt-0.5">89.5 °C</p>
                          </div>
                          <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800 text-center">
                            <p className="text-[10px] text-neutral-400 font-mono">Nivel Severidad</p>
                            <p className="text-base font-semibold text-rose-500 font-mono mt-0.5">V-CRÍTICO</p>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button 
                            onClick={handleNext}
                            className="bg-[#1c1c1a]/95 text-white hover:bg-neutral-800 text-xs font-mono px-4 py-2 rounded-lg border border-neutral-700 animate-bounce cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Generar Orden Preventiva</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}

                    {activeStep === 2 && (
                      /* KERNIUM STEP 3: WORK ORDER FORM FLOW */
                      <div className="bg-neutral-850 p-5 rounded-xl border border-neutral-800 text-left space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#F8F8F5]" />
                            <h4 className="font-sans text-xs font-semibold text-white">Orden de Trabajo Digital // ID #OT-2049</h4>
                          </div>
                          <span className="bg-emerald-400/15 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-400/30">Pre-Aprobado por IA</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light text-neutral-300">
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 block font-mono">Equipo Destinatario</span>
                            <p className="bg-neutral-900 p-2 rounded border border-neutral-800 text-white font-mono">Zorra Eléctrica ZE-12</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 block font-mono">Taller Asignado</span>
                            <p className="bg-neutral-900 p-2 rounded border border-neutral-800 text-white font-mono">Box Técnico - Nave Norte</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 block font-mono">Kit De Repuesto Requerido</span>
                            <p className="bg-neutral-900 p-2 rounded border border-neutral-800 text-white font-mono">Rodamiento Cónico SKF + Brida A-4</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-neutral-400 block font-mono">Acción Técnica Predeterminada</span>
                            <p className="bg-neutral-900 p-2 rounded border border-neutral-800 text-white font-mono">Reemplazo e Inyección Lubricante</p>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <div className="text-[10px] text-neutral-400 font-mono">
                            {workOrderCreated ? '✓ Orden transmitida por Webhook' : 'Estado: Listo para transmitir'}
                          </div>
                          <button
                            onClick={() => setWorkOrderCreated(true)}
                            className={`px-4 py-2 font-mono text-[11px] rounded transition duration-300 cursor-pointer ${
                              workOrderCreated 
                                ? 'bg-emerald-600 text-white border border-emerald-500' 
                                : 'bg-[#F8F8F5] text-neutral-900 hover:bg-neutral-100'
                            }`}
                          >
                            {workOrderCreated ? '✓ DESPACHADA AL TALLER' : 'EMITIR ORDEN AHORA'}
                          </button>
                        </div>
                      </div>
                    )}

                    {activeStep === 3 && (
                      /* KERNIUM STEP 4: ROUTE MAP OPTIMIZATION */
                      <div className="bg-neutral-850 p-5 rounded-xl border border-neutral-800 text-left space-y-4">
                        <div className="flex justify-between items-center sm:items-baseline">
                          <div className="flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-emerald-400" />
                            <h4 className="font-sans text-xs font-semibold text-white">Plano de Planta Metódico // Optimización de Sentido</h4>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">Ruta Evitada: Cuello de Botella Central</span>
                        </div>

                        {/* Interactive Vector Map visualizer */}
                        <div className="bg-neutral-900 h-44 rounded-lg border border-neutral-800 relative overflow-hidden flex items-center justify-center">
                          {/* Warehouse structured Grid */}
                          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#FAF9F5 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                          
                          {/* Layout walls blocks */}
                          <div className="absolute top-4 left-6 w-16 h-12 bg-neutral-800/60 border border-neutral-700 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">Rack A</div>
                          <div className="absolute top-4 left-26 w-16 h-12 bg-neutral-800/60 border border-neutral-700 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">Rack B</div>
                          <div className="absolute top-4 right-6 w-16 h-12 bg-neutral-800/60 border border-neutral-700 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">Rack C</div>
                          <div className="absolute bottom-4 left-6 w-16 h-12 bg-neutral-800/60 border border-neutral-700 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">Box Prep</div>
                          <div className="absolute bottom-4 right-16 w-32 h-12 bg-neutral-800/60 border border-neutral-700 rounded text-[9px] font-mono flex items-center justify-center text-neutral-500">Bahía de Descarga</div>

                          {/* Starting Node & End Node */}
                          <div className="absolute top-10 left-3 w-2 h-2 rounded-full bg-blue-400 ring-4 ring-blue-400/20" title="Origen" />
                          <div className="absolute bottom-10 right-3 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" title="Destino" />

                          {/* SVG paths representing normal bottleneck versus AI optim route */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {/* Congested route path (Dotted Red) */}
                            <motion.path 
                              d="M 12 40 L 120 40 L 120 140 L 320 140 text" 
                              fill="none" 
                              stroke="#ef4444" 
                              strokeWidth="2" 
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            {/* Optimized route path (Solid Emerald) */}
                            <motion.path 
                              d="M 12 40 L 12 110 L 220 110 L 220 140 L 320 140" 
                              fill="none" 
                              stroke="#10b981" 
                              strokeWidth="3" 
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                          </svg>

                          {/* Labels inside map */}
                          <div className="absolute top-[48px] left-[65px] text-[8px] bg-red-500/10 text-red-400 border border-red-500/30 px-1 rounded font-mono">
                            Tránsito Pesado
                          </div>
                          
                          <div className="absolute bottom-[35px] left-[105px] text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1 rounded font-mono font-bold">
                            Kernium: Flujo Libre (Ahorro 3m)
                          </div>
                        </div>

                        {/* Route Comparison Stats */}
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                          <div className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                            <span className="text-red-400 block text-[9px]">// RUTA TRADICIONAL</span>
                            <p className="font-semibold text-white mt-0.5">Demora: 8.2 Minutos</p>
                          </div>
                          <div className="bg-neutral-900 p-2.5 rounded border border-emerald-500/20">
                            <span className="text-emerald-400 block text-[9px]">// KERNIUM OPTIMIZED</span>
                            <p className="font-semibold text-emerald-450 mt-0.5">Demora: 4.5 Minutos (-45%)</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeStep === 4 && (
                      /* KERNIUM STEP 5: SMART REPORT SENT PREVIEW */
                      <div className="bg-neutral-850 p-5 rounded-xl border border-neutral-800 text-left space-y-4">
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <h4 className="font-sans text-xs font-semibold text-white">Consolidado e Informe de Alerta Cerrada</h4>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30">Enviado con Éxito</span>
                        </div>

                        <div className="p-4 bg-neutral-900 rounded-lg space-y-3 relative overflow-hidden border border-neutral-800">
                          {/* Success glow background */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                          <h5 className="font-mono text-xs text-white flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Reporte de Turno Automatizado
                          </h5>

                          <p className="text-xs text-neutral-300 font-light leading-relaxed">
                            Alerta del Vehículo <span className="text-white font-mono font-bold">ZE-12</span> resuelta con éxito mediante orden <span className="text-white font-mono">#OT-2049</span>. Tiempo total inactivo de unidad: <span className="text-emerald-400 font-mono font-bold">52 minutos</span> (previniendo rotura de 5 días de paro técnico).
                          </p>

                          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-mono">
                            <div className="p-1.5 bg-neutral-850 rounded">
                              <span className="text-neutral-400 block">Disp. Recuperada</span>
                              <span className="text-white font-semibold">+18.2 horas/mes</span>
                            </div>
                            <div className="p-1.5 bg-neutral-850 rounded">
                              <span className="text-neutral-400 block">Ahorro Costos</span>
                              <span className="text-emerald-400 font-semibold">$3,420 USD</span>
                            </div>
                            <div className="p-1.5 bg-neutral-850 rounded">
                              <span className="text-neutral-400 block">Esmg CO2</span>
                              <span className="text-white font-semibold">-12.4 kg</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Simulation triggers */}
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => selectProduct('auditbot')}
                            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs px-4 py-2.5 rounded border border-neutral-750 transition flex items-center gap-1.5"
                          >
                            <span>Probar Demo AuditBot Farmacias</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                /* ==================== AUDITBOT SCREEN SIMULATION ==================== */
                <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                  
                  {/* Two Columns inside AuditBot View: Left Phone WhatsApp Simulation & Right Web Panel Updates */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-1">
                    
                    {/* LEFT CHAT CONTAINER: WhatsApp Business simulation on mobile frame */}
                    <div className="md:col-span-5 bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-between max-h-[360px] md:max-h-none min-h-[300px]">
                      
                      {/* Simulated Phone Top header */}
                      <div className="bg-neutral-900 border-b border-neutral-800 p-2.5 px-3 flex items-center justify-between text-left">
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-600 h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                            AB
                          </div>
                          <div>
                            <h5 className="font-sans text-[11px] font-semibold text-white">AuditBot Farmacia ✔</h5>
                            <span className="font-mono text-[8px] text-emerald-400 block">online / asis. bot</span>
                          </div>
                        </div>
                        <PhoneCall className="w-3.5 h-3.5 text-neutral-400 hover:text-white transition cursor-pointer" />
                      </div>

                      {/* Chat Bubbles Feed */}
                      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs text-left">
                        <p className="text-[8px] font-mono text-neutral-500 text-center uppercase tracking-widest my-1">// CANAL VERIFICADO WHATSAPP BUSINESS</p>
                        
                        {chatMessages.map((msg, idx) => (
                          <div 
                            key={idx} 
                            className={`flex flex-col max-w-[85%] ${
                              msg.sender === 'user' ? 'ml-auto items-end animate-slide-in' : 'mr-auto items-start'
                            }`}
                          >
                            <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${
                              msg.sender === 'user' 
                                ? 'bg-emerald-600 text-white rounded-tr-none' 
                                : 'bg-neutral-850 text-neutral-200 rounded-tl-none border border-neutral-800'
                            }`}>
                              
                              {/* If image attachment exists */}
                              {msg.image && (
                                <div className="mb-2 rounded overflow-hidden border border-neutral-800 max-w-[150px]">
                                  <img referrerPolicy="no-referrer" src={msg.image} alt="Evidencia Termómetro" className="w-full object-cover" />
                                </div>
                              )}

                              <p className="whitespace-pre-line">{msg.text}</p>
                            </div>
                            <span className="text-[8px] text-neutral-500 font-mono mt-0.5">
                              {msg.sender === 'user' ? 'Ignacio (Auditor)' : 'AuditBot'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Custom Input box inside simulator */}
                      <form onSubmit={handleSendCustomMessage} className="bg-neutral-900 p-2 border-t border-neutral-800 flex gap-2">
                        <input 
                          type="text" 
                          value={typedMessage}
                          onChange={(e) => setTypedMessage(e.target.value)}
                          placeholder="Mensaje o respuesta..." 
                          className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                        />
                        <button 
                          type="submit" 
                          className="bg-emerald-600 text-white p-1.5 rounded hover:bg-emerald-500 transition cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>

                    </div>

                    {/* RIGHT CONTAINER: Corporate Web Compliance Dashboard */}
                    <div className="md:col-span-7 bg-neutral-850 rounded-xl border border-neutral-800 p-4 text-left flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-4">
                        {/* Header controls for pharmacy panel */}
                        <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                          <div className="flex items-center gap-2">
                            <Layout className="w-4 h-4 text-emerald-400" />
                            <h5 className="font-sans text-xs font-semibold text-white">AuditBot Corporativo // Control Central</h5>
                          </div>
                          <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">// PANEL WEB</span>
                        </div>

                        {/* High level health indicators */}
                        <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                          <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                            <p className="text-neutral-400">Total Sucursales</p>
                            <p className="text-sm font-semibold text-white mt-0.5">14 Auditadas</p>
                          </div>
                          <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
                            <p className="text-neutral-400">Desvíos Abiertos</p>
                            <p className={`text-sm font-semibold mt-0.5 ${resolvedDeviation ? 'text-emerald-400' : 'text-amber-500 animate-pulse'}`}>
                              {resolvedDeviation ? '0 / Sin Alertas' : '1 No Resuelto (Alta)'}
                            </p>
                          </div>
                        </div>

                        {/* Real dynamic audit log table */}
                        <div className="space-y-2">
                          <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">Historial de Sucursales</p>
                          
                          <div className="space-y-1.5 text-[10px] font-mono">
                            {/* Row 1: Palermo */}
                            <div className={`p-2 rounded border transition duration-300 flex justify-between items-center ${
                              resolvedDeviation 
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' 
                                : activeStep >= 2
                                  ? 'bg-rose-500/5 border-rose-500/30 text-rose-300'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                            }`}>
                              <span className="font-bold flex items-center gap-1">Palermo-104 {activeStep >= 2 && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}</span>
                              <span>
                                {resolvedDeviation 
                                  ? '✓ Resuelto y Cerrado por Farmacéutico' 
                                  : activeStep >= 2
                                    ? '🚨 Alerta: Temperatura Crítica 9.2°C'
                                    : 'Aguardando Checklist Inicial'}
                              </span>
                            </div>

                            {/* Row 2: Recoleta */}
                            <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-neutral-300 flex justify-between items-center">
                              <span className="font-bold">Recoleta-083</span>
                              <span className="text-emerald-450">✓ Completada 100% Sin Desvíos</span>
                            </div>

                            {/* Row 3: Belgrano */}
                            <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-neutral-300 flex justify-between items-center">
                              <span className="font-bold">Belgrano-201</span>
                              <span className="text-emerald-450">✓ Completada 98.2% Desvíos Resueltos</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline resolution checklist footer */}
                      <div className="pt-3 border-t border-neutral-800 justify-between items-center flex gap-4 text-xs font-mono">
                        <span className="text-neutral-400 text-[10px]">Trazabilidad Audit-Bot:</span>
                        <div className="flex gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            activeStep >= 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                          }`}>GPS</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            activeStep >= 2 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                          }`}>FOTO</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            resolvedDeviation ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
                          }`}>FIRMA</span>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* Bottom simulated toolbar with tech detail summaries of the developer */}
            <div className="bg-[#1c1c1a] border-t border-neutral-850 px-5 py-3 flex justify-between items-center text-[10px] font-mono text-neutral-500">
              <p>// STACK INTEGRADO: REACT 19 / MOTION / TAILWIND CSS / CHAT GATEWAYS</p>
              <button 
                onClick={() => selectProduct(activeProduct === 'kernium' ? 'auditbot' : 'kernium')}
                className="hover:text-white transition duration-200 uppercase tracking-widest font-bold"
              >
                Alternar Producto &gt;&gt;
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
