import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre Lorena Amadio",
  description:
    "Conoce a Lorena Amadio, psicóloga y creadora de LOAM CLUB. Su misión es hacer la psicología accesible y aplicable.",
};

export default function SobreMiPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 pt-28 pb-20 md:pt-36 bg-roots">
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-16 md:grid-cols-2">
          {/* Photo placeholder */}
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-[var(--color-olive-light)]/30 border border-white/10 animate-scale-in">
            <div className="absolute inset-0 flex items-center justify-center text-white/30">
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
            <span className="absolute bottom-4 left-4 text-xs text-white/40">
              Foto de Lorena
            </span>
          </div>

          {/* Bio */}
          <div>
            <p className="mb-4 animate-fade-in text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
              Sobre mí
            </p>
            <h1 className="animate-fade-up font-display text-4xl leading-tight text-white md:text-5xl md:leading-[1.15]">
              Lorena Amadio
            </h1>
            <p className="mt-2 text-lg text-[var(--color-gold)]">
              @psicolorenaamadio
            </p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/80">
              <p>
                Soy psicóloga especializada en bienestar emocional y creadora de
                contenido sobre psicología aplicada. Mi trabajo se centra en
                hacer que la psicología sea accesible, práctica y útil para la
                vida real.
              </p>
              <p>
                Después de años de experiencia clínica y de divulgación en redes
                sociales, creé LOAM CL<span className="italic">U</span>B con un objetivo claro: ofrecer un
                espacio donde las herramientas de psicología no se queden en
                teoría, sino que se conviertan en cambios reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl text-[var(--color-black)] md:text-5xl">
            Mi misión con LOAM CL<span className="italic">U</span>B
          </h2>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
            <p>
              Creo que el bienestar emocional no debería ser un privilegio ni
              algo que solo se trabaja en terapia una vez por semana. Debería
              ser parte de tu día a día, con herramientas a las que puedas
              recurrir cuando las necesites.
            </p>
            <p>
              LOAM CL<span className="italic">U</span>B nace de esa convicción. Es un espacio donde la
              psicología se convierte en algo práctico, cercano y sostenible.
              Donde cada video, cada ejercicio y cada recurso está pensado para
              que puedas aplicarlo desde el primer minuto.
            </p>
            <p>
              Mi compromiso es crear contenido honesto, basado en evidencia y
              libre de promesas vacías. No voy a decirte que todo se soluciona
              con pensamiento positivo. Voy a darte las herramientas para que
              trabajes de verdad sobre lo que necesitas cambiar.
            </p>
          </div>
        </div>
      </section>

      {/* ── Credentials ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 py-28 md:py-36 bg-roots">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 className="text-center font-display text-3xl text-white md:text-5xl">
            Formación y experiencia
          </h2>
          <div className="mt-16 grid gap-8 stagger-children md:grid-cols-2">
            {[
              {
                title: "Formación académica",
                items: [
                  "Grado en Psicología",
                  "Especialización en intervención psicológica",
                  "Formación continua en psicología basada en evidencia",
                ],
              },
              {
                title: "Experiencia profesional",
                items: [
                  "Experiencia clínica en atención psicológica individual",
                  "Creadora de contenido de psicología aplicada",
                  "Divulgadora en redes sociales (@psicolorenaamadio)",
                ],
              },
              {
                title: "Áreas de especialización",
                items: [
                  "Gestión de la ansiedad y regulación emocional",
                  "Autoestima y construcción de identidad",
                  "Relaciones interpersonales y límites",
                ],
              },
              {
                title: "Filosofía de trabajo",
                items: [
                  "Psicología basada en evidencia, no en tendencias",
                  "Enfoque práctico y aplicable",
                  "Comunicación cercana y sin paternalismos",
                ],
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="font-display text-xl text-[var(--color-gold)]">
                  {block.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/80"
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
      <section className="bg-[var(--color-cream)] px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl text-[var(--color-black)] md:text-5xl animate-fade-up">
          Trabaja conmigo en LOAM CL<span className="italic">U</span>B
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-[var(--color-olive-light)]">
          Accede a contenido semanal de psicología aplicada y, si lo necesitas,
          a sesiones individuales conmigo.
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
