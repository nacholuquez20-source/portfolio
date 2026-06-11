import React from 'react';
import { Brain, Database, Cpu, MessageSquare, Check, Loader2, ArrowRight } from 'lucide-react';
import { PipelineStep } from './types';

interface AIPipelineProps {
  steps: PipelineStep[];
  currentMessageText: string;
  isProcessing: boolean;
}

export default function AIPipeline({ steps, currentMessageText, isProcessing }: AIPipelineProps) {
  // Try to find if we can tokenize and highlight some words inside the text
  const renderHighlightedText = (text: string) => {
    if (!text) return <p className="text-gray-400 italic text-sm">Esperando mensaje entrante...</p>;

    let highlighted = text;
    const keywords = [
      { word: 'CR-04', type: 'vehicle', label: 'Vehículo: CR-04' },
      { word: 'TR-02', type: 'vehicle', label: 'Vehículo: TR-02' },
      { word: 'VN-03', type: 'vehicle', label: 'Vehículo: VN-03' },
      { word: 'grúa', type: 'vehicle', label: 'Vehículo: CR-04 (Grúa)' },
      { word: 'vía', type: 'vehicle', label: 'Vehículo: CR-04 (Grúa)' },
      { word: 'van', type: 'vehicle', label: 'Vehículo: VN-03' },
      { word: 'falla', type: 'issue', label: 'Problema' },
      { word: 'líquido hidráulico', type: 'issue', label: 'Problema: Fuga Hidráulica' },
      { word: 'ruido fuerte', type: 'issue', label: 'Problema: Fuga Hidráulica' },
      { word: 'chillido', type: 'issue', label: 'Problema: Fuga Hidráulica' },
      { word: 'luz indicadora del motor', type: 'issue', label: 'Anomalía: Luz de Motor' },
      { word: 'check-engine', type: 'issue', label: 'Anomalía: Luz de Motor' },
      { word: 'service', type: 'action', label: 'Operativo: Service Terminado' },
      { word: 'operar', type: 'action', label: 'Acción: Alta de Unidad' },
      { word: 'listo', type: 'action', label: 'Acción: Alta de Unidad' }
    ];

    // Simple word splitting and wrapping
    const words = text.split(/(\s+)/);
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-sans text-sm text-slate-200 leading-relaxed shadow-inner">
        <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs uppercase tracking-wider font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
          <span>Payload de WhatsApp Recibido</span>
        </div>
        <p className="font-medium text-slate-100">
          {words.map((chunk, idx) => {
            const clean = chunk.toLowerCase().replace(/[.,!?;()]/g, '');
            const match = keywords.find(k => 
              clean.includes(k.word.toLowerCase()) || k.word.toLowerCase().includes(clean) && clean.length > 2
            );

            if (match && clean.length > 2) {
              let colorClasses = '';
              if (match.type === 'vehicle') colorClasses = 'bg-blue-950/80 text-blue-300 border-blue-850';
              else if (match.type === 'issue') colorClasses = 'bg-rose-950/80 text-rose-300 border-rose-850';
              else if (match.type === 'action') colorClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-850';

              return (
                <span 
                  key={idx} 
                  className={`inline-block px-1.5 py-0.5 rounded border text-xs font-semibold mx-0.5 transition-all duration-300 ${colorClasses}`}
                  title={match.label}
                >
                  {chunk}
                </span>
              );
            }
            return <span key={idx}>{chunk}</span>;
          })}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 text-white shadow-xl flex flex-col h-full justify-between" id="ai-pipeline-container">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-sm">Kernium AI Engine™</h3>
              <p className="text-[11px] text-slate-400">Motor parsing de lenguaje natural y webhook link</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase">
            {isProcessing ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Analizando</span>
              </>
            ) : (
              <span>Activo</span>
            )}
          </div>
        </div>

        {/* Input message inspection */}
        <div className="mb-6">
          <h4 className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Paso 1: Lectura de Canal</h4>
          {renderHighlightedText(currentMessageText)}
        </div>

        {/* Pipeline Steps stack */}
        <div className="space-y-4">
          <h4 className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Paso 2: Pipeline de Extracción AI</h4>
          {steps.map((step, index) => {
            const isIdle = step.status === 'idle';
            const isPending = step.status === 'processing';
            const isSuccess = step.status === 'success';

            // Icons
            let stepIcon = <MessageSquare className="w-4 h-4" />;
            if (isPending) stepIcon = <Loader2 className="w-4 h-4 animate-spin" />;
            else if (step.id === 'ner') stepIcon = <Brain className="w-4 h-4" />;
            else if (step.id === 'db_sync') stepIcon = <Database className="w-4 h-4" />;
            else if (step.id === 'ui_dispatch') stepIcon = <Cpu className="w-4 h-4" />;

            return (
              <div 
                key={step.id} 
                className={`relative flex gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                  isPending 
                    ? 'bg-blue-955/20 border-blue-800/80 shadow-[0_0_12px_rgba(59,130,246,0.1)]' 
                    : isSuccess 
                      ? 'bg-slate-900/40 border-slate-800' 
                      : 'bg-transparent border-slate-900 opacity-50'
                }`}
              >
                {/* Visual Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`absolute top-11 bottom-[-16px] left-[26px] w-[2px] transition-colors duration-500 ${
                    isSuccess ? 'bg-blue-500' : 'bg-slate-800'
                  }`} />
                )}

                {/* Step ring status */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                  isSuccess 
                    ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]' 
                    : isPending 
                      ? 'bg-blue-950 text-blue-400 border-blue-500 animate-pulse' 
                      : 'bg-slate-900 text-slate-500 border-slate-850'
                }`}>
                  {isSuccess ? <Check className="w-4 h-4 stroke-[3px]" /> : stepIcon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold tracking-wide ${isSuccess ? 'text-slate-100' : isPending ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                    {isSuccess && (
                      <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                        Ok
                      </span>
                    )}
                  </div>
                  <p className="text-slate-350 text-[11px] mt-0.5 leading-normal">
                    {step.description}
                  </p>

                  {/* Extracted Parameters Badge Drawer */}
                  {isSuccess && step.extractedData && Object.keys(step.extractedData).length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 p-2 bg-slate-950/80 border border-slate-900 rounded-lg">
                      {Object.entries(step.extractedData).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 px-2 py-0.5 rounded text-[10px] font-mono">
                          <span className="text-slate-500">{key}:</span>
                          <span className={`font-semibold ${
                            key === 'Prioridad' || key === 'Gravedad'
                              ? val === 'Alta' || val === 'Critico' ? 'text-rose-400' : val === 'Media' ? 'text-amber-400' : 'text-emerald-400'
                              : 'text-blue-400'
                          }`}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metrics of efficiency card */}
      <div className="mt-6 pt-4 border-t border-slate-900">
        <div className="bg-gradient-to-r from-slate-900 to-blue-960 border border-slate-800 p-3.5 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-medium">Latencia de Procesado</span>
            <span className="text-xs text-blue-400 font-semibold font-mono">1.2 segundos</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-full w-[94%]" />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
            El despachador de IA de Kernium automatiza el triage de flota: reemplaza las llamadas de emergencia por reportes estructurados que impactan en la consola al instante.
          </p>
        </div>
      </div>
    </div>
  );
}
