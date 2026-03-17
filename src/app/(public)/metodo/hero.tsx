"use client";

import { ContainerScroll } from "@/components/ui/container-scroll";

export function MetodoHero() {
  return (
    <section className="bg-[var(--color-olive)] bg-roots overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="relative z-10">
            <p className="mb-4 text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
              Nuestro enfoque
            </p>
            <h1 className="mx-auto max-w-3xl font-display text-5xl leading-tight tracking-tight text-white md:text-7xl md:leading-[1.1]">
              El Método{" "}
              <span className="text-[var(--color-gold)]">LOAM</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Psicología aplicada, no contenido motivacional genérico. Mira cómo
              es la plataforma por dentro.
            </p>
          </div>
        }
      >
        {/* Dashboard mockup */}
        <div className="h-full w-full bg-[var(--color-cream)] p-4 md:p-8 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl text-[var(--color-black)]">
                Hola, María
              </h2>
              <p className="text-sm text-[var(--color-olive)]">
                Bienvenida a tu espacio de aprendizaje.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-olive)] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center text-xs font-bold text-[var(--color-black)]">
                MG
              </div>
            </div>
          </div>

          {/* Progress card */}
          <div className="rounded-xl bg-white border border-[rgba(91,102,68,0.12)] p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-sm text-[var(--color-black)]">Tu progreso</span>
              <span className="text-xs text-[var(--color-olive)]">3 de 9 lecciones</span>
            </div>
            <div className="w-full h-2 bg-[rgba(91,102,68,0.1)] rounded-full overflow-hidden">
              <div className="h-full w-[33%] bg-[var(--color-gold)] rounded-full" />
            </div>
            <p className="text-xs text-[var(--color-olive)] mt-2">33% completado</p>
          </div>

          {/* Continue lesson */}
          <div className="rounded-xl bg-white border border-[rgba(91,102,68,0.12)] p-5 mb-4">
            <span className="text-sm font-medium text-[var(--color-black)]">Continúa donde lo dejaste</span>
            <div className="flex items-center gap-4 mt-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-gold)] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-black)"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-black)]">Técnicas de regulación emocional</p>
                <p className="text-xs text-[var(--color-olive)]">Módulo 2 · Herramientas prácticas</p>
              </div>
            </div>
          </div>

          {/* Upcoming */}
          <div className="rounded-xl bg-white border border-[rgba(91,102,68,0.12)] p-5">
            <span className="text-sm font-medium text-[var(--color-black)]">Próximas lecciones</span>
            <div className="mt-3 space-y-3">
              {["Respiración y anclaje", "Reestructuración cognitiva", "Diario emocional"].map((lesson, i) => (
                <div key={lesson} className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(91,102,68,0.2)] text-[10px] text-[var(--color-olive)]">{i + 5}</span>
                    <span className="text-sm text-[var(--color-black)]">{lesson}</span>
                  </div>
                  <span className="text-xs text-[var(--color-olive)]">{12 + i * 3} min</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
