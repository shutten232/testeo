// Header height -> CSS var
(function setHeaderHeightVar(){
  const root = document.documentElement;
  const header = document.querySelector('header');
  if(!header) return;
  const apply = () => {
    const h = header.getBoundingClientRect().height || 0;
    root.style.setProperty('--headerH', `${h}px`);
  };
  window.addEventListener('load', apply);
  window.addEventListener('resize', apply);
  apply();
})();

// HERO TELÓN (principal)
(function curtainScroll(){
  const scrolly = document.querySelector('.curtain#equipos');
  const hero = document.getElementById('curtainHero');
  if(!scrolly || !hero) return;

  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  function onScroll(){
    const rect = scrolly.getBoundingClientRect();
    const total = scrolly.offsetHeight - window.innerHeight; // 200vh - 100vh
    const p = clamp01((-rect.top) / (total || 1));
    hero.style.setProperty('--p', p.toFixed(4));
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();

// Reveal (split)
(function reveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    for(const e of entries){
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.18 });
  items.forEach(el => io.observe(el));
})();

// Smooth scroll a split
(function smoothToSplit(){
  const btn = document.getElementById('btnVerOpciones');
  const split = document.getElementById('split');
  if(!btn || !split) return;
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    split.scrollIntoView({ behavior:'smooth' });
  });
})();

// Form -> WhatsApp (simple)
(function leadFormToWhatsApp(){
  const form = document.getElementById('leadForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const nombre = (data.get('nombre') || '').toString().trim();
    const telefono = (data.get('telefono') || '').toString().trim();
    const auto = (data.get('auto') || '').toString().trim();
    const mensaje = (data.get('mensaje') || '').toString().trim();

    const lines = [
      'Hola, quiero cotizar GNC.',
      nombre ? `Nombre: ${nombre}` : null,
      telefono ? `Tel: ${telefono}` : null,
      auto ? `Auto: ${auto}` : null,
      mensaje ? `Mensaje: ${mensaje}` : null
    ].filter(Boolean);

    const url = 'https://wa.me/5493510000000?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });
})();
