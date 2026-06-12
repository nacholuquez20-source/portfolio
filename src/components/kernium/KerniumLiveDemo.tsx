import { useState } from 'react';
import { Sparkles, MessageSquare, Cpu, CheckCircle, Layout, RotateCcw } from 'lucide-react';
import { Vehicle, ChatMessage, Operator, MaintenanceTicket, PipelineStep, VehicleId } from './types';
import { INITIAL_VEHICLES, INITIAL_OPERATORS, INITIAL_TICKETS } from './mockData';
import PhoneMockup from './PhoneMockup';
import DashboardMockup from './DashboardMockup';
import AIPipeline from './AIPipeline';

// Initial state of AI Pipeline steps shown to the user
const DEFAULT_STEPS: PipelineStep[] = [
  {
    id: 'receive',
    label: '1. Recepción de Mensaje (Webhook)',
    description: 'El webhook de WhatsApp recibe el payload del operador industrial.',
    status: 'idle',
  },
  {
    id: 'ner',
    label: '2. Extracción de Entidades & NLP',
    description: 'La IA analiza el texto para descifrar equipo afectado, severidad y anomalías mecánicas.',
    status: 'idle',
  },
  {
    id: 'db_sync',
    label: '3. Persistencia de Telemetría',
    description: 'Escribe automáticamente las coordenadas GPS y anota la orden en la base de datos de flota.',
    status: 'idle',
  },
  {
    id: 'ui_dispatch',
    label: '4. Actualización Web & Respuesta',
    description: 'Sincroniza el dashboard mediante WebSockets y envía confirmación al WhatsApp del chofer.',
    status: 'idle',
  }
];

