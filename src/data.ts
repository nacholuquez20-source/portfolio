import { FAQItem, Metric, Project } from './types';

import heroBanner from './assets/images/hero-banner-juan.jpg';
import fotoPerfil from './assets/images/foto-sobre-mi.jpg';

export const PORTRAIT = heroBanner;
export const PROFILE_PHOTO = fotoPerfil;

export const WHATSAPP_NUMBER = '5493814758763';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_LABEL = '+54 9 381 475-8763';
export const EMAIL = 'luquez.jignacio@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/juanignacioluquez';
export const INSTAGRAM_URL = 'https://www.instagram.com/juanluquezia/';
export const INSTAGRAM_HANDLE = '@juanluquezia';

export const NAV = [
  { id: 'metodo', num: '01', label: 'Método' },
  { id: 'proyectos', num: '02', label: 'Proyectos' },
  { id: 'como-funciona', num: '03', label: 'Cómo funciona' },
  { id: 'servicios', num: '04', label: 'Servicios' },
  { id: 'perfil', num: '05', label: 'Perfil' },
  { id: 'contacto', num: '06', label: 'Contacto' },
] as const;

/** Cifras reales, verificables en cada proyecto o en la trayectoria. */
export const HERO_FACTS: Metric[] = [
  { value: '23', label: 'sucursales auditadas por WhatsApp' },
  { value: '2', label: 'provincias usan TallerHub a diario' },
  { value: '5 min', label: 'entre sincronizaciones con el DMS' },
  { value: '3', label: 'certificaciones ISO 9001 / 14001' },
];

export const METHOD_STEPS = [
  {
    num: '01',
    verb: 'Relevar',
    title: 'Ver el proceso real',
    body: 'Voy al lugar y miro el proceso con la gente que lo hace todos los días. Diagramo el flujo, ubico las esperas y anoto dónde se pierde la información.',
    tools: ['Diagramas de flujo', 'Relevamiento en campo', 'Entrevistas'],
    phase: 'tinta',
  },
  {
    num: '02',
    verb: 'Medir',
    title: 'Encontrar el cuello de botella',
    body: 'Tomo datos antes de proponer nada: tiempos, retrabajos, errores de carga, pendientes sin cerrar. El número dice qué conviene automatizar y qué no.',
    tools: ['KPIs', 'Teoría de colas', 'Ishikawa · 8D'],
    phase: 'papel',
  },
  {
    num: '03',
    verb: 'Diseñar',
    title: 'Construir la herramienta justa',
    body: 'La carga ocurre donde el equipo ya trabaja: WhatsApp, el celular, un enlace sin login. La IA interpreta; las reglas del negocio las valida el sistema.',
    tools: ['WhatsApp + IA', 'Integraciones', 'Software a medida'],
    phase: 'senal',
  },
  {
    num: '04',
    verb: 'Sostener',
    title: 'Medir el resultado y ajustar',
    body: 'Tableros y resúmenes automáticos para el que decide. Si algo no se usa, se rediseña: el proyecto termina cuando el cambio queda, no cuando se entrega el software.',
    tools: ['Tableros', 'PDCA', 'Mejora continua'],
    phase: 'cinabrio',
  },
] as const;

export const THESIS = {
  title: 'Estrategias de mejora en la atención al cliente y la gestión productiva en talleres de concesionarias de posventa',
  place: 'Tesis de Ingeniería Industrial · UNT · aplicada en un taller de posventa',
  facts: [
    { value: '347', label: 'llegadas de clientes relevadas en campo' },
    { value: '−60 %', label: 'tiempo medio de espera proyectado con teoría de colas' },
    { value: '73,7 h', label: 'horas-hombre por mes ahorradas con mejoras Lean (5S)' },
  ] as Metric[],
};

