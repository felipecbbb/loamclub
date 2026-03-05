import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El Metodo LOAM",
  description:
    "Psicologia aplicada, no contenido motivacional generico. Descubre el enfoque de LOAM CLUB para transformar tu bienestar emocional.",
};

export default function MetodoPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
          Nuestro enfoque
        </p>
        <h1 className="mx-auto max-w-3xl font-display text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          El Metodo LOAM
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-white-75)] md:text-xl">
          LOAM CLUB nace de la conviccion de que el bienestar emocional no se
          construye con frases bonitas. Se construye con herramientas reales,
          protocolos aplicables y el acompanamiento de una profesional que
          entiende lo que estas viviendo.
        </p>
      </section>

      {/* ── Enfoque ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl">
            Psicologia aplicada, no contenido generico
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-white-75)]">
            <p>
              Cada video, cada ejercicio y cada recurso dentro de LOAM CLUB esta
              disenado desde la psicologia basada en evidencia. No encontraras
              aqui consejos vagos ni contenido motivacional sin fundamento.
            </p>
            <p>
              El metodo se basa en protocolos que puedes aplicar desde el primer
              dia: tecnicas concretas para gestionar la ansiedad, estrategias
              para establecer limites sanos y herramientas para reconstruir tu
              relacion contigo misma.
            </p>
            <p>
              Todo el contenido esta creado por Lorena Amadio, psicologa
              especializada en bienestar emocional, con el objetivo de que cada
              miembro tenga un camino claro y sostenible hacia el cambio.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pilares ───────────────────────────────────────────── */}
      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Los pilares del metodo
          </h2>
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {[
              {
                title: "Protocolos aplicables",
                description:
                  "Cada tema se traduce en pasos concretos que puedes integrar en tu rutina diaria. Sin teoria abstracta: solo herramientas que funcionan.",
              },
              {
                title: "Ejercicios practicos",
                description:
                  "Actividades guiadas para que trabajes sobre ti misma de forma estructurada. Disenadas para generar cambios reales, no solo reflexion.",
              },
              {
                title: "Contenido actualizado",
                description:
                  "Dos videos nuevos cada semana que abordan los temas que mas importan: ansiedad, relaciones, autoestima, limites y regulacion emocional.",
              },
              {
                title: "Acompanamiento opcional",
                description:
                  "Para quienes quieren ir mas alla, sesiones individuales con Lorena donde profundizar en tu proceso con orientacion personalizada.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-4 leading-relaxed text-[var(--color-white-75)]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quien ────────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Para quien es LOAM CLUB
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-[var(--color-white-75)]">
            Si te identificas con alguna de estas situaciones, este espacio esta
            pensado para ti.
          </p>

          <div className="mt-20 space-y-16">
            {[
              {
                title:
                  "Sientes que rindes al maximo, pero por dentro te estas agotando",
                description:
                  "Desde fuera todo parece ir bien: el trabajo, los planes, la agenda llena. Pero por dentro hay una tension constante, pensamientos acelerados y la sensacion de que nunca es suficiente. La ansiedad funcional es eso: seguir adelante mientras algo dentro de ti pide parar. En LOAM CLUB aprenderas a regularte sin tener que renunciar a tu vida.",
              },
              {
                title:
                  "Te cuesta poner limites y las relaciones te desgastan",
                description:
                  "Dices que si cuando quieres decir que no. Te adaptas a los demas hasta perderte. Sientes culpa cada vez que intentas priorizar lo que necesitas. Los limites no son muros, son la base de las relaciones sanas. Aqui encontraras herramientas para aprender a establecerlos sin culpa y sin explicaciones innecesarias.",
              },
              {
                title:
                  "Tu autoestima depende demasiado de la mirada de los demas",
                description:
                  "Buscas validacion en cada decision, te comparas constantemente y sientes que tu valor depende de lo que otros piensen de ti. Reconstruir la autoestima no es repetirse frases bonitas. Es un proceso profundo de reconexion contigo misma. En LOAM CLUB te acompanamos con herramientas reales para hacer ese camino.",
              },
            ].map((persona) => (
              <div
                key={persona.title}
                className="border-l-2 border-[var(--color-gold)] pl-8"
              >
                <h3 className="font-display text-xl md:text-2xl">
                  {persona.title}
                </h3>
                <p className="mt-4 max-w-3xl leading-relaxed text-[var(--color-white-75)]">
                  {persona.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl md:text-5xl">
          Empieza tu proceso hoy
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-white-75)]">
          Elige tu plan y accede a una forma diferente de trabajar tu bienestar
          emocional.
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
