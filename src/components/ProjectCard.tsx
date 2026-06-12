import { motion } from 'motion/react';
import { Project } from '../types';
import { Sparkles, Cpu, Code2 } from 'lucide-react';
import ProjectCardPreview from './ProjectCardPreview';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  // Determine an icon to fit the theme
  const getIcon = (id: string) => {
    switch (id) {
      case 'auditbot':
        return <Cpu className="w-4 h-4 text-[#1c1c1a]" />;
      case 'tallerhub':
        return <Sparkles className="w-4 h-4 text-[#1c1c1a]" />;
      default:
        return <Code2 className="w-4 h-4 text-[#1c1c1a]" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer flex flex-col space-y-4 border-b border-neutral-200/60 pb-8 text-left"
    >
      {/* Cover Image Container */}
      <div className="overflow-hidden rounded-xl bg-neutral-100 aspect-[16/10] relative shadow-sm border border-neutral-200/30">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out grayscale"
        />
        {/* Animated mini-demo revealed on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <ProjectCardPreview projectId={project.id} />
        </div>
      </div>

      {/* Project info & Meta */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-3xl font-medium text-neutral-900 group-hover:text-black transition-colors flex items-center gap-2">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 ml-2">
            {project.badges.map((badge, idx) => {
              const isProduction = badge.toLowerCase().includes('producción') || badge.toLowerCase().includes('estudio');
              const isDevelopment = badge.toLowerCase().includes('desarrollo');
              
              return (
                <span
                  key={badge}
                  className={`font-mono text-[10px] tracking-wide px-2.5 py-0.5 rounded-full border ${
                    isProduction
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : isDevelopment
                      ? 'bg-amber-55/20 text-amber-700 border-amber-200'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        </div>

        {/* Project snippet */}
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed font-light font-sans">
          {project.description}
        </p>

        {/* Interactive action indicator */}
        <div className="pt-2 flex items-center gap-1 text-xs font-mono font-medium text-[#1c1c1a] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-4px] group-hover:translate-x-0">
          Explorar Detalles & Simulador <span className="text-sm">→</span>
        </div>
      </div>
    </motion.div>
  );
}