export const PROJECTS: Project[] = [
  {
    id: 'tallerhub',
    fig: 'FIG. 02',
    title: 'TallerHub',
    client: 'Concesionario oficial',
    sector: 'Posventa automotriz',
    year: '2025 — hoy',
    status: { label: 'En producción', kind: 'live' },
    tagline: 'El sistema de gestión que el taller usa todos los días, en Tucumán y Salta.',
    problem:
      'Las órdenes de trabajo vivían repartidas entre el sistema de gestión del concesionario, planillas y mensajes sueltos. Cada área se enteraba tarde de lo que le tocaba y nadie veía el estado real del taller.',
    solution:
      'Un tablero único de órdenes y estados que se sincroniza solo con el sistema de gestión del concesionario (DMS) y avisa por WhatsApp a cada área cuando una orden la necesita. La asesora registra un ingreso dictando un audio y el agente valida cada dato antes de cargarlo.',
    highlights: [
      'Tablero de órdenes con estados, prioridades y vista kanban para todo el taller.',
      'Sincronización automática con el DMS del concesionario cada 5 minutos.',
      'Avisos por WhatsApp a cada área: asesoras, repuestos y lavadero.',
      'Agente de IA por WhatsApp que toma ingresos y turnos por texto o audio y valida cada dato antes de registrarlo.',
      'Checklist de calidad de fábrica completado desde el celular, con reporte semanal de desvíos.',
      'Tableros de KPIs: tasa de retrabajo, productividad por técnico, tiempos de espera y de entrega.',
    ],
    flow: ['Orden en el DMS', 'Sincronización cada 5 min', 'Tablero TallerHub', 'Aviso por WhatsApp al área', 'KPIs del taller'],
    results: [
      { value: '2', label: 'sucursales en uso diario: Tucumán y Salta' },
      { value: '5 min', label: 'entre sincronizaciones con el DMS' },
      { value: '1', label: 'tablero en lugar de planillas y mensajes sueltos' },
    ],
    lesson: {
      title: 'Nació de una tesis, no de una idea de software',
      body: 'Antes de escribir código relevé 347 llegadas de clientes y modelé la recepción con teoría de colas. El sistema digitaliza el proceso que ese estudio dejó ordenado.',
    },
    stack: ['React', 'Vite', 'Node.js', 'Express', 'Supabase · PostgreSQL', 'WhatsApp Cloud API', 'OpenAI · Whisper', 'Railway', 'Vercel'],
    tone: 'tinta',
    visual: 'tallerhub',
    featured: true,
  },
  {
    id: 'circuito',
    fig: 'FIG. 03',
    title: 'Circuito',
    previously: 'AuditBot',
    client: 'Farmacias Plazoleta',
    sector: 'Retail farmacéutico · 25 sucursales',
    year: '2026',
    status: { label: 'v1 en producción · v2 en desarrollo', kind: 'live' },
    tagline: 'Lo que se detecta en la sucursal se arregla, y el dueño lo ve.',
    problem:
      'La cadena auditaba sus sucursales, pero lo detectado no se corregía: las observaciones quedaban en planillas, nadie perseguía el cierre y el dueño se enteraba tarde de lo que fallaba.',
    solution:
      'La primera versión, AuditBot, llevó la auditoría a WhatsApp en 23 sucursales: el auditor manda hallazgos por texto, audio o foto y la IA los estructura en reportes y planes de acción. Circuito la rediseña alrededor del cierre: detectar, resolver, verificar y ver.',
    highlights: [
      'El referente de la sucursal resuelve cada pendiente con una foto, sin escribir “hola” ni instalar nada.',
      'Enlace de visita sin login: el encargado acepta el compromiso y resuelve desde el celular.',
      'Vencidos de perfumería con acción sugerida según los días al vencimiento y registro de la plata recuperada.',
      'Circulares de exhibición para todas las sucursales, con foto de ejemplo y respuesta de cada una.',
      'Resumen del lunes al dueño por WhatsApp: cinco líneas, sin scroll.',
      'Escalamiento automático a las 48 h y KPIs de respuesta por sucursal.',
    ],
    flow: ['El auditor detecta', 'La sucursal resuelve con foto', 'El auditor verifica', 'El dueño ve el resumen del lunes'],
    results: [
      { value: '23', label: 'sucursales auditadas por WhatsApp con AuditBot' },
      { value: '672', label: 'tests automáticos en verde en Circuito' },
      { value: '48 h', label: 'hasta el escalamiento automático' },
    ],
    lesson: {
      title: 'AuditBot detectaba bien, pero no cerraba',
      body: 'Los encargados nunca se sumaron: el bot rechazaba la foto que mandaban directo. Medí dónde se cortaba el circuito y lo rediseñé desde ahí. Es PDCA aplicado al propio producto.',
    },
    stack: ['Python', 'FastAPI', 'Supabase', 'WhatsApp Cloud API', 'Claude API', 'Whisper', 'ReportLab', 'Railway'],
    tone: 'papel',
    visual: 'circuito',
    featured: true,
    extraLink: { label: 'Política de privacidad de AuditBot', href: '/privacy.html' },
  },
  {
    id: 'aula',
    fig: 'FIG. 04',
    title: 'Aula Virtual',
    client: 'Farmacias Plazoleta',
    sector: 'Capacitación interna',
    year: '2026',
    status: { label: 'En línea', kind: 'live' },
    tagline: 'Capacitación del personal y un asistente que revisa recetas según cada obra social.',
    problem:
      'Las normas de obras sociales, prepagas y mutuales cambian seguido y vivían en PDFs y en la memoria de cada uno. Una receta mal aceptada le cuesta plata a la farmacia.',
    solution:
      'Un aula virtual con módulos, videos, carruseles y material descargable, más un asistente con IA para el mostrador: consulta la ficha vigente de cada obra social con herramientas, nunca de memoria, y revisa la foto de una receta requisito por requisito.',
    highlights: [
      'Ingreso del personal con una contraseña única y panel de administración para cargar módulos, videos, carruseles y archivos.',
      'Se instala en el celular como una app.',
      'El asistente responde con la ficha vigente de cada obra social y dice desde cuándo rige.',
      'Revisión de recetas por foto con veredicto claro: bien, revisar o no se puede aceptar.',
      'Si un dato no está en la ficha, lo dice y deriva a la auditora: no completa con suposiciones.',
    ],
    flow: ['Pregunta o foto de la receta', 'Ficha vigente de la obra social', 'Control requisito por requisito', 'Veredicto y qué hacer'],
    results: [
      { value: '8', label: 'módulos de capacitación' },
      { value: '1 foto', label: 'alcanza para revisar una receta' },
    ],
    stack: ['HTML · CSS · JS', 'Supabase · Auth · Storage', 'Edge Functions', 'Claude API · tool use', 'PWA', 'Vercel'],
    tone: 'tinta',
    visual: 'aula',
  },
  {
    id: 'audicampo',
    fig: 'FIG. 05',
    title: 'AudiCampo',
    client: 'Producción agrícola · Tucumán',
    sector: 'Agro · partes de trabajo de campo',
    year: '2026',
    status: { label: 'MVP', kind: 'build' },
    tagline: 'El capataz manda un audio por WhatsApp y el parte diario queda en la planilla.',
    problem:
      'Los partes de trabajo de campo (lote, sección, tarea, cantidad, trabajador) se anotaban en papel y alguien los pasaba a mano a la planilla, con demoras y errores de tipeo.',
    solution:
      'El capataz dicta el parte en un audio. La IA lo interpreta y devuelve los datos estructurados; la validación contra los catálogos, la confirmación y la escritura son deterministas. Nada se guarda sin que el capataz responda CONFIRMAR.',
    highlights: [
      'Audio de WhatsApp convertido en datos estructurados con un modelo multimodal.',
      'Validación contra los catálogos de capataces, lotes, secciones, tareas y contratistas.',
      'Ningún parte se guarda sin el CONFIRMAR del capataz.',
      'Fila final con exactamente 10 columnas de negocio en Google Sheets.',
      'Cola de procesamiento con reintento automático: no se pierde un audio si se cae la instancia.',
      'Webhook con verificación de firma y descarte de mensajes duplicados.',
    ],
    flow: ['Audio del capataz', 'La IA interpreta', 'Validación con catálogos', 'CONFIRMAR', 'Fila en la planilla'],
    results: [
      { value: '10', label: 'columnas exactas por parte' },
      { value: '1', label: 'audio reemplaza al parte en papel' },
    ],
    lesson: {
      title: 'La IA interpreta. El sistema decide.',
      body: 'El modelo solo convierte el audio en datos. Validar, confirmar y escribir lo hace código determinista: así un error de interpretación nunca llega a la planilla.',
    },
    stack: ['Python', 'FastAPI', 'Gemini', 'WhatsApp Cloud API', 'Google Sheets', 'Cloud Run', 'Cloud Tasks', 'Firestore'],
    tone: 'papel',
    visual: 'audicampo',
  },
  {
    id: 'bioglosse',
    fig: 'FIG. 06',
    title: 'Bioglosse',
    client: 'BPC Group · Bioglosse',
    sector: 'Trade marketing · dermocosmética',
    year: '2026',
    status: { label: 'En desarrollo', kind: 'build' },
    tagline: 'La promotora carga la visita mientras trabaja, y al cerrar sale solo el reporte.',
    problem:
      'Las promotoras completaban en cada farmacia un checklist impreso que después nadie transcribía. El papel guiaba la visita, pero no registraba datos.',
    solution:
      'Una app web para el celular que recorre la visita paso a paso: foto de llegada, check de los 19 productos en orden de planograma, punto de venta, foto de salida y cierre. Al terminar arma el resumen con semáforo, faltantes y fotos de antes y después.',
    highlights: [
      'Check de 19 productos en orden de planograma, con carga completa en un toque.',
      'Surtido y carga como dos números distintos, y aviso de descuadre de stock que avisa sin bloquear.',
      'Observaciones con foto y dictado desde cualquier paso de la visita.',
      'Las fotos se suben apenas se sacan, no al enviar la visita.',
      'Resumen con semáforo, faltantes y antes/después, y reporte de jornada en PDF.',
      'Tablero interno para el dueño y el área de ventas.',
    ],
    flow: ['Llegada con foto', 'Check de 19 productos', 'Punto de venta', 'Cierre', 'Reporte con semáforo'],
    results: [
      { value: '19', label: 'productos por visita, en orden de planograma' },
      { value: '53', label: 'tests automáticos en verde' },
    ],
    stack: ['Python', 'FastAPI', 'ReportLab', 'Supabase'],
    tone: 'papel',
    visual: 'bioglosse',
  },
  {
    id: 'obras',
    fig: 'FIG. 07',
    title: 'Calidad en obra',
    client: 'Construcción',
    sector: 'Control de calidad de obra',
    year: 'Piloto',
    status: { label: 'Piloto terminado', kind: 'pilot' },
    tagline: 'Desvíos críticos detectados durante la obra, no después.',
    problem:
      'En construcción, un desvío de calidad que se detecta tarde se paga dos veces: en retrabajo y en plazo. Los controles en papel no muestran el avance real contra lo planificado.',
    solution:
      'Un sistema que registra los controles de calidad durante la etapa de construcción, marca los desvíos críticos y sigue el avance de obra contra la planificación.',
    highlights: [
      'Detección de desvíos críticos durante la ejecución de la obra.',
      'Seguimiento del avance real contra la planificación.',
      'Probado en un piloto en obra.',
    ],
    flow: ['Control en obra', 'Desvío crítico detectado', 'Avance contra el plan', 'Decisión a tiempo'],
    results: [],
    stack: [],
    tone: 'tinta',
    visual: 'obras',
  },
];

