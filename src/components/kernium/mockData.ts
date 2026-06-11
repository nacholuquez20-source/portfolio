import { Vehicle, Operator, MaintenanceTicket } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'TR-01',
    name: 'Truck 01 (Volvo FMX)',
    type: 'Truck',
    status: 'Operating',
    operator: 'Martín Gómez',
    location: { x: 35, y: 40, name: 'Cantera Norte - Ruta 3' },
    metrics: {
      battery: 94,
      fuelEfficiency: '2.4 km/L',
      temperature: '84°C',
    }
  },
  {
    id: 'TR-02',
    name: 'Truck 02 (Scania G410)',
    type: 'Truck',
    status: 'Operating',
    operator: 'Sofía Almada',
    location: { x: 58, y: 25, name: 'Zona de Carga B' },
    metrics: {
      battery: 89,
      fuelEfficiency: '2.1 km/L',
      temperature: '89°C',
    }
  },
  {
    id: 'CR-04',
    name: 'Crane 04 (Liebherr LTM)',
    type: 'Crane',
    status: 'Operating',
    operator: 'Carlos Ortiz',
    location: { x: 45, y: 65, name: 'Sector Estructuras 4' },
    metrics: {
      battery: 98,
      fuelEfficiency: '14.5 L/hr',
      temperature: '76°C',
    }
  },
  {
    id: 'VN-03',
    name: 'Van 03 (Mercedes Sprinter)',
    type: 'Van',
    status: 'Maintenance',
    operator: 'Lucas Silva',
    location: { x: 20, y: 75, name: 'Taller Central de Servicio' },
    metrics: {
      battery: 42,
      fuelEfficiency: '8.2 L/100km',
      temperature: '0°C',
      warningMsg: 'Filtros y bujías desgastadas'
    }
  }
];

export const INITIAL_OPERATORS: Operator[] = [
  {
    id: 'carlos',
    name: 'Carlos Ortiz',
    role: 'Operario de Grúa (CR-04)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    vehicleId: 'CR-04',
    unreadCount: 1,
    initialChat: [
      {
        id: 'c1',
        sender: 'operator',
        text: 'Hola, empezamos la jornada en el Sector Estructuras 4. Todo en orden mecánico preliminar.',
        timestamp: '11:05 AM'
      },
      {
        id: 'c2',
        sender: 'ai_system',
        text: 'Mensaje recibido, Carlos. Telemetría de CR-04 se reporta estable.',
        timestamp: '11:06 AM'
      }
    ]
  },
  {
    id: 'sofia',
    name: 'Sofía Almada',
    role: 'Chofer de Camión (TR-02)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    vehicleId: 'TR-02',
    unreadCount: 0,
    initialChat: [
      {
        id: 's1',
        sender: 'operator',
        text: 'Comenzando traslado de piedra hacia Zona de Carga B.',
        timestamp: '10:45 AM'
      },
      {
        id: 's2',
        sender: 'ai_system',
        text: 'Registrado. Ruta óptima asignada.',
        timestamp: '10:45 AM'
      }
    ]
  },
  {
    id: 'lucas',
    name: 'Lucas Silva',
    role: 'Técnico de Taller (VN-03)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    vehicleId: 'VN-03',
    unreadCount: 0,
    initialChat: [
      {
        id: 'l1',
        sender: 'ai_system',
        text: 'Recordatorio automático: Van VN-03 requiere cambio preventivo de filtros y bujías hoy.',
        timestamp: '08:00 AM'
      },
      {
        id: 'l2',
        sender: 'operator',
        text: 'Recibido. Ya tengo el van ingresado en la fosa del taller central.',
        timestamp: '08:30 AM'
      }
    ]
  }
];

export const INITIAL_TICKETS: MaintenanceTicket[] = [
  {
    id: 'WO-2401',
    vehicleId: 'VN-03',
    issue: 'Reemplazo de filtros de combustible y aire',
    reportedBy: 'Lucas Silva',
    date: '11/06/2026',
    status: 'In Progress',
    severity: 'low'
  }
];

export interface Scenario {
  id: string;
  name: string;
  description: string;
  operatorId: string;
  messageText: string;
}

export const PRESET_SCENARIOS: Scenario[] = [
  {
    id: 'scen_fuga',
    name: '🚨 Alerta: Grúa con pérdida crítica',
    description: 'Simula a Carlos reportando un desperfecto mayor por chat. La IA extraerá los datos y desatará una alarma roja.',
    operatorId: 'carlos',
    messageText: 'Alerta de falla. La grúa CR-04 está perdiendo líquido hidráulico de la bomba y hace un chillido muy fuerte al levantar carga. Detuve el motor por las dudas.'
  },
  {
    id: 'scen_luz',
    name: '⚠️ Advertencia: Truck TR-02 tablero',
    description: 'Sofía reporta una luz de check-engine preventiva. Generará una alerta naranja en la web para inspección futura.',
    operatorId: 'sofia',
    messageText: 'Buen día, se me prendió la luz indicadora del motor en el tablero del Scania TR-02. Detuve la marcha y revisé refrigerante, está todo normal. ¿Puedo seguir?'
  },
  {
    id: 'scen_reparo',
    name: '✅ Resuelto: Van VN-03 listo',
    description: 'Lucas avisa que terminó el service del van. El sistema lo reincorporará y lo pasará a operativo en tiempo real.',
    operatorId: 'lucas',
    messageText: 'Listo por acá. Terminado el service programado de Van VN-03. Cambié filtros, repasé niveles y bujías. El van ya está impecable y en marcha para volver a operar.'
  }
];
