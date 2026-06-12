import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from './types';
import { PROJECTS } from './data';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import ProjectDetails from './components/ProjectDetails';
import InteractiveDemos from './components/InteractiveDemos';
import About from './components/About';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Icons
import { Layers, HelpCircle, Briefcase, ChevronRight, PhoneCall, Code } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Watch scroll progression to update navigation highlight highlights
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      const sections = ['hero', 'projects', 'demos', 'about', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-[#F8F8F5] text-[#1c1c1a] min-h-screen font-sans selection:bg-[#1c1c1a] selection:text-[#F8F8F5] relative antialiased">
      
      {/* Top Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Header */}
      <Hero onExploreProjects={() => handleNavigate('projects')} />

      {/* Projects Grid Section */}
      <section id="projects" className="py-24 bg-[#F1F1ED] border-t border-neutral-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-neutral-200/50">
                <Layers className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-mono text-[10px] tracking-widest text-[#1c1c1a] uppercase">
                  PORTFOLIO // SOFTWARE REAL OPERANDO EN CAMPO
                </span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-neutral-900">
                Productos Construidos
              </h2>
            </div>

            <div className="text-left md:text-right shrink-0">
              <span className="font-mono text-xs text-neutral-500 tracking-wider">
                VISTA TOTAL / 04 PRODUCTOS
              </span>
            </div>
          </div>

          {/* Grid Cards Container */}
          {/* Grilla 2x2 pareja: cuatro tarjetas grandes de igual peso, AuditBot primero */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: 'easeOut' }}
              >
                <ProjectCard
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Walkthrough Demonstrations of Core Products */}
      <InteractiveDemos />

      {/* Editorial About / Philosophy */}
      <About />

      {/* FAQ Enquiries List */}
      <FAQ />

      {/* Client Feedback Contact Message Form */}
      <ContactForm />

      {/* Sidebar index navigator: oculto en Contacto para no tapar el botón de envío */}
      <div className={`hidden lg:block fixed bottom-12 right-12 z-30 max-w-[200px] transition-opacity duration-300 ${
        activeSection === 'contact' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="bg-white/80 backdrop-blur px-5 py-4 rounded-xl border border-neutral-300/60 shadow-lg text-left space-y-3">
          <p className="font-mono text-[8px] text-neutral-400 uppercase tracking-widest">// MAPA DE SECCIONES</p>
          <div className="flex flex-col gap-1 text-[11px] font-mono">
            {[
              { id: 'projects', label: 'Productos Construidos' },
              { id: 'demos', label: 'Cómo Funciona' },
              { id: 'about', label: 'Sobre Mí' },
              { id: 'faq', label: 'Preguntas Frecuentes' },
              { id: 'contact', label: 'Iniciar Propuesta' }
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleNavigate(sec.id)}
                className={`py-1 flex items-center justify-between text-left transition cursor-pointer hover:text-black ${
                  activeSection === sec.id ? 'text-[#1c1c1a] font-bold border-l-2 border-[#1c1c1a] pl-2 -ml-2' : 'text-neutral-400 pl-0'
                }`}
              >
                <span>{sec.label}</span>
                {activeSection === sec.id && <ChevronRight className="w-3 h-3 text-[#1c1c1a]" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Modal Window Simulation */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetails
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer Content */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
