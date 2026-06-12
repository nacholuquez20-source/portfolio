import { Project, FAQItem } from './types';

import heroBanner from './assets/images/hero-banner-juan.jpg';
import projectAuditbot from './assets/images/project_auditbot_1781199868816.jpg';
import projectTallerhub from './assets/images/project_tallerhub_1781199880336.jpg';
import projectKernium from './assets/images/project_kernium_1781199891528.jpg';
import projectFlujonorte from './assets/images/project_flujonorte.jpg';

export const PORTRAIT = heroBanner;

export const WHATSAPP_URL = 'https://wa.me/5493814758763';
export const EMAIL = 'luquez.jignacio@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/juan-ignacio-luquez-9138192bb/';
export const GITHUB_URL = 'https://github.com/nachoing';

export const PROJECTS: Project[] = [
  {
    id: 'auditbot',
    title: 'AuditBot',
    badges: ['IA Aplicada', 'WhatsApp Business', 'En Producción'],
    description:
      'Auditorías operativas de farmacias gestionadas íntegramente por WhatsApp: checklists guiadas, evidencia fotográfica, detección de desvíos y panel web de control central.',
    fullDescription:
      'AuditBot convierte la auditoría presencial en un flujo conversacional trazable. El auditor recibe la checklist reglamentaria por WhatsApp, carga evidencias fotográficas (cadena de frío, vencimientos, exhibición) y el sistema detecta desvíos contra los umbrales definidos, los escala por severidad y los consolida en un panel web para los supervisores centrales. Cada acción correctiva queda sellada con GPS, foto y firma digital.',
    image: projectAuditbot,
    techStack: ['WhatsApp Business API', 'Claude API', 'Python · FastAPI', 'PostgreSQL', 'React'],
    metrics: [
      { label: 'Estado', value: 'En producción' },
      { label: 'Canal principal', value: 'WhatsApp' },
      { label: 'Trazabilidad', value: 'GPS + Foto + Firma' }
    ],
    challenge:
      'Las auditorías en papel o planillas se completaban tarde, sin evidencia verificable y sin forma de saber si el desvío detectado se corrigió realmente.',
    solution:
      'Llevar la auditoría completa al canal que el personal ya usa todos los días — WhatsApp — y centralizar la detección de desvíos, el escalamiento y el cierre auditable en un panel web en tiempo real.'
  },
  {
    id: 'tallerhub',
    title: 'TallerHub',
    badges: ['SaaS', 'Agente IA', 'En Desarrollo'],
    description:
      'Plataforma de gestión integral para talleres automotrices: transcripción de voz en tiempo real, NPS automático, dashboards operativos y agente IA para diagnóstico de vehículos.',
    fullDescription:
      'TallerHub digitaliza la operación diaria del taller automotriz sin sumar fricción. El mecánico dicta el estado del vehículo y el sistema lo transcribe y estructura en la orden de trabajo; el cliente recibe seguimiento y encuestas NPS automáticas; y un agente de IA asiste el diagnóstico inicial a partir de los síntomas relevados. Todo se consolida en dashboards operativos para el dueño del taller.',
    image: projectTallerhub,
    techStack: ['React', 'FastAPI', 'Claude API', 'WhatsApp', 'PostgreSQL'],
    metrics: [
      { label: 'Estado', value: 'En desarrollo' },
      { label: 'Año', value: '2025' },
      { label: 'Entrada de datos', value: 'Voz en tiempo real' }
    ],
    challenge:
      'Los talleres pierden información valiosa porque cargar datos en un sistema compite con el trabajo manual: nadie suelta la llave para tipear en una pantalla.',
    solution:
      'Hacer que la voz sea la interfaz: el mecánico habla mientras trabaja y el sistema estructura, registra y comunica por él.'
  },
  {
    id: 'kernium',
    title: 'Kernium',
    badges: ['Intralogística', 'IA Predictiva', 'En Desarrollo'],
    description:
      'Sistema de gestión de flota industrial con IA para operaciones de intralogística: optimización de rutas, mantenimiento predictivo y reportes automáticos.',
    fullDescription:
      'Kernium centraliza la operación de flotas internas (montacargas, apiladores, zorras eléctricas) en un solo tablero. Analiza patrones de uso para anticipar fallas y programar mantenimiento antes de la rotura, optimiza las trayectorias internas para evitar cuellos de botella en planta, y despacha reportes operativos automáticos por WhatsApp a los supervisores.',
    image: projectKernium,
    techStack: ['Python', 'n8n', 'Claude API', 'Docker'],
    metrics: [
      { label: 'Estado', value: 'En desarrollo' },
      { label: 'Año', value: '2025' },
      { label: 'Reportes', value: 'Automáticos por WhatsApp' }
    ],
    challenge:
      'La flota interna de una planta suele gestionarse de forma reactiva: la unidad se rompe, la operación se frena y el mantenimiento corre detrás de la urgencia.',
    solution:
      'Pasar de mantenimiento reactivo a predictivo: detectar el patrón de falla antes de la rotura y despachar la orden de trabajo con el repuesto ya asignado.'
  },
  {
    id: 'flujonorte',
    title: 'FlujoNorte',
    badges: ['Automatización', 'Agroindustria', 'En Producción'],
    description:
      'Automatizaciones internas para una citrícola tucumana: reportes de producción, alertas de calidad y consolidación de datos a dashboard operativo.',
    fullDescription:
      'FlujoNorte eliminó la carga manual de reportes en una operación citrícola real. Los datos de producción y calidad se consolidan automáticamente desde las fuentes existentes hacia un dashboard operativo, con alertas cuando un indicador sale de rango. La gerencia pasó de esperar la planilla del día siguiente a ver la operación en tiempo real.',
    image: projectFlujonorte,
    techStack: ['n8n', 'Google Sheets', 'Metabase'],
    metrics: [
      { label: 'Estado', value: 'En producción' },
      { label: 'Año', value: '2024' },
      { label: 'Rubro', value: 'Citrícola · Tucumán' }
    ],
    challenge:
      'La información de producción vivía en planillas dispersas que alguien tenía que consolidar a mano, con horas de demora y errores de tipeo.',
    solution:
      'Automatizar el flujo completo con herramientas que el equipo ya conocía: n8n orquesta, Google Sheets sigue siendo la entrada y Metabase muestra el estado real de la operación.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: '¿Qué tipo de problemas resolvés?',
    answer:
      'Trabajo en el cruce entre procesos industriales y tecnología: diagnóstico y rediseño de flujos operativos con Lean, ISO y 5S; automatizaciones con n8n, WhatsApp Business y agentes de IA que trabajan solos 24/7; y desarrollo de SaaS a medida para talleres, flotas e intralogística — del prototipo al deploy en producción.'
  },
  {
    id: 'faq2',
    question: '¿Cómo es tu proceso de trabajo?',
    answer:
      'Empiezo con una auditoría operativa del proceso real — observando a la gente que lo ejecuta, no una pizarra. De ahí sale una hoja de ruta con quick wins implementables en 30 días y una visión a 12 meses. Después construyo de manera iterativa, midiendo cada mejora contra los KPIs definidos al inicio.'
  },
  {
    id: 'faq3',
    question: '¿Por qué un ingeniero industrial y no solo un desarrollador?',
    answer:
      'Porque entiendo el piso de fábrica, el taller mecánico y la logística real, y eso cambia profundamente lo que construyo. No construyo herramientas en el vacío — las construyo junto a la gente que las va a usar. Cada flujo nace de observar personas resolviendo problemas reales.'
  },
  {
    id: 'faq4',
    question: '¿Con qué tecnologías y metodologías trabajás?',
    answer:
      'Python y FastAPI en backend; React y Next en frontend; n8n para orquestar automatizaciones; Claude y otras APIs de LLM para los agentes de IA; PostgreSQL como base de datos; Docker y Railway para deploy; y WhatsApp Business API como canal operativo. En lo metodológico: Lean, ISO 9001 y 5S.'
  },
  {
    id: 'faq5',
    question: '¿Trabajás de forma remota?',
    answer:
      'Sí. Estoy basado en Tucumán, Argentina, y trabajo con empresas de todo el país y LATAM de forma remota. Para diagnósticos en planta o puestas en marcha que requieren presencia física, coordino visitas en sitio.'
  }
];

