import type { Metadata } from "next";
import Link from "next/link";
import { MetodoHero } from "./hero";

export const metadata: Metadata = {
  title: "El Método LOAM",
  description:
    "Psicología aplicada, no contenido motivacional genérico. Descubre el enfoque de LOAM CLUB.",
};

export default function MetodoPage() {
  return (
    <main>
      {/* ── Hero con ContainerScroll ─────────────────────────── */}
      <MetodoHero />

      {/* ── Enfoque ──────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex justify-center">
            <svg className="h-20 w-20 text-[var(--color-olive)]" viewBox="0 0 100 100" fill="none" strokeLinecap="round">
              <path d="M50 15 C50 15,35 30,35 45 C35 55,42 60,50 60 C58 60,65 55,65 45 C65 30,50 15,50 15Z" fill="var(--color-olive)" opacity="0.08" stroke="var(--color-olive)" strokeWidth="1.5" />
              <line x1="50" y1="60" x2="50" y2="90" stroke="var(--color-olive)" strokeWidth="2" />
              <path d="M50 70 C40 75,30 80,25 90" stroke="var(--color-olive)" strokeWidth="1.5" opacity="0.5" />
              <path d="M50 70 C60 75,70 80,75 90" stroke="var(--color-olive)" strokeWidth="1.5" opacity="0.5" />
              <path d="M50 80 C45 83,38 88,35 95" stroke="var(--color-olive)" strokeWidth="1" opacity="0.3" />
              <path d="M50 80 C55 83,62 88,65 95" stroke="var(--color-olive)" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          <h2 className="font-display text-3xl text-[var(--color-black)] md:text-4xl">
            Psicología aplicada, no contenido genérico
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--color-olive)]">
            <p>
              Como las raíces de un árbol, el verdadero crecimiento emocional
              ocurre bajo la superficie. Cada vídeo, cada ejercicio y cada recurso
              dentro de LOAM CL<span className="italic">U</span>B está diseñado desde la psicología basada en
              evidencia.
            </p>
            <p>
              El método se basa en protocolos que puedes aplicar desde el primer
              día: técnicas concretas para gestionar la ansiedad, estrategias
              para establecer límites sanos y herramientas para reconstruir tu
              relación contigo misma.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pilares ──────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-[var(--color-black)] md:text-5xl">
            Los pilares del método
          </h2>
          <div className="mt-16 grid gap-8 stagger-children md:grid-cols-2">
            {[
              { title: "Protocolos aplicables", desc: "Cada tema se traduce en pasos concretos que puedes integrar en tu rutina diaria. Sin teoría abstracta.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Ejercicios prácticos", desc: "Actividades guiadas para que trabajes sobre ti misma de forma estructurada. Diseñadas para generar cambios reales.", icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" },
              { title: "Contenido actualizado", desc: "Dos vídeos nuevos cada semana sobre ansiedad, relaciones, autoestima, límites y regulación emocional.", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" },
              { title: "Acompañamiento opcional", desc: "Sesiones individuales con Lorena para profundizar en tu proceso con orientación personalizada.", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
            ].map((p) => (
              <div key={p.title} className="card-hover rounded-2xl border-t-[3px] border-t-[var(--color-olive)] bg-white p-8 shadow-sm">
                <svg className="h-7 w-7 text-[var(--color-gold)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                <h3 className="font-display text-xl text-[var(--color-black)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-olive)]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quién ───────────────────────────────────────── */}
      <section className="bg-[var(--color-olive)] px-6 py-24 md:py-32 bg-roots">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-white md:text-5xl">
            Para quién es LOAM CL<span className="italic">U</span>B
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-white/70">
            Si te identificas con alguna de estas situaciones, este espacio está pensado para ti.
          </p>

          <div className="mt-16 space-y-12">
            {[
              { title: "Sientes que rindes al máximo, pero por dentro te estás agotando", desc: "Desde fuera todo parece ir bien. Pero por dentro hay una tensión constante y la sensación de que nunca es suficiente. En LOAM CLUB aprenderás a regularte sin tener que renunciar a tu vida." },
              { title: "Te cuesta poner límites y las relaciones te desgastan", desc: "Dices que sí cuando quieres decir que no. Te adaptas a los demás hasta perderte. Aquí encontrarás herramientas para aprender a establecer límites sin culpa." },
              { title: "Tu autoestima depende demasiado de la mirada de los demás", desc: "Buscas validación en cada decisión. Reconstruir la autoestima no es repetirse frases bonitas. Es un proceso profundo de reconexión contigo misma." },
            ].map((persona) => (
              <div key={persona.title} className="border-l-2 border-[var(--color-gold)] pl-8">
                <h3 className="font-display text-xl text-white md:text-2xl">{persona.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">{persona.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-24 text-center md:py-32">
        <h2 className="font-display text-3xl text-[var(--color-black)] md:text-5xl animate-fade-up">
          Empieza tu proceso hoy
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[var(--color-olive)]">
          Elige tu plan y accede a una forma diferente de trabajar tu bienestar emocional.
        </p>
        <Link href="/pricing" className="mt-10 inline-block rounded-lg bg-[var(--color-gold)] px-10 py-4 text-sm font-medium text-[var(--color-black)] transition-all hover:opacity-90">
          Ver planes
        </Link>
      </section>
    </main>
  );
}
