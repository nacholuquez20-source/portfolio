export interface Project {
  id: string;
  title: string;
  badges: string[];
  description: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ConsultingPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  basePrice: string;
  features: string[];
}
