import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Play, Pause, ChevronRight, ChevronLeft,
  Truck, AlertTriangle, Layout,
  MessageSquare, Zap, Send, PhoneCall
} from 'lucide-react';
import KerniumLiveDemo from './kernium/KerniumLiveDemo';

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

  // Custom states for interactive elements in AuditBot
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; image?: string }>>([
    { sender: 'bot', text: '👋 Hola Ignacio, aquí el asistente de AuditBot. Iniciamos la auditoría programada de hoy para la sucursal Palermo-104.' },
    { sender: 'bot', text: 'Por favor, confirma que estás en el establecimiento presionando el botón de abajo.' }
  ]);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [resolvedDeviation, setResolvedDeviation] = useState<boolean>(false);

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

  const currentSteps = auditBotSteps;
  const totalSteps = currentSteps.length;

  // Auto playback mechanism (only drives the scripted AuditBot walkthrough)
  useEffect(() => {
    if (activeProduct !== 'auditbot') return;
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % totalSteps);
      }, 7000); // 7 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSteps, activeProduct]);

  // Sync chat state to the current AuditBot step
  useEffect(() => {
    if (activeProduct !== 'auditbot') return;

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
        sender: 'bot' as const,
        text: '⚙️ Mensaje registrado en la trazabilidad de la auditoría. Procesando actualización del panel...'
      }]);
    }, 1500);
  };

  return (
    <section id="demos" className="py-24 bg-[#FAF9F5] border-t border-b border-neutral-300/40 relative overflow-hidden scroll-mt-20">

      {/* Decorative Blueprint or Grid Lines representing tech precision */}
      <div className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-neutral-300/30 pointer-events-none" />
      <div className="absolute inset-y-0 right-6 md:right-12 w-[1px] bg-neutral-300/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header section with modern badge and titles */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1c1a] text-[#F8F8F5] rounded-full text-xs font-mono">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="tracking-widest uppercase text-[9px]">// DEMOS INTERACTIVAS</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-none">
            Cómo Funciona
          </h2>

          <p className="text-neutral-500 font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Explora demos dinámicas de mis productos. Interactúa con las pantallas web, chats de WhatsApp
            e infraestructura de IA como si estuvieran en producción.
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

        {activeProduct === 'kernium' ? (
          /* ==================== KERNIUM: LIVE INTERACTIVE DEMO ==================== */
          <KerniumLiveDemo />
        ) : (
          /* ==================== AUDITBOT: SCRIPTED WALKTHROUGH ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

            {/* LEFT SIDEBAR: Step progression & interactive controllers */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 bg-neutral-100/50 p-6 sm:p-8 rounded-2xl border border-neutral-200 text-left">

              <div className="space-y-6">
                {/* Product Slogan */}
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase">
                    // COMPLIANCE EN TIEMPO REAL
                  </p>
                  <h3 className="font-serif text-2xl font-bold mt-1 text-neutral-900">
                    AuditBot Farmacias
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1.5 italic">
                    "Una auditoría completa y trazada directamente desde WhatsApp."
                  </p>
                </div>

                {/* Progress Steps Timeline */}
                <div className="relative border-l border-neutral-300 ml-2 space-y-4 py-2">
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
                              ? 'bg-[#1c1c1a]/80 border-neutral-800'
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
                <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm space-y-2.5">
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-neutral-100 text-neutral-500 tracking-wider font-semibold rounded uppercase">
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
                  {`auditbot.io/app/workspace/pharmacy-104?step=${activeStep + 1}`}
                </div>

                {/* Status indicators */}
                <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <span>SECURE // WS</span>
                </div>

              </div>

              {/* MAIN APP SIMULATION AREA */}
              <div className="flex-1 p-5 md:p-6 flex flex-col justify-between overflow-y-auto min-h-[460px]">

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
                              msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                            }`}
                          >
                            <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                : 'bg-neutral-800 text-neutral-200 rounded-tl-none border border-neutral-700/50'
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
                    <div className="md:col-span-7 bg-neutral-800/40 rounded-xl border border-neutral-800 p-4 text-left flex flex-col justify-between space-y-4">

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
                              <span className="font-bold flex items-center gap-1">Palermo-104 {activeStep >= 2 && !resolvedDeviation && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}</span>
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
                              <span className="text-emerald-400">✓ Completada 100% Sin Desvíos</span>
                            </div>

                            {/* Row 3: Belgrano */}
                            <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-neutral-300 flex justify-between items-center">
                              <span className="font-bold">Belgrano-201</span>
                              <span className="text-emerald-400">✓ Completada 98.2% Desvíos Resueltos</span>
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

              </div>

              {/* Bottom simulated toolbar with tech detail summaries */}
              <div className="bg-[#1c1c1a] border-t border-neutral-800 px-5 py-3 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                <p>// STACK: WHATSAPP BUSINESS API / IA / PANEL WEB REACT</p>
                <button
                  onClick={() => selectProduct('kernium')}
                  className="hover:text-white transition duration-200 uppercase tracking-widest font-bold cursor-pointer"
                >
                  Probar Demo Kernium &gt;&gt;
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