export const SERVICES = [
  {
    num: '4.1',
    title: 'Diagnóstico y mejora de procesos',
    body: 'Relevo el proceso, lo mido y encuentro el cuello de botella. Te llevás un diagnóstico con lo que conviene automatizar, lo que conviene ordenar primero y cómo se va a medir.',
    items: ['Relevamiento y diagramas de flujo', 'Lean · 5S · SMED · Kaizen', 'ISO 9001 · auditorías internas', 'Análisis de causa raíz'],
  },
  {
    num: '4.2',
    title: 'Automatización y agentes de IA',
    body: 'Bots de WhatsApp que reciben texto, audio y fotos, los convierten en datos y los cargan donde corresponde. Integraciones con los sistemas que ya usás.',
    items: ['Agentes por WhatsApp', 'Extracción de datos con IA', 'Integración con DMS, ERP y planillas', 'Avisos y escalamientos automáticos'],
  },
  {
    num: '4.3',
    title: 'Software a medida y tableros',
    body: 'Aplicaciones web pensadas para el celular y tableros para el que decide. Reportes que se arman solos, en PDF o en un mensaje de cinco líneas.',
    items: ['Apps web mobile-first', 'Tableros de KPIs', 'Reportes automáticos', 'Capacitación y asistentes internos'],
  },
];

