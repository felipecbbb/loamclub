import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Cookies",
  description:
    "Politica de cookies de LOAM CLUB. Informacion sobre las cookies que utilizamos en nuestra plataforma.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Politica de Cookies
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Ultima actualizacion: marzo 2026
      </p>

      <div className="mt-12 space-y-10 text-[var(--color-white-75)] leading-relaxed [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:md:text-2xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        <section>
          <h2>1. Que son las cookies</h2>
          <p>
            Las cookies son pequenos archivos de texto que se almacenan en tu
            dispositivo (ordenador, tablet o telefono movil) cuando visitas un
            sitio web. Permiten que el sitio recuerde tus acciones y
            preferencias durante un periodo de tiempo, para que no tengas que
            volver a introducirlos cada vez que vuelvas al sitio o navegues de
            una pagina a otra.
          </p>
        </section>

        <section>
          <h2>2. Cookies que utilizamos</h2>
          <p>
            En LOAM CLUB utilizamos los siguientes tipos de cookies:
          </p>

          {/* Cookie table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-white-40)] text-white">
                  <th className="pb-3 pr-4 font-medium">Cookie</th>
                  <th className="pb-3 pr-4 font-medium">Tipo</th>
                  <th className="pb-3 pr-4 font-medium">Finalidad</th>
                  <th className="pb-3 font-medium">Duracion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-white-40)]/30">
                <tr>
                  <td className="py-3 pr-4">sb-*-auth-token</td>
                  <td className="py-3 pr-4">Tecnica / Esencial</td>
                  <td className="py-3 pr-4">
                    Gestion de la sesion de usuario (Supabase Auth)
                  </td>
                  <td className="py-3">Sesion / 1 ano</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">sb-*-auth-token-code-verifier</td>
                  <td className="py-3 pr-4">Tecnica / Esencial</td>
                  <td className="py-3 pr-4">
                    Verificacion de autenticacion PKCE
                  </td>
                  <td className="py-3">Sesion</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">__stripe_mid</td>
                  <td className="py-3 pr-4">Tecnica / Esencial</td>
                  <td className="py-3 pr-4">
                    Prevencion de fraude en pagos (Stripe)
                  </td>
                  <td className="py-3">1 ano</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">__stripe_sid</td>
                  <td className="py-3 pr-4">Tecnica / Esencial</td>
                  <td className="py-3 pr-4">
                    Sesion de pago (Stripe)
                  </td>
                  <td className="py-3">30 minutos</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">cookie_consent</td>
                  <td className="py-3 pr-4">Tecnica / Esencial</td>
                  <td className="py-3 pr-4">
                    Almacenar tu preferencia de cookies
                  </td>
                  <td className="py-3">1 ano</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2>3. Tipos de cookies segun su finalidad</h2>
          <ul>
            <li>
              <strong>Cookies tecnicas o esenciales:</strong> son necesarias
              para el funcionamiento basico de la plataforma. Sin ellas, no
              podriamos ofrecerte los servicios que has contratado (inicio de
              sesion, procesamiento de pagos, etc.). No requieren tu
              consentimiento.
            </li>
            <li>
              <strong>Cookies analiticas:</strong> nos ayudan a entender como
              los usuarios interactuan con la plataforma. Actualmente no
              utilizamos cookies analiticas de terceros. Si en el futuro las
              implementamos, solicitaremos tu consentimiento previo.
            </li>
            <li>
              <strong>Cookies de marketing:</strong> actualmente no utilizamos
              cookies de marketing ni de publicidad.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Gestion de cookies</h2>
          <p>
            Puedes gestionar tus preferencias de cookies en cualquier momento a
            traves de la configuracion de tu navegador. A continuacion,
            encontraras enlaces a las instrucciones de los navegadores mas
            comunes:
          </p>
          <ul>
            <li>
              <strong>Google Chrome:</strong>{" "}
              chrome://settings/cookies
            </li>
            <li>
              <strong>Mozilla Firefox:</strong>{" "}
              about:preferences#privacy
            </li>
            <li>
              <strong>Safari:</strong> Preferencias &gt; Privacidad
            </li>
            <li>
              <strong>Microsoft Edge:</strong>{" "}
              edge://settings/content/cookies
            </li>
          </ul>
          <p>
            Ten en cuenta que si deshabilitas las cookies esenciales, es posible
            que algunas funcionalidades de la plataforma no funcionen
            correctamente.
          </p>
        </section>

        <section>
          <h2>5. Cookies de terceros</h2>
          <p>
            Algunos servicios externos que utilizamos pueden instalar sus
            propias cookies. En concreto:
          </p>
          <ul>
            <li>
              <strong>Stripe:</strong> para el procesamiento seguro de pagos.
              Puedes consultar su politica de privacidad en stripe.com/privacy.
            </li>
            <li>
              <strong>Supabase:</strong> para la gestion de autenticacion. Puedes
              consultar su politica de privacidad en supabase.com/privacy.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Actualizaciones</h2>
          <p>
            Esta Politica de Cookies puede ser actualizada periodicamente. Te
            recomendamos revisarla de forma regular. Cualquier cambio sera
            publicado en esta pagina con la fecha de actualizacion
            correspondiente.
          </p>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre nuestra Politica de Cookies, puedes
            escribirnos a{" "}
            <a
              href="mailto:hola@loamclub.com"
              className="text-white underline transition-opacity hover:opacity-80"
            >
              hola@loamclub.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
