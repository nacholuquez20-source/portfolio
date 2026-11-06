export type VisualId = 'tallerhub' | 'circuito' | 'aula' | 'audicampo' | 'bioglosse' | 'obras';

export type StatusKind = 'live' | 'build' | 'pilot';

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  fig: string;
  title: string;
  /** Nombre anterior o versión previa, si el sistema evolucionó */
  previously?: string;
  client: string;
  sector: string;
  year: string;
  status: { label: string; kind: StatusKind };
  tagline: string;
  problem: string;
  solution: string;
  highlights: string[];
  flow: string[];
  results: Metric[];
  lesson?: { title: string; body: string };
  stack: string[];
  tone: 'papel' | 'tinta';
  visual: VisualId;
  featured?: boolean;
  extraLink?: { label: string; href: string };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
