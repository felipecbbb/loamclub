import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Descubre lo que dicen las mujeres que ya forman parte de LOAM CLUB sobre su experiencia con la plataforma.",
};

const testimonials = [
  {
    quote:
      "Por primera vez siento que tengo herramientas reales para gestionar mi ansiedad. No es contenido motivacional vacío, es psicología de verdad aplicada a mi día a día.",
    name: "Laura M.",
    context: "Ansiedad funcional | Miembro desde hace 4 meses",
  },
  {
    quote:
      "Las sesiones con Lorena me ayudaron a poner límites que llevaba años sin poder establecer. El contenido semanal complementa todo el proceso de una forma que no esperaba.",
    name: "Ana R.",
    context: "Relaciones y límites | Plan Plus",
  },
  {
    quote:
      "Llevaba tiempo buscando algo que no fuera ni terapia ni coaching genérico. LOAM CLUB es exactamente eso: herramientas profesionales a las que puedo acceder cuando las necesito.",
    name: "María J.",
    context: "Autoestima | Miembro desde hace 6 meses",
  },
  {
    quote:
      "Los ejercicios prácticos son lo que más valoro. No son reflexiones vagas, son protocolos concretos que puedo aplicar en mi trabajo y en mis relaciones.",
    name: "Carmen S.",
    context: "Ansiedad y rendimiento | Plan Base",
  },
  {
    quote:
      "Me sorprendió la calidad del contenido. Cada video tiene algo que puedo usar de inmediato. Y lo mejor es que cada semana hay material nuevo.",
    name: "Isabel P.",
    context: "Bienestar emocional | Miembro desde hace 3 meses",
  },
  {
    quote:
      "Después de años dependiendo de la validación de los demás, por fin estoy aprendiendo a construir una autoestima que no se derrumba ante la primera crítica.",
    name: "Elena G.",
    context: "Autoestima y validación | Plan Plus",
  },
];

export default function TestimoniosPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 pt-28 pb-20 text-center md:pt-40 md:pb-28 bg-roots">
        <div className="relative z-10">
          <p className="mb-6 animate-fade-in text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
            Testimonios
          </p>
          <h1 className="mx-auto max-w-3xl animate-fade-up font-display text-5xl leading-tight tracking-tight text-white md:text-7xl md:leading-[1.1]">
            Lo que dicen nuestras miembros
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fade-up delay-200 text-lg leading-relaxed text-white/80">
            Historias reales de mujeres que están transformando su bienestar
            emocional con herramientas de psicología aplicada.
          </p>
        </div>
      </section>

      {/* ── Grid ──────────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 md:py-36">
        <div className="mx-auto grid max-w-5xl gap-8 stagger-children md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="card-hover flex flex-col rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-sm"
            >
              <span className="block font-display text-5xl leading-none text-[var(--color-gold)]">
                &ldquo;
              </span>
              <p className="mt-2 flex-1 font-display text-base leading-relaxed italic text-[var(--color-text-secondary)]">
                {t.quote}
              </p>
              <footer className="mt-8 border-t border-[var(--color-border)] pt-4">
                <p className="font-bold text-[var(--color-black)]">{t.name}</p>
                <p className="mt-1 text-sm text-[var(--color-olive-light)]">
                  {t.context}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-[var(--color-olive-light)]">
          * Testimonios de ejemplo con fines ilustrativos.
        </p>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 py-28 text-center md:py-36 bg-roots">
        <div className="relative z-10">
          <h2 className="font-display text-3xl text-white md:text-5xl">
            Únete a LOAM CL<span className="italic">U</span>B
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            Empieza hoy tu proceso de transformación con herramientas que
            realmente funcionan.
          </p>
          <Link
            href="/pricing"
            className="mt-10 inline-block rounded-lg bg-[var(--color-gold)] px-10 py-4 text-sm font-bold tracking-wide text-[var(--color-black)] uppercase transition-all hover:brightness-110"
          >
            Ver planes
          </Link>
        </div>
      </section>
    </main>
  );
}
