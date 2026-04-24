const { useState, useEffect } = React;

/* ===== Palettes ===== */
const PALETTES = {
  quebrada: {
    name: 'Quebrada del Portugués',
    '--bg': '#EFEBE1',
    '--bg-alt': '#E6E1D4',
    '--card': '#F6F2E8',
    '--ink': '#1E2A1C',
    '--ink-soft': '#3E4A3A',
    '--ink-mute': '#6B7565',
    '--rule': 'rgba(30, 42, 28, 0.14)',
    '--rule-soft': 'rgba(30, 42, 28, 0.08)',
    '--accent': '#163A66',
    '--accent-2': '#8B6F47',
    '--moss': '#4A6B3E',
  },
  cielo: {
    name: 'Cielo Andino',
    '--bg': '#EDEFF2',
    '--bg-alt': '#E2E6EC',
    '--card': '#F5F7FA',
    '--ink': '#13243A',
    '--ink-soft': '#35475F',
    '--ink-mute': '#6B7A8E',
    '--rule': 'rgba(19, 36, 58, 0.14)',
    '--rule-soft': 'rgba(19, 36, 58, 0.08)',
    '--accent': '#1F4B82',
    '--accent-2': '#6E8AA8',
    '--moss': '#3E6E4E',
  },
  tierra: {
    name: 'Tierra Serena',
    '--bg': '#EFE7D8',
    '--bg-alt': '#E3D9C6',
    '--card': '#F7F0E0',
    '--ink': '#2A2218',
    '--ink-soft': '#4B3F2F',
    '--ink-mute': '#7A6B55',
    '--rule': 'rgba(42, 34, 24, 0.14)',
    '--rule-soft': 'rgba(42, 34, 24, 0.08)',
    '--accent': '#7A5A32',
    '--accent-2': '#3E5C3A',
    '--moss': '#5C7A44',
  },
};

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "quebrada",
  "displayFont": "Fraunces",
  "showDropcap": true
}/*EDITMODE-END*/;

function applyPalette(key) {
  const p = PALETTES[key] || PALETTES.quebrada;
  const root = document.documentElement;
  Object.entries(p).forEach(([k, v]) => { if (k.startsWith('--')) root.style.setProperty(k, v); });
}

function applyFont(font) {
  document.documentElement.style.setProperty('--serif', `'${font}', Georgia, serif`);
}

function applyDropcap(show) {
  document.body.classList.toggle('no-dropcap', !show);
}

function App() {
  const { values, setValue } = window.useTweaks(DEFAULTS);

  useEffect(() => { applyPalette(values.palette); }, [values.palette]);
  useEffect(() => { applyFont(values.displayFont); }, [values.displayFont]);
  useEffect(() => { applyDropcap(values.showDropcap); }, [values.showDropcap]);

  // reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection title="Paleta">
        <window.TweakRadio
          label="Inspiración"
          value={values.palette}
          onChange={v => setValue('palette', v)}
          options={[
            { value: 'quebrada', label: 'Quebrada del Portugués' },
            { value: 'cielo', label: 'Cielo Andino' },
            { value: 'tierra', label: 'Tierra Serena' },
          ]}
        />
      </window.TweakSection>
      <window.TweakSection title="Tipografía">
        <window.TweakSelect
          label="Display serif"
          value={values.displayFont}
          onChange={v => setValue('displayFont', v)}
          options={[
            { value: 'Fraunces', label: 'Fraunces' },
            { value: 'Playfair Display', label: 'Playfair Display' },
            { value: 'DM Serif Display', label: 'DM Serif Display' },
            { value: 'Cormorant Garamond', label: 'Cormorant' },
          ]}
        />
      </window.TweakSection>
      <window.TweakSection title="Editorial">
        <window.TweakToggle
          label="Drop cap en 'Sobre mí'"
          value={values.showDropcap}
          onChange={v => setValue('showDropcap', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('tweaks-root'));
root.render(<App />);

/* reveal + year + smooth scroll */
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('footer-year');
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    });
  });
});
