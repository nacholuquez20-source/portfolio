import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Proyectos', id: 'projects' },
    { label: 'Cómo funciona', id: 'demos' },
    { label: 'Consultoría', id: 'consulting' },
    { label: 'Preguntas Frecuentes', id: 'faq' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F8F5]/90 backdrop-blur-md border-b border-neutral-200/50 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo / Brand Name */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavigate('hero');
            }}
            className="font-serif text-2xl font-semibold tracking-tight text-[#1c1c1a] cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
            id="brand-logo"
          >
            JIL · Luquez <span className="text-xs font-mono font-normal opacity-50 px-1 border border-neutral-300 rounded">IA</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-sans text-sm tracking-wide transition-all duration-200 cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? 'text-[#1c1c1a] font-medium'
                    : 'text-neutral-500 hover:text-[#1c1c1a]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1c1c1a]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <button
              onClick={() => onNavigate('contact')}
              className="bg-[#1c1c1a] text-[#F8F8F5] text-xs font-mono py-2.5 px-5 rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              id="cta-header-btn"
            >
              Consulta <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#1c1c1a] p-2 focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-45 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#F8F8F5] p-8 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="font-serif text-2xl font-semibold">JIL · Luquez</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 border border-neutral-200 rounded-full cursor-pointer hover:bg-neutral-100"
                    id="close-sidebar-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(item.id);
                      }}
                      className={`text-left font-serif text-2xl py-2 ${
                        activeSection === item.id
                          ? 'text-[#1c1c1a] border-l-2 border-[#1c1c1a] pl-4 font-medium'
                          : 'text-neutral-500 pl-0 hover:text-[#1c1c1a] transition-all'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <p className="text-xs text-neutral-400 font-mono mb-4">
                  INGENIERÍA INDUSTRIAL + IA // TUCUMÁN
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate('contact');
                  }}
                  className="w-full bg-[#1c1c1a] text-[#F8F8F5] py-3.5 px-6 rounded-xl flex justify-center items-center gap-2 font-mono text-xs hover:bg-neutral-800 transition-all cursor-pointer"
                  id="mobile-sidebar-cta"
                >
                  Agendar Consulta <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
