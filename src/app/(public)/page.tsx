import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LOAM CLUB | Bienestar emocional con psicologia aplicada",
  description:
    "Transforma tu bienestar emocional con herramientas de psicologia aplicada. Contenido semanal, ejercicios practicos y acompanamiento profesional por Lorena Amadio.",
};

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
          Psicologia aplicada a tu dia a dia
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          Tu bienestar emocional merece un espacio propio
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-white-75)] md:text-xl">
          Accede a contenido semanal basado en psicologia aplicada, ejercicios
          practicos y acompanamiento profesional para transformar como te
          relacionas contigo misma y con los demas.
        </p>
        <Link
          href="/pricing"
          className="mt-12 inline-block rounded-full bg-[var(--color-gold)] px-10 py-4 text-sm font-bold tracking-wide text-[var(--color-green-dark)] uppercase transition-opacity hover:opacity-90"
        >
          Empieza ahora
        </Link>
      </section>

      {/* ── Que vas a encontrar ────────────────────────────────── */}
      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Que vas a encontrar
          </h2>
          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {[
              {
                title: "Contenido semanal",
                description:
                  "Dos nuevos videos cada semana con herramientas y protocolos de psicologia que puedes aplicar desde el primer dia.",
              },
              {
                title: "Ejercicios practicos",
                description:
                  "Actividades disenadas para que trabajes sobre ti misma de forma guiada, sin teoria vacia ni contenido generico.",
              },
              {
                title: "Acompanamiento profesional",
                description:
                  "Sesiones individuales con Lorena para profundizar en tu proceso y recibir orientacion personalizada.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--color-white-75)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como funciona ──────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Como funciona
          </h2>
          <div className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8">
            {[
              {
                step: "01",
                title: "Suscribete",
                description:
                  "Elige el plan que mejor se adapte a ti y accede a la plataforma de inmediato.",
              },
              {
                step: "02",
                title: "Accede al contenido",
                description:
                  "Explora los videos, ejercicios y recursos a tu ritmo. Nuevo contenido cada semana.",
              },
              {
                step: "03",
                title: "Transforma tu bienestar",
                description:
                  "Aplica las herramientas en tu dia a dia y empieza a notar cambios reales en como te sientes.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center md:text-left">
                <span className="font-display text-5xl text-[var(--color-gold)] md:text-6xl">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-xl md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-[var(--color-white-75)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof ──────────────────────────────────────── */}
      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl md:text-5xl">
            Lo que dicen quienes ya estan dentro
          </h2>
          <div className="mt-20 grid gap-10 md:grid-cols-2">
            {[
              {
                quote:
                  "Por primera vez siento que tengo herramientas reales para gestionar mi ansiedad. No es contenido motivacional vacio, es psicologia de verdad.",
                name: "Laura M.",
                context: "Miembro desde hace 4 meses",
              },
              {
                quote:
                  "Las sesiones con Lorena me ayudaron a poner limites que llevaba anos sin poder establecer. El contenido semanal complementa todo el proceso.",
                name: "Ana R.",
                context: "Miembro Plan Plus",
              },
            ].map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8 text-left backdrop-blur-sm"
              >
                <span className="block font-display text-4xl leading-none text-[var(--color-gold)]">
                  &ldquo;
                </span>
                <p className="mt-2 text-lg leading-relaxed italic text-[var(--color-white-75)]">
                  {testimonial.quote}
                </p>
                <footer className="mt-6">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-[var(--color-white-40)]">
                    {testimonial.context}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--color-white-40)]">
            * Testimonios de ejemplo con fines ilustrativos.
          </p>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl md:text-5xl">
          Lista para empezar?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-white-75)]">
          Elige tu plan y accede hoy a contenido de psicologia aplicada que
          realmente transforma.
        </p>
        <Link
          href="/pricing"
          className="mt-10 inline-block rounded-full bg-[var(--color-gold)] px-10 py-4 text-sm font-bold tracking-wide text-[var(--color-green-dark)] uppercase transition-opacity hover:opacity-90"
        >
          Ver planes
        </Link>
      </section>
    </main>
  );
}
