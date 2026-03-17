import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de LOAM CLUB. Lee las condiciones de tu suscripción.",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Términos y Condiciones
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Última actualización: marzo 2026
      </p>

      <div className="mt-12 space-y-10 text-[var(--color-white-75)] leading-relaxed [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:md:text-2xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        <section>
          <h2>1. Identificación del prestador</h2>
          <p>
            El presente sitio web y la plataforma LOAM CLUB son operados por
            Lorena Amadio (en adelante, &quot;LOAM CLUB&quot;, &quot;nosotros&quot; o
            &quot;la plataforma&quot;).
          </p>
          <ul>
            <li>Email de contacto: hola@loamclub.com</li>
            <li>Sitio web: loamclub.com</li>
          </ul>
        </section>

        <section>
          <h2>2. Objeto y aceptación</h2>
          <p>
            Los presentes Términos y Condiciones regulan el acceso y uso de la
            plataforma LOAM CLUB, así como la contratación de los servicios de
            suscripción ofrecidos a través de la misma.
          </p>
          <p>
            Al registrarte y suscribirte, aceptas íntegramente estos Términos y
            Condiciones. Si no estás de acuerdo con alguna de las condiciones,
            te rogamos que no utilices la plataforma.
          </p>
        </section>

        <section>
          <h2>3. Descripción del servicio</h2>
          <p>LOAM CLUB es una plataforma de suscripción que ofrece:</p>
          <ul>
            <li>
              <strong>Plan Base (90 EUR/mes):</strong> acceso completo a la
              plataforma, 2 nuevos videos semanales de psicología aplicada,
              ejercicios prácticos y acceso a la biblioteca de contenido.
            </li>
            <li>
              <strong>Plan Plus (180 EUR/mes):</strong> todo lo incluido en el
              Plan Base, más sesiones individuales recurrentes de 30 minutos con
              Lorena Amadio.
            </li>
          </ul>
          <p>
            El contenido de la plataforma tiene carácter formativo e informativo
            y no sustituye en ningún caso a un tratamiento psicológico o
            psiquiátrico profesional.
          </p>
        </section>

        <section>
          <h2>4. Registro y cuenta</h2>
          <ul>
            <li>
              Para acceder a los servicios es necesario crear una cuenta
              proporcionando datos veraces y actualizados.
            </li>
            <li>
              Eres responsable de mantener la confidencialidad de tus
              credenciales de acceso.
            </li>
            <li>
              Cada cuenta es personal e intransferible. No está permitido
              compartir el acceso con terceros.
            </li>
            <li>
              Nos reservamos el derecho de suspender o cancelar cuentas que
              incumplan estos términos.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Suscripción y pago</h2>
          <ul>
            <li>
              La suscripción se renueva automáticamente cada mes natural.
            </li>
            <li>
              Los pagos se procesan de forma segura a través de Stripe.
            </li>
            <li>
              Los precios incluyen los impuestos aplicables, salvo que se
              indique lo contrario.
            </li>
            <li>
              Nos reservamos el derecho de modificar los precios, notificándolo
              con al menos 30 días de antelación. El nuevo precio se aplicará
              en el siguiente ciclo de facturación.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Cancelación</h2>
          <ul>
            <li>
              Puedes cancelar tu suscripción en cualquier momento desde tu
              perfil de usuario.
            </li>
            <li>
              La cancelación será efectiva al final del periodo de facturación
              en curso. Hasta esa fecha, mantendrás acceso al contenido.
            </li>
            <li>
              No se realizan reembolsos por periodos parciales, salvo lo
              dispuesto en la política de desistimiento.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Propiedad intelectual</h2>
          <ul>
            <li>
              Todo el contenido de la plataforma (videos, textos, ejercicios,
              diseño, marca) es propiedad de LOAM CLUB y está protegido por la
              legislación de propiedad intelectual.
            </li>
            <li>
              La suscripción te otorga una licencia personal, no exclusiva e
              intransferible para acceder al contenido.
            </li>
            <li>
              Queda prohibida la reproducción, distribución, comunicación
              pública o transformación del contenido sin autorización expresa.
            </li>
            <li>
              Queda expresamente prohibido grabar, descargar o compartir los
              videos u otros contenidos de la plataforma.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Limitación de responsabilidad</h2>
          <ul>
            <li>
              El contenido de LOAM CLUB tiene finalidad formativa e informativa
              y no constituye asesoramiento psicológico, médico ni terapéutico
              individualizado.
            </li>
            <li>
              LOAM CLUB no se hace responsable de los resultados individuales
              obtenidos por cada usuario.
            </li>
            <li>
              No garantizamos la disponibilidad ininterrumpida de la plataforma,
              aunque haremos esfuerzos razonables para mantener el servicio
              activo.
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Conducta del usuario</h2>
          <p>Al usar la plataforma, te comprometes a:</p>
          <ul>
            <li>
              Utilizar el servicio de forma lícita y respetuosa.
            </li>
            <li>
              No compartir tu cuenta ni tus credenciales con terceros.
            </li>
            <li>
              No intentar acceder de forma no autorizada a contenido o
              funcionalidades restringidas.
            </li>
            <li>
              No utilizar el contenido con fines comerciales sin autorización.
            </li>
          </ul>
        </section>

        <section>
          <h2>10. Modificaciones del servicio y los términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones,
            así como las características del servicio. Cualquier cambio
            sustancial será notificado por email con al menos 15 días de
            antelación. El uso continuado de la plataforma tras la notificación
            implica la aceptación de los cambios.
          </p>
        </section>

        <section>
          <h2>11. Legislación aplicable y jurisdicción</h2>
          <p>
            Estos Términos y Condiciones se rigen por la legislación española.
            Para la resolución de cualquier controversia, las partes se someten
            a los juzgados y tribunales correspondientes al domicilio del
            consumidor, de conformidad con la normativa vigente.
          </p>
        </section>

        <section>
          <h2>12. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estos Términos y
            Condiciones, puedes escribirnos a{" "}
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
