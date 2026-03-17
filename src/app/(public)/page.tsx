import type { Metadata } from "next";
import Link from "next/link";
import { LanyardSection } from "@/components/three/lanyard-section";

export const metadata: Metadata = {
  title: "LOAM CLUB | Cuida tus raíces — Psicología aplicada por Lorena Amadio",
  description:
    "Cuida tus raíces. Psicología aplicada, ejercicios prácticos y acompañamiento profesional por Lorena Amadio.",
};

export default function HomePage() {
  return (
    <main>
      {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-roots bg-grain relative flex min-h-[92vh] flex-col items-center justify-center bg-[var(--color-olive)] px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.06]">
          <svg viewBox="0 0 600 400" className="w-[800px] max-w-none" aria-hidden="true">
            <g stroke="white" fill="none" strokeWidth="1.5" strokeLinecap="round">
              <path d="M300 0 C300 60,280 100,260 140 C240 180,200 220,180 300 C170 340,160 380,150 400" className="[stroke-dasharray:500] [stroke-dashoffset:500] [animation:draw_3s_ease-out_0.5s_forwards]" />
              <path d="M300 0 C300 50,310 90,330 130 C350 170,380 210,400 280" className="[stroke-dasharray:400] [stroke-dashoffset:400] [animation:draw_3s_ease-out_0.7s_forwards]" />
              <path d="M260 140 C240 160,210 170,180 180 C150 190,120 200,80 220" className="[stroke-dasharray:250] [stroke-dashoffset:250] [animation:draw_2s_ease-out_1.2s_forwards]" />
              <path d="M330 130 C350 150,380 155,410 160 C440 165,470 175,520 200" className="[stroke-dasharray:250] [stroke-dashoffset:250] [animation:draw_2s_ease-out_1.4s_forwards]" />
              <path d="M280 100 C260 120,240 140,230 180 C220 220,210 260,200 340" className="[stroke-dasharray:350] [stroke-dashoffset:350] [animation:draw_2.5s_ease-out_1s_forwards]" />
            </g>
          </svg>
        </div>

        <div className="relative z-10">
          <p className="animate-fade-in mb-5 text-xs font-medium tracking-[0.3em] uppercase text-white/50">
            Psicología aplicada por Lorena Amadio
          </p>
          <h1 className="animate-fade-up mx-auto max-w-4xl font-display text-6xl leading-[1.05] tracking-tight text-white md:text-8xl">
            Cuida tus raíces
          </h1>
          <p className="animate-fade-up delay-200 mx-auto mt-4 font-display text-2xl italic text-[var(--color-gold)] md:text-3xl">
            Lo demás crece solo
          </p>
          <p className="animate-fade-up delay-300 mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
            Herramientas de psicología aplicada para gestionar ansiedad, poner límites
            y reconectar contigo misma.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/pricing" className="animate-scale-in delay-400 inline-block bg-[var(--color-gold)] px-10 py-4 text-sm font-medium text-[var(--color-black)] rounded-lg transition-all hover:opacity-90">
              Empieza tu proceso
            </Link>
            <Link href="#preview" className="animate-fade-up delay-500 text-sm text-white/50 underline decoration-white/20 underline-offset-4 hover:text-white/80 transition-colors">
              Ver qué hay dentro
            </Link>
          </div>
        </div>
      </section>

      {/* ━━ DOLOR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[var(--color-cream)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="animate-fade-up font-display text-3xl text-[var(--color-black)] md:text-5xl">
            ¿Esto te suena?
          </h2>
          <p className="mt-4 text-sm text-[var(--color-olive)]">Si te identificas con alguna, LOAM CLUB es para ti.</p>
          <div className="stagger-children mt-14 space-y-3">
            {[
              "Te despiertas con un nudo en el estómago y no sabes por qué",
              "Dices que sí a todo por miedo a decepcionar",
              "Sabes que algo no está bien pero no encuentras las palabras",
              "Has probado apps, libros y podcasts pero nada cambia de verdad",
              "Te sientes agotada emocionalmente sin motivo aparente",
              "Quieres herramientas reales, no frases motivacionales",
            ].map((pain) => (
              <div key={pain} className="flex items-center gap-4 rounded-xl bg-white p-5 text-left border border-[var(--color-border)] transition-all hover:border-[var(--color-olive)]/30 hover:shadow-sm">
                <span className="shrink-0 block h-1 w-1 rounded-full bg-[var(--color-olive)]" />
                <p className="text-[var(--color-black)] text-sm leading-relaxed">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ SOLUCIÓN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-olive)]">La solución</p>
            <h2 className="animate-fade-up mt-4 font-display text-3xl text-[var(--color-black)] md:text-5xl">
              Qué vas a encontrar dentro
            </h2>
          </div>
          <div className="stagger-children mt-16 grid gap-8 md:grid-cols-3">
            {[
              { title: "Trabajo de raíz", desc: "Psicología aplicada para llegar al origen de lo que sientes. No motivación superficial.", border: "var(--color-olive)" },
              { title: "Aire y ritmo", desc: "Sin presión, sin plazos. Contenido semanal nuevo a tu propio ritmo.", border: "var(--color-gold)" },
              { title: "Herramientas reales", desc: "Ejercicios y protocolos que aplicas desde el primer día.", border: "var(--color-olive)" },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border-t-[3px] bg-white p-8 shadow-sm transition-all hover:shadow-md" style={{ borderColor: f.border }}>
                <h3 className="font-display text-xl text-[var(--color-black)]">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-olive)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ PREVIEW DEL CURSO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="preview" className="bg-roots bg-grain relative bg-[var(--color-olive)] px-6 py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-gold)]">Mira por dentro</p>
            <h2 className="animate-fade-up mt-4 font-display text-3xl text-white md:text-5xl">Esto es lo que te espera</h2>
            <p className="mt-4 text-white/70 mx-auto max-w-lg text-sm">Un vistazo real a la plataforma. Sin sorpresas.</p>
          </div>
          <div className="mt-16 rounded-2xl bg-white/[0.07] backdrop-blur-sm p-6 md:p-10 border border-white/[0.08]">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[var(--color-gold)]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-black)" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wider text-[var(--color-gold)] uppercase">Curso incluido</p>
                <h3 className="mt-1 font-display text-2xl text-white">Gestión de la Ansiedad</h3>
                <p className="mt-1 text-sm text-white/60">2 módulos · 5 lecciones · 3 ejercicios prácticos</p>
              </div>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                { num: 1, title: "Entender la ansiedad", lessons: ["Qué es la ansiedad y por qué aparece", "El ciclo de la ansiedad", "Señales que tu cuerpo te envía"], exercise: "Diario de señales" },
                { num: 2, title: "Herramientas prácticas", lessons: ["Técnicas de regulación emocional", "Respiración y anclaje", "Reestructuración cognitiva"], exercise: "Plan de acción" },
              ].map((mod) => (
                <div key={mod.num} className="rounded-xl bg-white/[0.06] p-5 border border-white/[0.05]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-gold)] text-xs font-bold text-[var(--color-black)]">{mod.num}</span>
                    <h4 className="font-display text-base text-white">{mod.title}</h4>
                  </div>
                  <div className="space-y-2.5">
                    {mod.lessons.map((l, i) => (
                      <div key={l} className="flex items-center gap-3 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px] text-white/40">{(mod.num - 1) * 3 + i + 1}</span>
                        <span className="text-white/80">{l}</span>
                        <span className="ml-auto text-xs text-white/40">{12 + i * 3} min</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 text-sm pt-2 border-t border-white/[0.06]">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)]/15">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      <span className="text-[var(--color-gold)] text-xs">Ejercicio: {mod.exercise}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-white/[0.04] border border-white/[0.06] p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-base text-white">Autoestima y Relaciones</h4>
                <p className="text-xs text-white/50">2 módulos · 4 lecciones · 3 ejercicios</p>
              </div>
              <span className="hidden sm:inline-block text-xs text-white/40">Incluido</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CÓMO FUNCIONA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[var(--color-cream)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="animate-fade-up text-center font-display text-3xl text-[var(--color-black)] md:text-5xl">Cómo funciona</h2>
          <div className="mt-16 space-y-16">
            {[
              { step: "01", title: "Elige tu plan", desc: "Base (90 EUR/mes) o Plus con sesiones 1:1 (180 EUR/mes). Sin permanencia." },
              { step: "02", title: "Accede a tu espacio", desc: "Vídeos, ejercicios y recursos desde el primer día. Contenido nuevo cada semana." },
              { step: "03", title: "Crece desde la raíz", desc: "Aplica herramientas reales en tu día a día. Nota cambios desde la primera semana." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-8">
                <span className="font-display text-5xl text-[var(--color-gold)] leading-none shrink-0 w-16">{item.step}</span>
                <div>
                  <h3 className="font-display text-xl text-[var(--color-black)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-olive)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ TESTIMONIOS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-olive)]">Testimonios</p>
            <h2 className="animate-fade-up mt-4 font-display text-3xl text-[var(--color-black)] md:text-5xl">
              Lo que dicen quienes ya están dentro
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { quote: "Por primera vez tengo herramientas reales para gestionar mi ansiedad. Es psicología de verdad.", name: "Laura M.", time: "4 meses", featured: true },
              { quote: "Me ayudó a poner límites que llevaba años sin poder establecer.", name: "Ana R.", time: "Plan Plus", featured: false },
              { quote: "Ahora tengo un vocabulario emocional que antes no tenía. Eso lo cambia todo.", name: "Carmen S.", time: "6 meses", featured: false },
            ].map((t) => (
              <blockquote key={t.name} className={`rounded-2xl p-7 text-left transition-all hover:shadow-md ${t.featured ? 'bg-[var(--color-olive)]' : 'bg-[var(--color-cream)]'}`}>
                <span className="block font-display text-4xl leading-none text-[var(--color-gold)]">&ldquo;</span>
                <p className={`mt-2 font-display text-base leading-relaxed italic ${t.featured ? 'text-white/90' : 'text-[var(--color-olive)]'}`}>{t.quote}</p>
                <footer className="mt-5">
                  <p className={`text-sm font-medium ${t.featured ? 'text-white' : 'text-[var(--color-black)]'}`}>{t.name}</p>
                  <p className={`text-xs ${t.featured ? 'text-white/50' : 'text-[var(--color-olive)]'}`}>{t.time}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ QUIÉN HAY DETRÁS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[var(--color-cream)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-5 md:items-center">
            <div className="md:col-span-2">
              <div className="aspect-square max-w-[280px] mx-auto rounded-2xl bg-[var(--color-olive)] flex items-center justify-center relative overflow-hidden">
                <div className="bg-grain absolute inset-0 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="font-display text-5xl text-[var(--color-gold)]">LA</div>
                  <div className="mt-3 text-xs tracking-[0.2em] text-white/70 uppercase">Lorena Amadio</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-olive)] mb-3">Quién soy</p>
              <h2 className="font-display text-3xl text-[var(--color-black)]">Soy Lorena, y creé esto para ti</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-olive)]">
                Psicóloga clínica. Creé LOAM CLUB porque mis pacientes necesitaban herramientas entre sesión y sesión.
                Todo el contenido está diseñado desde la práctica clínica.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Psicóloga colegiada", "Cognitivo-conductual", "ACT", "Humanista"].map((c) => (
                  <span key={c} className="rounded-lg bg-[var(--color-olive)] px-3 py-1.5 text-xs text-white">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ ÚNETE AL CLUB — 3D LANYARD ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <LanyardSection />

      {/* ━━ CTA FINAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[var(--color-black)] px-6 py-28 text-center md:py-36 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 600 300" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
            <g stroke="var(--color-olive)" fill="none" strokeWidth="0.8" strokeLinecap="round">
              <path d="M300 0 C298 50,280 100,260 160 C250 190,240 240,230 300" />
              <path d="M300 0 C302 50,320 100,340 160 C350 190,360 240,370 300" />
            </g>
          </svg>
        </div>
        <div className="animate-fade-up relative z-10 mx-auto max-w-2xl">
          <p className="font-display text-xl text-[var(--color-gold)]" style={{ letterSpacing: '0.06em' }}>
            LOAM CL<span className="italic">U</span>B
          </p>
          <h2 className="mt-6 font-display text-4xl text-white md:text-6xl">Cuida tus raíces.</h2>
          <p className="mt-3 font-display text-xl italic text-[var(--color-gold)] md:text-2xl">Lo demás crece solo.</p>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/50">
            Acceso inmediato. Desde 90 EUR/mes. Sin permanencia.
          </p>
          <Link href="/pricing" className="mt-10 inline-block bg-[var(--color-gold)] px-10 py-4 text-sm font-medium text-[var(--color-black)] rounded-lg transition-all hover:opacity-90">
            Empieza tu proceso
          </Link>
        </div>
      </section>
    </main>
  );
}