export const NOT_DOING = ['IA porque sí', 'promesas milagrosas', 'herramientas sin proceso', 'software que nadie usa', '“la IA te reemplaza”'];

export const EXPERIENCE = [
  {
    period: '2024 — hoy',
    role: 'Analista de Procesos y Mejora Continua',
    org: 'Concesionario oficial · posventa automotriz',
    detail: 'Desarrollé TallerHub, digitalicé el control de calidad de fábrica y diseñé los tableros de KPIs del taller.',
  },
  {
    period: '2022 — 2023',
    role: 'Pasante de Calidad',
    org: 'Concesionario oficial · sector automotriz',
    detail: 'Participé en 3 procesos de certificación ISO 9001 e ISO 14001, auditorías internas y análisis de causa raíz (Ishikawa, 8D).',
  },
  {
    period: '2012 — 2025',
    role: 'Ingeniería Industrial',
    org: 'Universidad Nacional de Tucumán · FACET',
    detail: 'Tesis aplicada en un taller de posventa: teoría de colas y mejoras Lean.',
  },
  {
    period: '2006 — 2011',
    role: 'Técnico Electromecánico',
    org: 'Instituto Técnico Salesiano Lorenzo Massa',
    detail: '',
  },
];

export const SKILLS = [
  { area: 'Calidad', items: ['ISO 9001', 'ISO 14001', 'Auditorías internas', 'Planes de acción'] },
  { area: 'Mejora continua', items: ['Lean', '5S', 'SMED', 'Kaizen', 'Ishikawa', '8D'] },
  { area: 'Datos', items: ['Diseño de KPIs', 'Tableros', 'Power BI', 'Excel avanzado'] },
  { area: 'Desarrollo', items: ['Python', 'FastAPI', 'React', 'Node.js', 'Supabase', 'WhatsApp Cloud API', 'Claude · OpenAI · Gemini', 'n8n'] },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: '¿Qué tipo de empresas ayudás?',
    answer:
      'Pymes y empresas con procesos que hoy dependen de papel, planillas y mensajes sueltos de WhatsApp: posventa automotriz, cadenas con sucursales, trade marketing, agro y construcción. Si alguien en tu equipo pasa datos a mano todos los días, hay un proceso para ordenar.',
  },
  {
    id: 'faq2',
    question: '¿Cómo empieza un proyecto?',
    answer:
      'Con un relevamiento del proceso real, en el lugar y con la gente que lo hace. De ahí sale un diagnóstico con el cuello de botella y una propuesta concreta: qué se automatiza, qué no, en qué orden y con qué indicador vamos a saber si funcionó.',
  },
  {
    id: 'faq3',
    question: '¿Por qué un ingeniero industrial y no solo un programador?',
    answer:
      'Porque el cuello de botella casi nunca es la tecnología: es el paso que nadie midió. Automatizar un proceso desordenado solo acelera el desorden. Mi formación en calidad y mejora continua me hace empezar por el proceso y terminar recién cuando el cambio se sostiene.',
  },
  {
    id: 'faq4',
    question: '¿Mi equipo tiene que aprender un sistema nuevo?',
    answer:
      'Lo menos posible. La carga se hace donde ya trabajan: WhatsApp, el celular o un enlace sin login. Lo nuevo suele ser el tablero, y es para quien decide. La adopción se diseña desde el principio, no se resuelve con una capacitación al final.',
  },
  {
    id: 'faq5',
    question: '¿Cómo usás la inteligencia artificial?',
    answer:
      'Como un componente, no como el producto. La IA transcribe audios, lee fotos e interpreta mensajes. Validar, confirmar y registrar lo hace código determinista con las reglas de tu negocio, para que un error de interpretación nunca llegue a tus datos.',
  },
  {
    id: 'faq6',
    question: '¿Trabajás de forma remota?',
    answer:
      'Sí. Estoy en San Miguel de Tucumán y trabajo con empresas de Argentina y LATAM. Cuando el proceso lo pide, el relevamiento o la puesta en marcha se hacen en el lugar.',
  },
];
