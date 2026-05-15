import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, X as XIcon, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const AI_IMAGES = [
  { src: "images/ai/01.jpg", alt: "Retrato beauty — generado con IA para gran formato" },
  { src: "images/ai/02.jpg", alt: "Campaña beauty — imagen publicitaria generativa" },
  { src: "images/ai/03.jpg", alt: "Bronco — visualización de producto con IA" },
  { src: "images/ai/04.jpg", alt: "Catrina — arte conceptual AI para publicidad OOH" },
  { src: "images/ai/05.jpg", alt: "Coca-Cola — campaña visual generada con inteligencia artificial" },
  { src: "images/ai/06.jpg", alt: "Hombre y TV — composición surrealista AI" },
  { src: "images/ai/07.jpg", alt: "Pilsen — imagen de marca generada con IA" },
  { src: "images/ai/08.jpg", alt: "Pilsen — variante de campaña AI" },
  { src: "images/ai/09.jpg", alt: "Stefano — retrato fotorrealista generativo" },
  { src: "images/ai/10.jpg", alt: "Tesla — visualización de producto AI para OOH" },
  { src: "images/ai/11.jpg", alt: "Cooper — transformación visual generada con IA" },
  { src: "images/ai/12.jpg", alt: "Desierto — composición de paisaje AI para gran formato" },
];