export default function KerniumLiveDemo() {
  // Application states
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [operators, setOperators] = useState<Operator[]>(INITIAL_OPERATORS);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TICKETS);
  const [selectedOperatorId, setSelectedOperatorId] = useState<string>('carlos');
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Pipeline execution state
  const [currentMessageText, setCurrentMessageText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(DEFAULT_STEPS);

  // Quick action notifications toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleSelectOperator = (opId: string) => {
    setSelectedOperatorId(opId);
  };

  const handleSendMessage = (opId: string, text: string) => {
    if (isProcessing) return;

    setIsProcessing(true);
    setCurrentMessageText(text);

    // Add message to chat log immediately
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'operator',
      text: text,
      timestamp: formattedTime,
    };

    setOperators(prevOps => prevOps.map(op => {
      if (op.id === opId) {
        return {
          ...op,
          initialChat: [...op.initialChat, newMessage],
          unreadCount: 0
        };
      }
      return op;
    }));

    // Trigger sequential AI pipeline simulating real-time event loop
    runPipelineSimulation(opId, text);
  };

  const runPipelineSimulation = (opId: string, text: string) => {
    const isCarlos = opId === 'carlos';
    const isSofia = opId === 'sofia';
    const isLucas = opId === 'lucas';

    // Heuristics for NLP Parameter Extraction
    let extractedVehicleId: VehicleId = 'CR-04';
    let extractedIssue = 'Falla no especificada';
    let extractedSeverity: 'low' | 'medium' | 'high' = 'medium';

    if (text.toLowerCase().includes('cr-04') || text.toLowerCase().includes('grúa') || isCarlos) {
      extractedVehicleId = 'CR-04';
      extractedIssue = text.toLowerCase().includes('líquido') || text.toLowerCase().includes('hidráulico')
        ? 'Fuga hidráulica crítica'
        : 'Problema en la elevación de brazo';
      extractedSeverity = 'high';
    } else if (text.toLowerCase().includes('tr-02') || text.toLowerCase().includes('motor') || isSofia) {
      extractedVehicleId = 'TR-02';
      extractedIssue = text.toLowerCase().includes('luz') || text.toLowerCase().includes('tablero')
        ? 'Aviso lumínico en tablero (Check Engine)'
        : 'Anomalía preventiva reporte de motor';
      extractedSeverity = 'medium';
    } else if (text.toLowerCase().includes('vn-03') || text.toLowerCase().includes('service') || isLucas) {
      extractedVehicleId = 'VN-03';
      extractedIssue = 'Service preventivo completado en taller';
      extractedSeverity = 'low';
    }

    // Step 1: RECEIVE WHATSAPP WEBHOOK
    setPipelineSteps(prev => prev.map(s => s.id === 'receive' ? { ...s, status: 'processing' } : s));

    setTimeout(() => {
      setPipelineSteps(prev => prev.map(s => s.id === 'receive' ? { ...s, status: 'success' } : s));

      // Step 2: PROCESS NLP & NER EXTRACTION
      setPipelineSteps(prev => prev.map(s =>
        s.id === 'ner'
          ? {
              ...s,
              status: 'processing',
              extractedData: {
                'ID Operador': opId.toUpperCase(),
                'Vehículo': extractedVehicleId,
                'Gravedad': extractedSeverity === 'high' ? 'Critico' : extractedSeverity === 'medium' ? 'Media' : 'Baja',
              }
            }
          : s
      ));

      setTimeout(() => {
        setPipelineSteps(prev => prev.map(s =>
          s.id === 'ner'
            ? {
                ...s,
                status: 'success',
                extractedData: {
                  'Equipo': extractedVehicleId,
                  'Gravedad': extractedSeverity === 'high' ? 'Critico' : extractedSeverity === 'medium' ? 'Media' : 'Baja',
                  'Diagnóstico': extractedIssue
                }
              }
            : s
        ));

        // Step 3: DATABASE WRITE & METRIC PERSISTENCE
        setPipelineSteps(prev => prev.map(s => s.id === 'db_sync' ? { ...s, status: 'processing' } : s));

        setTimeout(() => {
          setPipelineSteps(prev => prev.map(s => s.id === 'db_sync' ? { ...s, status: 'success' } : s));

          // APPLY MUTATIONS TO WEB DASHBOARD DATABASE IN REAL-TIME
          if (extractedVehicleId === 'CR-04' && extractedSeverity === 'high') {
            // Crane 04 Alert
            setVehicles(prev => prev.map(v =>
              v.id === 'CR-04'
                ? { ...v, status: 'Alert', metrics: { ...v.metrics, warningMsg: 'Líquido hidráulico bajo / chillido en giro' } }
                : v
            ));

            const tId = `WO-CR04-${Date.now().toString().slice(-4)}`;
            const newTicket: MaintenanceTicket = {
              id: tId,
              vehicleId: 'CR-04',
              issue: 'Falla Hidráulica Crítica (Reporte de WhatsApp)',
              reportedBy: 'Carlos Ortiz',
              date: new Date().toLocaleDateString('es-AR'),
              status: 'Pending',
              severity: 'high'
            };
            setTickets(prev => [newTicket, ...prev]);
            setActiveTab('overview');
            triggerToast('🚨 Alerta Crítica Recibida: La Grúa CR-04 cambió a estado de ALERTA. Orden de trabajo registrada.');

          } else if (extractedVehicleId === 'TR-02') {
            // Truck 02 Warn (Check engine light)
            setVehicles(prev => prev.map(v =>
              v.id === 'TR-02'
                ? { ...v, status: 'Alert', metrics: { ...v.metrics, temperature: '98°C', warningMsg: 'Luz Check-Engine encendida' } }
                : v
            ));

            const tId = `WO-TR02-${Date.now().toString().slice(-4)}`;
            const newTicket: MaintenanceTicket = {
              id: tId,
              vehicleId: 'TR-02',
              issue: 'Revisión preventiva de motor (Luz en tablero)',
              reportedBy: 'Sofía Almada',
              date: new Date().toLocaleDateString('es-AR'),
              status: 'Pending',
              severity: 'medium'
            };
            setTickets(prev => [newTicket, ...prev]);
            setActiveTab('overview');
            triggerToast('⚠️ Alerta Preventiva: Camión TR-02 reportó falla lumínica en motor. Agregado al taller.');

          } else if (extractedVehicleId === 'VN-03') {
            // Van 03 service completed by Lucas
            setVehicles(prev => prev.map(v =>
              v.id === 'VN-03'
                ? { ...v, status: 'Operating', metrics: { ...v.metrics, battery: 100, warningMsg: undefined } }
                : v
            ));

            setTickets(prev => prev.map(t =>
              t.vehicleId === 'VN-03' ? { ...t, status: 'Resolved' } : t
            ));
            setActiveTab('overview');
            triggerToast('✅ Van VN-03 restablecido a estado OPERATIVO. ¡Service preventivo completado con éxito!');
          }

          // Step 4: WEB APPLICATION DISPATCH & WHATSAPP AUTOREPLY
          setPipelineSteps(prev => prev.map(s => s.id === 'ui_dispatch' ? { ...s, status: 'processing' } : s));

          setTimeout(() => {
            setPipelineSteps(prev => prev.map(s => s.id === 'ui_dispatch' ? { ...s, status: 'success' } : s));

            // Generate automated receipt message to the driver on WhatsApp
            let autoReply = '';
            if (extractedVehicleId === 'CR-04' && extractedSeverity === 'high') {
              autoReply = '🚨 REGISTRO DE ALERTA ALTA: Hola Carlos, nuestro motor de IA Kernium Link ha registrado tu reporte de fluidos para la grúa CR-04. Solicitud WO-CR04 creada en sistema. Por favor apaga el motor por seguridad. Estamos asignando personal de taller urgente.';
            } else if (extractedVehicleId === 'TR-02') {
              autoReply = '⚠️ REPORTE PREVENTIVO RECIBIDO: Hola Sofía, registramos la advertencia lumínica del Scania TR-02. Las temperaturas de telemetría reportan en rango aceptable (98°C). Puedes concluir tu viaje y regresar al taller central para inspección.';
            } else if (extractedVehicleId === 'VN-03') {
              autoReply = '✅ ACTUALIZACIÓN FLOTA: Recibido Lucas. Service de Van VN-03 registrado en base de datos. Se modificó el estatus del van a OPERATIVO. Ya figura libre para operaciones en terminal. ¡Buen trabajo!';
            } else {
              autoReply = '🤖 Mensaje recibido por IA Kernium Link. Procesando parámetros con el centro de despacho...';
            }

            const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const aiMessage: ChatMessage = {
              id: `ai_${Date.now()}`,
              sender: 'ai_system',
              text: autoReply,
              timestamp: replyTime,
            };

            setOperators(prevOps => prevOps.map(op => {
              if (op.id === opId) {
                return {
                  ...op,
                  initialChat: [...op.initialChat, aiMessage]
                };
              }
              return op;
            }));

            setIsProcessing(false);
          }, 650);

        }, 500);

      }, 600);

    }, 500);
  };

  // Simulated dispatch of mechanics from the web console
  const handleDispatchMechanic = (vehicleId: VehicleId, ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'In Progress' } : t));
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status: 'Maintenance' } : v));

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dispatcherMsg: ChatMessage = {
      id: `disp_${Date.now()}`,
      sender: 'ai_system',
      text: `🔧 NOVEDAD TALLER: Se ha autorizado orden de trabajo por jefe de despacho. El técnico Lucas se dirige a asistir ${vehicleId} con repuestos y chequeo diagnóstico.`,
      timestamp: formattedTime
    };

    let reporterId = 'carlos';
    if (vehicleId === 'TR-02') reporterId = 'sofia';
    else if (vehicleId === 'VN-03') reporterId = 'lucas';

    setOperators(prevOps => prevOps.map(op => {
      if (op.id === reporterId) {
        return {
          ...op,
          initialChat: [...op.initialChat, dispatcherMsg]
        };
      }
      return op;
    }));

    triggerToast(`🔧 Taller despachado para asistir a la unidad ${vehicleId}.`);
  };

  const handleResolveTicket = (ticketId: string) => {
    const targetTicket = tickets.find(t => t.id === ticketId);
    if (!targetTicket) return;

    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));

    setVehicles(prev => prev.map(v =>
      v.id === targetTicket.vehicleId
        ? { ...v, status: 'Operating', metrics: { ...v.metrics, warningMsg: undefined } }
        : v
    ));

    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const solvedMsg: ChatMessage = {
      id: `solv_${Date.now()}`,
      sender: 'ai_system',
      text: `✅ REPARACIÓN CONFIRMADA: Tu orden ${ticketId} fue marcada como SOLUCIONADA desde consola web. La telemetría restableció el color verde. ¡Operaciones reanudadas!`,
      timestamp: formattedTime
    };

    let reporterId = 'carlos';
    if (targetTicket.vehicleId === 'TR-02') reporterId = 'sofia';
    else if (targetTicket.vehicleId === 'VN-03') reporterId = 'lucas';

    setOperators(prevOps => prevOps.map(op => {
      if (op.id === reporterId) {
        return {
          ...op,
          initialChat: [...op.initialChat, solvedMsg]
        };
      }
      return op;
    }));

    triggerToast(`✅ Solución registrada. ${targetTicket.vehicleId} restablecido en verde.`);
  };

  const handleResetShowcase = () => {
    setVehicles(INITIAL_VEHICLES);
    setOperators(INITIAL_OPERATORS);
    setTickets(INITIAL_TICKETS);
    setPipelineSteps(DEFAULT_STEPS);
    setCurrentMessageText('');
    setIsProcessing(false);
    triggerToast('🔄 Simulación reiniciada. ¡Comienza una nueva prueba!');
  };

  return (
    <div className="space-y-8 relative">

      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full bg-[#1c1c1a] text-[#F8F8F5] border border-neutral-700 shadow-xl p-3.5 rounded-2xl flex items-center gap-3 text-xs font-medium">
          <div className="p-1 bg-emerald-500/15 rounded-lg text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Intro editorial: cómo funciona el flujo */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 text-left">
        <div className="max-w-2xl space-y-3">
          <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 tracking-tight leading-snug">
            ¿Cómo impacta el WhatsApp de los operarios <em className="font-light text-neutral-500">en la plataforma web?</em>
          </h3>
          <p className="text-sm text-neutral-500 font-light leading-relaxed">
            Cuando los choferes u operarios envían un mensaje por WhatsApp — en lugar de llamadas
            manuales — el webhook de Kernium procesa el lenguaje natural con IA y actualiza la
            central inmediatamente. Probalo: enviá un mensaje o disparí un escenario precargado.
          </p>
        </div>

        <button
          onClick={handleResetShowcase}
          className="flex items-center gap-2 bg-white border border-neutral-300 text-neutral-600 hover:text-[#1c1c1a] hover:border-[#1c1c1a] px-4 py-2.5 rounded-full transition-all cursor-pointer font-mono text-[10px] uppercase tracking-wider shrink-0 w-fit"
          title="Reiniciar todos los estados de la demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Demo</span>
        </button>
      </div>

      {/* Flujo en 3 pasos, estilo editorial claro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            num: '01',
            title: 'WhatsApp del Chofer',
            desc: 'Los operarios envían textos libres detallando alarmas o finalizaciones de turno sin salir de la ruta.',
            dot: 'bg-emerald-500'
          },
          {
            num: '02',
            title: 'Análisis IA Kernium',
            desc: 'Extrae el ID del vehículo, clasifica la gravedad y genera órdenes de taller de inmediato.',
            dot: 'bg-amber-500'
          },
          {
            num: '03',
            title: 'Impacto Web Instantáneo',
            desc: 'El panel web mapea al equipo en alerta y sugiere despachos de mecánicos.',
            dot: 'bg-neutral-900'
          }
        ].map((card) => (
          <div key={card.num} className="bg-white p-5 rounded-xl border border-neutral-200 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
              <span className="font-mono text-[10px] text-neutral-400 tracking-widest">{card.num}</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-neutral-900">{card.title}</h4>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Marco "ventana" oscuro con los tres paneles, mismo lenguaje que la demo AuditBot */}
      <div className="bg-neutral-900 text-[#F8F8F5] rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">

        {/* Window bar */}
        <div className="bg-[#1c1c1a] px-4 py-3 flex items-center justify-between border-b border-neutral-800 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block opacity-80" />
          </div>
          <div className="bg-neutral-800/80 px-4 py-1 rounded-lg text-[10px] font-mono text-neutral-400 tracking-wide max-w-sm w-3/5 truncate text-center select-none border border-neutral-700/30">
            kernium.app/console — demo interactiva en vivo
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>SECURE // WS</span>
          </div>
        </div>

        {/* Triple board grid */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">

            {/* COLUMN 1: WHATSAPP PHONE */}
            <div className="xl:col-span-4 flex flex-col">
              <div className="mb-2 px-1 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> 1) Canal Operadores
                </span>
                <span className="text-[9px] font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                  TELÉFONO
                </span>
              </div>
              <div className="flex-1">
                <PhoneMockup
                  operators={operators}
                  selectedOperatorId={selectedOperatorId}
                  onSelectOperator={handleSelectOperator}
                  onSendMessage={handleSendMessage}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

            {/* COLUMN 2: KERNIUM WEB DASHBOARD */}
            <div className="xl:col-span-5 flex flex-col">
              <div className="mb-2 px-1 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Layout className="w-3.5 h-3.5 text-emerald-400" /> 2) Consola Web Kernium
                </span>
                <span className="text-[9px] font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                  ESCRITORIO
                </span>
              </div>
              <div className="flex-1">
                <DashboardMockup
                  vehicles={vehicles}
                  tickets={tickets}
                  onConfirmTicket={handleResolveTicket}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onDispatchMechanic={handleDispatchMechanic}
                />
              </div>
            </div>

            {/* COLUMN 3: AI PIPELINE */}
            <div className="xl:col-span-3 flex flex-col">
              <div className="mb-2 px-1 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" /> 3) Middleware IA
                </span>
                <span className="text-[9px] font-mono text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">
                  INTERNO
                </span>
              </div>
              <div className="flex-1">
                <AIPipeline
                  steps={pipelineSteps}
                  currentMessageText={currentMessageText}
                  isProcessing={isProcessing}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom toolbar, igual a la ventana de AuditBot */}
        <div className="bg-[#1c1c1a] border-t border-neutral-800 px-5 py-3 flex justify-between items-center text-[10px] font-mono text-neutral-500">
          <p>// STACK: WHATSAPP BUSINESS API / NLP / WEBSOCKETS / PANEL WEB</p>
          <span className="uppercase tracking-widest">Simulación Interactiva</span>
        </div>
      </div>

      {/* Guía de prueba, tarjeta clara como las del sidebar de AuditBot */}
      <div className="bg-neutral-100/50 border border-neutral-200 p-6 rounded-2xl text-left">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> GUÍA DE PRUEBA
        </h4>
        <ol className="text-xs text-neutral-600 font-light leading-relaxed space-y-1.5 list-decimal list-inside">
          <li>
            En <strong className="font-medium">Escenarios Listos</strong> (debajo del teléfono), hacé clic en{' '}
            <span className="text-rose-700 font-medium">🚨 Alerta: Grúa con pérdida crítica</span> — el teléfono envía la alerta al canal.
          </li>
          <li>
            Observá el <strong className="font-medium">Middleware IA</strong> (columna derecha): procesa el webhook, extrae las entidades clave y actualiza la geolocalización.
          </li>
          <li>
            En la <strong className="font-medium">Consola Web</strong> la grúa CR-04 pasa a alerta roja, se crea la orden de mantenimiento y el sistema sugiere despachar al mecánico.
          </li>
          <li>
            Presioná el despachador: el taller asigna al técnico y el chofer recibe la confirmación automática por WhatsApp en tiempo real.
          </li>
        </ol>
      </div>

    </div>
  );
}
