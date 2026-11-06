import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { NAV } from './data';
import { Project } from './types';

import Header from './components/Header';
import Hero from './components/Hero';
import Method from './components/Method';
import Projects from './components/Projects';
import LiveFlow from './components/LiveFlow';
import Services from './components/Services';
import About from './components/About';
import Origin from './components/Origin';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './components/ProjectDetails';
import Intro from './components/motion/Intro';
import Atmosfera from './components/motion/Atmosfera';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [selected, setSelected] = useState<Project | null>(null);
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);

  // Resalta en el menú la sección que ocupa el centro de la pantalla
  useEffect(() => {
    const ids = ['inicio', ...NAV.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => setSelected(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <Atmosfera />
      <Intro onDone={onIntroDone} />
      <a
        href="#proyectos"
        className="rotulo fixed left-4 top-4 z-[60] -translate-y-20 bg-senal px-4 py-3 text-tinta focus:translate-y-0"
      >
        Saltar a los proyectos
      </a>
      <Header activeSection={activeSection} />
      <main>
        <Hero ready={ready} />
        <Method />
        <Projects onSelect={setSelected} />
        <LiveFlow />
        <Services />
        <About />
        <Origin />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {selected && <ProjectDetails key="detalle" project={selected} onClose={close} onNavigate={setSelected} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
