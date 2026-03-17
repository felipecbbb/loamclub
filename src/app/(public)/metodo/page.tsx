import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Método LOAM",
  description:
    "Psicología aplicada, no contenido motivacional genérico. Descubre el enfoque de LOAM CLUB para transformar tu bienestar emocional.",
};

export default function MetodoPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-[var(--color-olive)] px-6 text-center bg-roots">
        <div className="relative z-10">
          <p className="mb-6 animate-fade-in text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
            Nuestro enfoque
          </p>
          <h1 className="mx-auto max-w-3xl animate-fade-up font-display text-5xl leading-tight tracking-tight text-white md:text-7xl md:leading-[1.1]">
            El Método LOAM
          </h1>
          <p className="mx-auto mt-8 max-w-2xl animate-fade-up delay-200 text-lg leading-relaxed text-white/80 md:text-xl">
            LOAM CL<span className="italic">U</span>B nace de la convicción de que el bienestar emocional no se
            construye con frases bonitas. Se construye con herramientas reales,
            protocolos aplicables y el acompañamiento de una profesional que
            entiende lo que estás viviendo.
          </p>
        </div>
      </section>

      {/* ── Enfoque (tree/root metaphor) ────────────────────── */}
      <section className="relative bg-[var(--color-cream)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          {/* Root/tree metaphor visual */}
          <div className="mb-16 flex justify-center">
            <div className="relative">
              <svg className="h-24 w-24 text-[var(--color-olive)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M50 15 C50 15,35 30,35 45 C35 55,42 60,50 60 C58 60,65 55,65 45 C65 30,50 15,50 15Z" fill="var(--color-olive)" opacity="0.08" stroke="var(--color-olive)" />
                <line x1="50" y1="60" x2="50" y2="90" stroke="var(--color-olive)" strokeWidth="2" />
                <path d="M50 70 C40 75,30 80,25 90" stroke="var(--color-olive)" strokeWidth="1.5" opacity="0.5" />
                <path d="M50 70 C60 75,70 80,75 90" stroke="var(--color-olive)" strokeWidth="1.5" opacity="0.5" />
                <path d="M50 80 C45 83,38 88,35 95" stroke="var(--color-olive)" strokeWidth="1" opacity="0.3" />
                <path d="M50 80 C55 83,62 88,65 95" stroke="var(--color-olive)" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
          </div>

          <h2 className="font-display text-3xl text-[var(--color-black)] md:text-4xl">
            Psicología aplicada, no contenido genérico
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              Como las raíces de un árbol, el verdadero crecimiento emocional
              ocurre bajo la superficie. Cada video, cada ejercicio y cada recurso
              dentro de LOAM CL<span className="italic">U</span>B está diseñado desde la psicología basada en
              evidencia. No encontrarás aquí consejos vagos ni contenido
              motivacional sin fundamento.
            </p>
            <p>
              El método se basa en protocolos que puedes aplicar desde el primer
              día: técnicas concretas para gestionar la ansiedad, estrategias
              para establecer límites sanos y herramientas para reconstruir tu
              relación contigo misma.
            </p>
            <p>
              Todo el contenido está creado por Lorena Amadio, psicóloga
              especializada en bienestar emocional, con el objetivo de que cada
              miembro tenga un camino claro y sostenible hacia el cambio.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pilares ───────────────────────────────────────────── */}
      <section className="bg-white px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-[var(--color-black)] md:text-5xl">
            Los pilares del método
          </h2>
          <div className="mt-20 grid gap-8 stagger-children md:grid-cols-2">
            {[
              {
                title: "Protocolos aplicables",
                description:
                  "Cada tema se traduce en pasos concretos que puedes integrar en tu rutina diaria. Sin teoría abstracta: solo herramientas que funcionan.",
                icon: (
                  <svg className="h-8 w-8 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Ejercicios prácticos",
                description:
                  "Actividades guiadas para que trabajes sobre ti misma de forma estructurada. Diseñadas para generar cambios reales, no solo reflexión.",
                icon: (
                  <svg className="h-8 w-8 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
              },
              {
                title: "Contenido actualizado",
                description:
                  "Dos videos nuevos cada semana que abordan los temas que más importan: ansiedad, relaciones, autoestima, límites y regulación emocional.",
                icon: (
                  <svg className="h-8 w-8 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                ),
              },
              {
                title: "Acompañamiento opcional",
                description:
                  "Para quienes quieren ir más allá, sesiones individuales con Lorena donde profundizar en tu proceso con orientación personalizada.",
                icon: (
                  <svg className="h-8 w-8 text-[var(--color-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="card-hover rounded-2xl border-t-4 border-t-[var(--color-olive)] border-x border-b border-[var(--color-border)] bg-white p-8 shadow-sm"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="font-display text-xl text-[var(--color-black)] md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--color-text-secondary)]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quien ────────────────────────────────────────── */}
      <section className="bg-[var(--color-olive)] px-6 py-28 md:py-36 bg-roots">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-white md:text-5xl">
            Para quién es LOAM CL<span className="italic">U</span>B
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/75">
            Si te identificas con alguna de estas situaciones, este espacio está
            pensado para ti.
          </p>

          <div className="mt-20 space-y-16">
            {[
              {
                title:
                  "Sientes que rindes al máximo, pero por dentro te estás agotando",
                description:
                  "Desde fuera todo parece ir bien: el trabajo, los planes, la agenda llena. Pero por dentro hay una tensión constante, pensamientos acelerados y la sensación de que nunca es suficiente. La ansiedad funcional es eso: seguir adelante mientras algo dentro de ti pide parar. En LOAM CLUB aprenderás a regularte sin tener que renunciar a tu vida.",
              },
              {
                title:
                  "Te cuesta poner límites y las relaciones te desgastan",
                description:
                  "Dices que sí cuando quieres decir que no. Te adaptas a los demás hasta perderte. Sientes culpa cada vez que intentas priorizar lo que necesitas. Los límites no son muros, son la base de las relaciones sanas. Aquí encontrarás herramientas para aprender a establecerlos sin culpa y sin explicaciones innecesarias.",
              },
              {
                title:
                  "Tu autoestima depende demasiado de la mirada de los demás",
                description:
                  "Buscas validación en cada decisión, te comparas constantemente y sientes que tu valor depende de lo que otros piensen de ti. Reconstruir la autoestima no es repetirse frases bonitas. Es un proceso profundo de reconexión contigo misma. En LOAM CLUB te acompañamos con herramientas reales para hacer ese camino.",
              },
            ].map((persona) => (
              <div
                key={persona.title}
                className="border-l-2 border-[var(--color-gold)] pl-8"
              >
                <h3 className="font-display text-xl text-white md:text-2xl">
                  {persona.title}
                </h3>
                <p className="mt-4 max-w-3xl leading-relaxed text-white/75">
                  {persona.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl text-[var(--color-black)] md:text-5xl animate-fade-up">
          Empieza tu proceso hoy
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-olive-light)]">
          Elige tu plan y accede a una forma diferente de trabajar tu bienestar
          emocional.
        </p>
        <Link
          href="/pricing"
          className="mt-10 inline-block rounded-lg bg-[var(--color-gold)] px-10 py-4 text-sm font-bold tracking-wide text-[var(--color-black)] uppercase transition-all hover:brightness-110"
        >
          Ver planes
        </Link>
      </section>
    </main>
  );
}
