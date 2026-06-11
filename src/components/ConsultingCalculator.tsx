import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Check, FileText, ArrowRight, Printer, AlertTriangle } from 'lucide-react';
import { CONSULTING_PACKAGES } from '../data';

interface ConsultingCalculatorProps {
  onApplyProposal: (summaryText: string) => void;
}

export default function ConsultingCalculator({ onApplyProposal }: ConsultingCalculatorProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>(['pkg-diagnostico']);
  const [complexity, setComplexity] = useState<number>(2); // 1 = Simple, 2 = Medium, 3 = Advanced
  const [timeline, setTimeline] = useState<'standard' | 'accelerated' | 'extended'>('standard');
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Core base prices
  const basePrices: Record<string, number> = {
    'pkg-diagnostico': 900,
    'pkg-automatizacion': 2400,
    'pkg-saas': 4800,
  };

  const getComplexityLabel = (val: number) => {
    if (val === 1) return 'Esencial (Un proceso, pocas integraciones)';
    if (val === 3) return 'Avanzado (Operación crítica, múltiples áreas e integraciones)';
    return 'Estándar (Varios procesos, integraciones con sistemas existentes)';
  };

  const getTimelineLabel = (val: string) => {
    if (val === 'accelerated') return 'Acelerado (Entrega priorizada y crítica: +20%)';
    if (val === 'extended') return 'Planificado / Flexible (Flexibilidad de plazos: -10%)';
    return 'Estándar (Tiempo sugerido recomendado)';
  };

  // Recalculate price dynamically
  useEffect(() => {
    let priceSum = selectedModules.reduce((acc, curr) => acc + (basePrices[curr] || 0), 0);
    
    // Apply complexity multiplier
    let compMult = 1.0;
    if (complexity === 1) compMult = 0.8;
    if (complexity === 3) compMult = 1.45;
    priceSum = priceSum * compMult;

    // Apply timeline modifier
    let timeMult = 1.0;
    if (timeline === 'accelerated') timeMult = 1.2;
    if (timeline === 'extended') timeMult = 0.9;
    priceSum = priceSum * timeMult;

    setEstimatedPrice(Math.round(priceSum));
  }, [selectedModules, complexity, timeline]);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((m) => m !== id)
          : prev
        : [...prev, id]
    );
  };

  const generateSOWText = () => {
    const modulesText = selectedModules
      .map((id) => CONSULTING_PACKAGES.find((p) => p.id === id)?.title)
      .join(', ');
    const complexityText = complexity === 1 ? 'Esencial' : complexity === 3 ? 'Avanzada' : 'Avanzada Estándar';
    return `Propuesta de Consultoría - ${modulesText}. Complejidad: ${complexityText}. Plazo: ${timeline.toUpperCase()}. Costo Estimado: $${estimatedPrice.toLocaleString('en-US')} USD.`;
  };

  const triggerPrint = () => {
    window.print();
  };

  const handleApply = () => {
    onApplyProposal(generateSOWText());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section id="consulting" className="py-24 bg-[#F8F8F5] border-t border-neutral-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full border border-neutral-200/50 mb-4">
            <Calculator className="w-3.5 h-3.5 text-neutral-500" />
            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
              COTIZADOR INTERACTIVO // MODELADOR DE PROPUESTOS
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-[#1c1c1a] mb-6">
            Consultoría & Cotización
          </h2>

          <p className="text-sm md:text-base text-neutral-500 font-light leading-relaxed">
            Diseña los parámetros ideales para tu próxima puesta en marcha tecnológica. Selecciona módulos esenciales, personaliza los niveles de estrés tolerables del sistema, ajusta plazos de entrega y genera un borrador de Declaración de Trabajo (SOW) al instante.
          </p>
        </div>

        {/* Workspace layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* Step 1: Select modules */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-medium text-neutral-900 flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400">01 /</span> Selecciona los Módulos de Trabajo
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {CONSULTING_PACKAGES.map((pkg) => {
                  const isSelected = selectedModules.includes(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => toggleModule(pkg.id)}
                      className={`p-6 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-neutral-900/5 border-neutral-900 shadow-sm'
                          : 'bg-white border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-lg font-semibold text-neutral-900">
                              {pkg.title}
                            </h4>
                            <span className="text-xs text-neutral-400 font-mono">
                              (Base: {pkg.basePrice})
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 font-sans tracking-wide">
                            {pkg.subtitle}
                          </p>
                          <p className="text-sm text-neutral-600 font-light pt-2 leading-relaxed">
                            {pkg.description}
                          </p>

                          {/* Features bullets */}
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 pt-4">
                            {pkg.features.map((f) => (
                              <li key={f} className="text-xs text-neutral-500 flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Checkbox selector */}
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1 transition-all ${
                            isSelected
                              ? 'bg-[#1c1c1a] border-[#1c1c1a]'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: System Complexity */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-medium text-[#1c1c1a] flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400">02 /</span> Complejidad & Redundancia Operativa
              </h3>

              <div className="space-y-3 bg-white p-6 rounded-xl border border-neutral-200">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-neutral-400">NIVEL SELECCIONADO</span>
                  <span className="text-neutral-800 font-semibold uppercase">
                    X{complexity === 1 ? '0.8' : complexity === 2 ? '1.0' : '1.45'} Multiplicador
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                  className="w-full accent-[#1c1c1a] cursor-pointer"
                  id="complexity-slider"
                />

                <div className="pt-2 text-sm text-neutral-600 font-light leading-relaxed">
                  <strong>Estado:</strong> {getComplexityLabel(complexity)}
                </div>
              </div>
            </div>

            {/* Step 3: Timeline Schedules */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-medium text-[#1c1c1a] flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400">03 /</span> Cronograma de Entrega
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['standard', 'accelerated', 'extended'] as const).map((t) => {
                  const isSelected = timeline === t;
                  const label = t === 'standard' ? 'Estándar' : t === 'accelerated' ? 'Prioritario' : 'Planificado';
                  return (
                    <button
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white border-neutral-200 hover:border-neutral-400 text-[#1c1c1a]'
                      }`}
                      id={`timeline-btn-${t}`}
                    >
                      <h4 className="font-serif font-semibold text-base">{label}</h4>
                      <span className="text-[10px] font-mono uppercase opacity-70">
                        {t === 'standard' ? 'Sin Costo Extra' : t === 'accelerated' ? '+20% Costo' : '-10% Descuento'}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="text-xs text-neutral-400 font-mono text-center md:text-left">
                {getTimelineLabel(timeline)}
              </div>
            </div>

          </div>

          {/* Statement of Work Card / Simulator Output (Right sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <h3 className="font-mono text-[10px] tracking-widest text-[#1c1c1a] font-semibold text-left uppercase">
              // HOJA DE CONDICIONES E INDICES PRELIMINARES
            </h3>

            <div className="bg-[#F1F1ED] p-8 rounded-2xl border border-neutral-300/60 shadow-lg text-left space-y-6 relative overflow-hidden">
              {/* Subtle design seal watermark */}
              <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full border border-neutral-500/5 pointer-events-none" />

              <div className="flex justify-between items-start border-b border-neutral-300 pb-4">
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 tracking-wider">COTIZACIÓN / SOW</span>
                  <h4 className="font-serif text-2xl font-bold text-neutral-900">Borrador Técnico</h4>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] text-[#1c1c1a] bg-white border border-neutral-300/80 px-2 py-0.5 rounded-full font-semibold uppercase">
                    ESTADO: ACTIVO
                  </span>
                </div>
              </div>

              {/* SOW Metrics */}
              <div className="grid grid-cols-2 gap-4 border-b border-neutral-300 pb-6">
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase">Inversión Estimada</p>
                  <p className="font-serif text-3xl font-bold text-neutral-900 pt-1">
                    ${estimatedPrice.toLocaleString('en-US')}{' '}
                    <span className="text-xs font-sans text-neutral-500 font-light">USD</span>
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase">Plazo de Lanzamiento</p>
                  <p className="font-serif text-3xl font-bold text-neutral-900 pt-1">
                    {timeline === 'accelerated'
                      ? '4-6 Sem.'
                      : timeline === 'extended'
                      ? '10-12 Sem.'
                      : '7-9 Sem.'}
                  </p>
                </div>
              </div>

              {/* Scope details list */}
              <div className="space-y-3">
                <p className="font-mono text-[10px] text-neutral-400 uppercase font-semibold">
                  MÓDULOS DE INGENIERÍA INCORPORADOS:
                </p>
                <div className="space-y-2">
                  {selectedModules.map((id) => {
                    const matched = CONSULTING_PACKAGES.find((p) => p.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2.5 text-xs text-neutral-700 font-light">
                        <Check className="w-4 h-4 text-[#1c1c1a] shrink-0" />
                        <span>{matched?.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Note */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 leading-relaxed font-light flex items-start gap-2.5">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Esta cotización es preliminar y orientativa. La propuesta formal se define después de una primera llamada diagnóstica, según el alcance real del proceso y las integraciones necesarias.
                </span>
              </div>

              {/* Dynamic interaction actions */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={handleApply}
                  className={`w-full text-xs font-mono py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1c1c1a] text-white hover:bg-neutral-800 active:scale-99'
                  }`}
                  id="apply-proposal-form-btn"
                >
                  <FileText className="w-4 h-4" />
                  {isCopied ? '¡Transferido al Formulario!' : 'Aplicar al Formulario de Contacto'}
                </button>

                <button
                  onClick={triggerPrint}
                  className="w-full bg-white text-[#1c1c1a] border border-neutral-300 text-xs font-mono py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-100 active:scale-99 transition-all cursor-pointer"
                  id="print-proposal-btn"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir / Descargar PDF Oficial
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
