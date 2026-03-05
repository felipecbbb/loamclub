import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Lorena Amadio",
  description:
    "Conoce a Lorena Amadio, psicologa y creadora de LOAM CLUB. Su mision es hacer la psicologia accesible y aplicable.",
};

export default function SobreMiPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-6 pt-24 md:pt-36">
        <div className="mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
          {/* Photo placeholder */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--color-green-dark)]">
            <div className="absolute inset-0 flex items-center justify-center text-[var(--color-white-40)]">
              <svg
                className="h-20 w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <span className="absolute bottom-4 left-4 text-xs text-[var(--color-white-40)]">
              Foto de Lorena
            </span>
          </div>

          {/* Bio */}
          <div>
            <p className="mb-4 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
              Sobre mi
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl md:leading-[1.15]">
              Lorena Amadio
            </h1>
            <p className="mt-2 text-lg text-[var(--color-gold)]">
              @psicolorenaamadio
            </p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--color-white-75)]">
              <p>
                Soy psicologa especializada en bienestar emocional y creadora de
                contenido sobre psicologia aplicada. Mi trabajo se centra en
                hacer que la psicologia sea accesible, practica y util para la
                vida real.
              </p>
              <p>
                Despues de anos de experiencia clinica y de divulgacion en redes
                sociales, cree LOAM CLUB con un objetivo claro: ofrecer un
                espacio donde las herramientas de psicologia no se queden en
                teoria, sino que se conviertan en cambios reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-5xl">
            Mi mision con LOAM CLUB
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-white-75)]">
            <p>
              Creo que el bienestar emocional no deberia ser un privilegio ni
              algo que solo se trabaja en terapia una vez por semana. Deberia
              ser parte de tu dia a dia, con herramientas a las que puedas
              recurrir cuando las necesites.
            </p>
            <p>
              LOAM CLUB nace de esa conviccion. Es un espacio donde la
              psicologia se convierte en algo practico, cercano y sostenible.
              Donde cada video, cada ejercicio y cada recurso esta pensado para
              que puedas aplicarlo desde el primer minuto.
            </p>
            <p>
              Mi compromiso es crear contenido honesto, basado en evidencia y
              libre de promesas vacias. No voy a decirte que todo se soluciona
              con pensamiento positivo. Voy a darte las herramientas para que
              trabajes de verdad sobre lo que necesitas cambiar.
            </p>
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Formacion y experiencia
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Formacion academica",
                items: [
                  "Grado en Psicologia",
                  "Especializacion en intervencion psicologica",
                  "Formacion continua en psicologia basada en evidencia",
                ],
              },
              {
                title: "Experiencia profesional",
                items: [
                  "Experiencia clinica en atencion psicologica individual",
                  "Creadora de contenido de psicologia aplicada",
                  "Divulgadora en redes sociales (@psicolorenaamadio)",
                ],
              },
              {
                title: "Areas de especializacion",
                items: [
                  "Gestion de la ansiedad y regulacion emocional",
                  "Autoestima y construccion de identidad",
                  "Relaciones interpersonales y limites",
                ],
              },
              {
                title: "Filosofia de trabajo",
                items: [
                  "Psicologia basada en evidencia, no en tendencias",
                  "Enfoque practico y aplicable",
                  "Comunicacion cercana y sin paternalismos",
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8"
              >
                <h3 className="font-display text-xl">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[var(--color-white-75)]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl md:text-5xl">
          Trabaja conmigo en LOAM CLUB
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-white-75)]">
          Accede a contenido semanal de psicologia aplicada y, si lo necesitas,
          a sesiones individuales conmigo.
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
