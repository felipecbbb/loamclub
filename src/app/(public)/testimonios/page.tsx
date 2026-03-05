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
      "Por primera vez siento que tengo herramientas reales para gestionar mi ansiedad. No es contenido motivacional vacio, es psicologia de verdad aplicada a mi dia a dia.",
    name: "Laura M.",
    context: "Ansiedad funcional | Miembro desde hace 4 meses",
  },
  {
    quote:
      "Las sesiones con Lorena me ayudaron a poner limites que llevaba anos sin poder establecer. El contenido semanal complementa todo el proceso de una forma que no esperaba.",
    name: "Ana R.",
    context: "Relaciones y limites | Plan Plus",
  },
  {
    quote:
      "Llevaba tiempo buscando algo que no fuera ni terapia ni coaching generico. LOAM CLUB es exactamente eso: herramientas profesionales a las que puedo acceder cuando las necesito.",
    name: "Maria J.",
    context: "Autoestima | Miembro desde hace 6 meses",
  },
  {
    quote:
      "Los ejercicios practicos son lo que mas valoro. No son reflexiones vagas, son protocolos concretos que puedo aplicar en mi trabajo y en mis relaciones.",
    name: "Carmen S.",
    context: "Ansiedad y rendimiento | Plan Base",
  },
  {
    quote:
      "Me sorprendio la calidad del contenido. Cada video tiene algo que puedo usar de inmediato. Y lo mejor es que cada semana hay material nuevo.",
    name: "Isabel P.",
    context: "Bienestar emocional | Miembro desde hace 3 meses",
  },
  {
    quote:
      "Despues de anos dependiendo de la validacion de los demas, por fin estoy aprendiendo a construir una autoestima que no se derrumba ante la primera critica.",
    name: "Elena G.",
    context: "Autoestima y validacion | Plan Plus",
  },
];

export default function TestimoniosPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-16 text-center md:pt-36 md:pb-20">
        <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
          Testimonios
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          Lo que dicen nuestras miembros
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-white-75)]">
          Historias reales de mujeres que estan transformando su bienestar
          emocional con herramientas de psicologia aplicada.
        </p>
      </section>

      {/* ── Grid ──────────────────────────────────────────────── */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8 backdrop-blur-sm"
            >
              <span className="block font-display text-4xl leading-none text-[var(--color-gold)]">
                &ldquo;
              </span>
              <p className="mt-2 flex-1 leading-relaxed italic text-[var(--color-white-75)]">
                {t.quote}
              </p>
              <footer className="mt-8 border-t border-[var(--color-white-40)] pt-4">
                <p className="font-bold">{t.name}</p>
                <p className="mt-1 text-sm text-[var(--color-white-40)]">
                  {t.context}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-center text-sm text-[var(--color-white-40)]">
          * Testimonios de ejemplo con fines ilustrativos.
        </p>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl md:text-5xl">
          Unete a LOAM CLUB
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-white-75)]">
          Empieza hoy tu proceso de transformacion con herramientas que
          realmente funcionan.
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
