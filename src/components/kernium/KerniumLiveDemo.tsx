import { useState } from 'react';
import { Sparkles, MessageSquare, Cpu, CheckCircle, Layout, CornerRightDown, RotateCcw } from 'lucide-react';
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
    <div className="bg-slate-950 text-slate-100 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden relative font-sans antialiased">

      {/* Dynamic Toast feedback */}
      {toastMessage && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full bg-slate-900/95 border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-slate-100 p-3.5 rounded-2xl flex items-center gap-3 text-xs font-semibold">
          <div className="p-1 bg-emerald-500/10 rounded-lg text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="p-4 md:p-6 space-y-6">

        {/* Intro Explanatory Banner */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-36 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                Demo Interactiva en Vivo
              </span>
              <h2 className="text-xl md:text-2xl font-black text-slate-100 tracking-tight mt-2.5">
                ¿Cómo impacta el WhatsApp de los operarios en la plataforma web?
              </h2>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                Cuando los choferes u operarios envían un mensaje por WhatsApp — en lugar de llamadas manuales —
                el webhook de Kernium procesa el lenguaje natural con IA y actualiza la central inmediatamente.
                Probalo: enviá un mensaje o disparí un escenario precargado.
              </p>
            </div>

            <button
              onClick={handleResetShowcase}
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-all hover:bg-slate-800 font-medium cursor-pointer text-xs shrink-0"
              title="Reiniciar todos los estados de la demo"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
              <span>Reiniciar Demo</span>
            </button>
          </div>

          {/* Flow explanation cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-slate-800">
            {[
              {
                num: '01',
                title: 'WhatsApp del Chofer',
                desc: 'Los operarios envían textos libres detallando alarmas o finalizaciones de turno sin salir de la ruta.',
                color: 'text-emerald-400 border-emerald-950 bg-emerald-500/5'
              },
              {
                num: '02',
                title: 'Análisis IA Kernium',
                desc: 'Extrae el ID del vehículo, clasifica la gravedad y genera órdenes de taller de inmediato.',
                color: 'text-blue-400 border-blue-950 bg-blue-500/5'
              },
              {
                num: '03',
                title: 'Impacto Web Instantáneo',
                desc: 'El panel web mapea al equipo en alerta y sugiere despachos de mecánicos.',
                color: 'text-amber-400 border-amber-950 bg-amber-500/5'
              }
            ].map((card, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${card.color} flex flex-col justify-between`}>
                <div>
                  <span className="font-mono font-black text-xs block mb-1 opacity-50">{card.num}</span>
                  <h4 className="text-xs font-bold text-slate-200">{card.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
                </div>
                <CornerRightDown className="w-3.5 h-3.5 mt-3 opacity-30 self-end hidden md:block" />
              </div>
            ))}
          </div>
        </section>

        {/* TRIPLE INTERACTIVE BOARD GRID */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">

          {/* COLUMN 1: WHATSAPP PHONE */}
          <div className="xl:col-span-4 flex flex-col">
            <div className="mb-2 px-1 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> 1) Canal Operadores
              </span>
              <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md font-mono">
                MOCKUP TELÉFONO
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
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Layout className="w-3.5 h-3.5 text-blue-400" /> 2) Consola Web Kernium
              </span>
              <span className="text-[10px] text-blue-400 bg-blue-900/10 border border-blue-500/20 px-2 py-0.5 rounded-md font-mono">
                VISTA ESCRITORIO
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
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> 3) Middleware de Análisis
              </span>
              <span className="text-[10px] text-purple-400 bg-purple-900/10 border border-purple-500/20 px-2 py-0.5 rounded-md font-mono">
                UNDER THE HOOD
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

        </section>

        {/* WORKFLOW INSTRUCTION GUIDE */}
        <section className="bg-slate-900/45 border border-slate-800 p-5 rounded-2xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Guía de Prueba
          </h3>
          <p className="text-[11px] text-slate-400 leading-normal">
            1. En <strong>Escenarios Listos</strong> (debajo del teléfono), hacé clic en <span className="text-emerald-400">🚨 Alerta: Grúa con pérdida crítica</span>. Verás cómo el teléfono envía la alerta mecánica al canal.<br />
            2. Observá el <strong>Middleware de Análisis</strong> (columna derecha): la IA procesa el webhook, extrae las entidades clave y actualiza la geolocalización para encender el radar rojo.<br />
            3. En la <strong>Consola de Flota</strong> la grúa CR-04 pasa a alerta roja, se crea una orden de mantenimiento urgente y el sistema sugiere <span className="text-slate-100 font-semibold bg-rose-500/15 py-0.5 px-1.5 rounded text-[10px]">Despachar Mecánico</span>.<br />
            4. Presioná el despachador: el taller asigna al técnico y el chofer recibe la confirmación automática por WhatsApp en tiempo real.
          </p>
        </section>

      </div>
    </div>
  );
}