const VIDEOS = [
  {
    id: "dRZYOIgpgp8",
    title: "Campaña AI — Producto Visual",
    desc: "Spot generado íntegramente con IA. Dirección creativa, motion y voz sintética en una sola producción.",
  },
  {
    id: "qXwKXEUV1yM",
    title: "Narrativa Generativa",
    desc: "Secuencia cinematográfica producida con modelos de imagen y video de última generación.",
  },
  {
    id: "NX9o_YfeLiY",
    title: "Identidad de Marca en Movimiento",
    desc: "Branding audiovisual con personajes y mundos construidos desde cero usando inteligencia artificial.",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/baez@hitster.page", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = useCallback(
    (next: number) => {
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  const prev = () => go((current - 1 + VIDEOS.length) % VIDEOS.length);
  const next = () => go((current + 1) % VIDEOS.length);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div id="top" className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans selection:bg-[#F27D26] selection:text-white">

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col z-50 relative">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#F27D26] font-bold">hitster media presenta</span>
            <span className="text-xl font-medium tracking-tight">Hitster Ai</span>
          </motion.div>

          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/60">
            <a href="#about" className="hover:text-[#F27D26] transition-colors">¿Qué hacemos?</a>
            <a href="#reel" className="hover:text-[#F27D26] transition-colors">Reel</a>
            <a href="#work" className="hover:text-[#F27D26] transition-colors">Obra</a>
            <a href="#ooh" className="hover:text-[#F27D26] transition-colors">Gran Formato</a>
            <a href="#contact" className="hover:text-[#F27D26] transition-colors">Contacto</a>
          </div>

          <button className="md:hidden text-white z-50 relative p-2 -mr-2 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
            >
              {["#about:¿Qué hacemos?", "#reel:Reel", "#work:Obra", "#ooh:Gran Formato", "#contact:Contacto"].map((item) => {
                const [href, label] = item.split(":");
                return (
                  <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest font-semibold text-white/80 hover:text-[#F27D26] transition-colors">
                    {label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header id="about" className="relative h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <iframe
            src="https://www.youtube.com/embed/89zSJEtPxbY?autoplay=1&mute=1&controls=0&loop=1&playlist=89zSJEtPxbY&showinfo=0&rel=0"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] min-w-full min-h-full pointer-events-none scale-150"
            allow="autoplay; fullscreen"
            title="Hitster Ai Hero"
          />
        </div>

        <div className="relative z-10 max-w-5xl mt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tighter mb-6 leading-[0.9]">Hitster Ai</h2>
            <p className="text-base sm:text-xl md:text-2xl font-light text-white/75 max-w-3xl mx-auto leading-relaxed text-balance px-2 text-justify">
              Producimos contenido audiovisual con inteligencia artificial. Del concepto a la pantalla, sin los tiempos ni los costos de una producción tradicional.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 to-[#F27D26]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Explorar</span>
        </motion.div>
      </header>

      {/* Selling Point Section */}
      <section className="py-24 md:py-44 px-6 bg-gradient-to-b from-black to-[#0a0a0a] border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#F27D26] font-bold">Dirección Creativa + IA</span>
            <h1 className="text-4xl md:text-8xl font-medium tracking-tight leading-[0.9] text-balance">
              La creatividad no ha muerto. <br className="hidden md:block" /> <span className="text-white/40 italic">Ha evolucionado.</span>
            </h1>
            <div className="space-y-6 text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto">
              <p className="text-justify">
                En la producción tradicional, el tiempo es el enemigo. En **Hitster Ai**, el tiempo es nuestra ventaja competitiva. No somos una herramienta; somos un estudio de dirección creativa que utiliza los modelos generativos más avanzados del mundo para materializar visiones que antes eran técnicamente imposibles.
              </p>
              <p className="text-justify">
                Desde campañas fotorrealistas de alta resolución para gran formato hasta piezas audiovisuales que desafían las leyes de la física. Reducimos meses de trabajo a días y presupuestos prohibitivos a inversiones estratégicas de alto impacto. **No solo generamos contenido; dirigimos el futuro de la publicidad.**
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reel Section */}
      <section id="reel" className="py-16 md:py-40 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-16">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Showreel</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-balance">Nuestro Reel.</h2>
            <p className="text-lg text-white/55 font-light max-w-2xl mt-4 text-justify">
              Dirección creativa y herramientas de IA. Así es como producimos: rápido, con criterio y sin límites de imaginación.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-5xl mx-auto border border-white/10"
          >
            <iframe
              src="https://www.youtube.com/embed/89zSJEtPxbY?rel=0&modestbranding=1"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              title="Hitster Ai — Showreel"
            />
          </motion.div>
        </div>
      </section>

      {/* Work Section — Carrusel */}
      <section id="work" className="py-16 md:py-40 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-16">
          <div className="flex flex-col items-center text-center gap-4 border-b border-white/10 pb-10">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Portafolio</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-balance">Obra Seleccionada.</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase">Proyectos IA — 2025 / 2026</p>
          </div>

          {/* Carrusel */}
          <div className="relative w-full">
            {/* Video con animación */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${VIDEOS[current].id}?rel=0&modestbranding=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title={VIDEOS[current].title}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controles laterales — dentro del video en mobile, fuera en desktop */}
            <button
              onClick={prev}
              aria-label="Video anterior"
              className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-7 bg-black/70 hover:bg-[#F27D26] border border-white/15 hover:border-[#F27D26] text-white rounded-full p-2 md:p-3 transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-sm z-10"
            >
              <ChevronLeft size={18} className="md:hidden" />
              <ChevronLeft size={22} className="hidden md:block" />
            </button>
            <button
              onClick={next}
              aria-label="Siguiente video"
              className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-7 bg-black/70 hover:bg-[#F27D26] border border-white/15 hover:border-[#F27D26] text-white rounded-full p-2 md:p-3 transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-sm z-10"
            >
              <ChevronRight size={18} className="md:hidden" />
              <ChevronRight size={22} className="hidden md:block" />
            </button>
          </div>

          {/* Info del video actual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-3 pt-2"
            >
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">{VIDEOS[current].title}</h3>
              <p className="text-white/50 font-light text-sm max-w-xl mx-auto">{VIDEOS[current].desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 pt-2">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir al video ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#F27D26] w-6 h-2" : "bg-white/20 hover:bg-white/40 w-2 h-2"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OOH / Gran Formato — Galería */}
      <section id="ooh" className="py-16 md:py-40 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">

          {/* Header 2 columnas */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end border-b border-white/10 pb-10 md:pb-16">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Imagen Generativa · Gran Formato</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] text-balance">
                Publicidad que no necesita fotógrafo.
              </h2>
            </div>
            <div className="space-y-5 text-white/60 font-light leading-relaxed text-justify">
              <p>
                Generamos imágenes de alta resolución listas para impresión: espectaculares, muros, vallas, lonas y cualquier soporte OOH. Sin sesión de fotos, sin locaciones, sin semanas de espera.
              </p>
              <p>
                Con IA podemos probar decenas de conceptos visuales en horas. Tú eliges el que mejor habla de tu marca, y nosotros lo entregamos a los metros que necesites con la calidad que exige la calle.
              </p>
              <p className="text-[#F27D26]/80 font-normal text-xs uppercase tracking-widest">
                Alta resolución · Lista para impresión · Derechos totales
              </p>
            </div>
          </div>

          {/* Grid de galería */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {AI_IMAGES.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setLightboxIndex(i)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square bg-white/5 rounded-xl overflow-hidden border border-white/10 cursor-pointer shadow-lg"
                aria-label={`Ver imagen ${i + 1} en grande`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Número */}
                <span className="absolute bottom-2 left-3 text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/70 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
            <p className="text-white/40 text-sm font-light max-w-md">
              ¿Quieres ver cómo quedaría tu marca en este formato? Cuéntanos el proyecto y hacemos una prueba de concepto.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4">
              <a
                href="https://drive.google.com/file/d/1yZ2zVLUYRfE_lgCx2Kd76JbRCmY2LXES/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-64 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all shadow-xl"
              >
                Portafolios <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="w-full sm:w-64 flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#F27D26] hover:text-white transition-all shadow-xl"
              >
                Solicitar propuesta <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-md p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer z-10"
              aria-label="Cerrar imagen"
            >
              <XIcon size={22} />
            </button>

            {/* Nav anterior */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + AI_IMAGES.length) % AI_IMAGES.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#F27D26] border border-white/15 text-white rounded-full p-3 transition-all cursor-pointer z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Nav siguiente */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % AI_IMAGES.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#F27D26] border border-white/15 text-white rounded-full p-3 transition-all cursor-pointer z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={22} />
            </button>

            {/* Imagen */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25 }}
              src={AI_IMAGES[lightboxIndex].src}
              alt={AI_IMAGES[lightboxIndex].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[88vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Contador */}
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-white/40 font-bold">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(AI_IMAGES.length).padStart(2, "0")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote */}
      <section className="py-16 md:py-40 px-4 sm:px-8 border-y border-white/5 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-light text-white/75 leading-tight italic"
          >
            "La IA no reemplaza la creatividad. La amplifica. Nosotros sabemos cómo dirigirla."
          </motion.p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-40 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-16">
          <div className="space-y-4 md:space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#F27D26] font-bold">Contacto</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-balance">Cuéntanos tu proyecto.</h2>
            <p className="text-base sm:text-xl text-white/50 font-light max-w-2xl mx-auto text-justify">
              Si tienes una idea y quieres saber qué puede hacer la IA por ella, escríbenos. Sin compromisos.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleContactSubmit}
            className="flex flex-col gap-4 md:gap-6 w-full max-w-xl mx-auto text-left"
          >
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="Nuevo mensaje en Hitster Ai" />

            {[
              { id: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
              { id: "email", label: "Correo", type: "email", placeholder: "tu@correo.com" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-3">
                <label htmlFor={id} className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold ml-1">{label}</label>
                <input
                  type={type}
                  name={id}
                  id={id}
                  required
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-base focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all font-light placeholder:text-white/20 disabled:opacity-50"
                  placeholder={placeholder}
                />
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <label htmlFor="message" className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold ml-1">Mensaje</label>
              <textarea
                name="message"
                id="message"
                required
                disabled={formStatus === 'loading' || formStatus === 'success'}
                rows={5}
                className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-base focus:outline-none focus:border-[#F27D26] focus:bg-white/10 transition-all resize-none font-light placeholder:text-white/20 disabled:opacity-50"
                placeholder="¿De qué trata tu proyecto?"
              />
            </div>

            <div className="mt-2 md:mt-4">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl md:rounded-2xl text-center font-medium"
                  >
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <div key="error" className="flex flex-col gap-3">
                    <div className="w-full bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl md:rounded-2xl text-center font-medium">
                      Hubo un error al enviar. Por favor, intenta de nuevo o escribe a baez@hitster.page
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="w-full bg-white/10 text-white px-6 py-3 rounded-xl font-bold cursor-pointer"
                    >
                      Reintentar
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    key="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'loading'}
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-[#F27D26] hover:text-white transition-all shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 opacity-50 hover:opacity-100 transition-opacity duration-700 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#F27D26]">Hitster Ai</span>
            <span className="text-xs text-white/60">© 2026 todos los derechos reservados — Hitster Media</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest font-bold items-center">
            <button onClick={() => setPrivacyModalOpen(true)} className="hover:text-[#F27D26] transition-colors underline underline-offset-4 cursor-pointer">
              Aviso de Privacidad
            </button>
            <a href="#top" className="flex items-center gap-1.5 hover:text-[#F27D26] transition-colors">
              Volver arriba <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <AnimatePresence>
        {privacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setPrivacyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl p-5 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left"
            >
              <button onClick={() => setPrivacyModalOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/5 p-2 rounded-full cursor-pointer">
                <XIcon size={20} />
              </button>

              <div className="prose prose-invert max-w-none text-white/70 font-light text-sm md:text-base pr-4 text-justify">
                <h2 className="text-2xl font-medium text-white mb-6">Aviso de Privacidad — Hitster Media</h2>
                <p className="mb-4"><strong>Última actualización:</strong> 23 de junio de 2025</p>
                <p className="mb-6">Tu privacidad es importante para nosotros. Este aviso explica qué datos recopilamos, para qué los usamos y cómo los protegemos cuando visitas nuestro sitio o contratas nuestros servicios.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">1. Responsable</h3>
                <p className="mb-6">Hitster Media, con domicilio en Av. Francisco I. Madero 104, Col. Céspedes, Pachuca de Soto, Hidalgo, C.P. 42090. Contacto: baez@hitster.page</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">2. Datos que recopilamos</h3>
                <p className="mb-3"><strong>Los que tú nos das:</strong> nombre, correo electrónico y el contenido de tus mensajes al contactarnos.</p>
                <p className="mb-6"><strong>Los que recopilamos automáticamente:</strong> dirección IP, navegador, sistema operativo y patrones de uso, a través de cookies y herramientas de análisis.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">3. Para qué usamos tus datos</h3>
                <p className="mb-2"><strong>Necesarios para el servicio:</strong> responder consultas, gestionar proyectos, garantizar la seguridad del sitio y cumplir obligaciones legales.</p>
                <p className="mb-6"><strong>Con tu consentimiento:</strong> análisis de uso, mejora de la plataforma y comunicaciones de marketing. Puedes oponerte escribiendo a baez@hitster.page.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">4. Compartir datos</h3>
                <p className="mb-6">No vendemos ni alquilamos tu información. Solo la compartimos con proveedores de servicios (hosting, analytics) bajo acuerdos de confidencialidad, o cuando la ley lo exige.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">5. Cookies</h3>
                <p className="mb-6">Usamos cookies para mejorar la experiencia. Puedes desactivarlas desde tu navegador, aunque algunas funciones del sitio podrían verse afectadas.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">6. Tus derechos ARCO</h3>
                <p className="mb-6">Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos escribiendo a baez@hitster.page con tu nombre completo, una copia de tu identificación y una descripción de tu solicitud. Respondemos en los plazos establecidos por la ley.</p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">7. Cambios a este aviso</h3>
                <p className="mb-6">Podemos actualizar este documento cuando sea necesario. Te notificaremos a través del sitio o por correo si los cambios son relevantes.</p>

                <p className="font-medium text-white mt-10">Hitster Media</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
