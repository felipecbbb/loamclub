import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminos y Condiciones",
  description:
    "Terminos y condiciones de uso de LOAM CLUB. Lee las condiciones de tu suscripcion.",
};

export default function TerminosPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Terminos y Condiciones
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Ultima actualizacion: marzo 2026
      </p>

      <div className="mt-12 space-y-10 text-[var(--color-white-75)] leading-relaxed [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:md:text-2xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        <section>
          <h2>1. Identificacion del prestador</h2>
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
          <h2>2. Objeto y aceptacion</h2>
          <p>
            Los presentes Terminos y Condiciones regulan el acceso y uso de la
            plataforma LOAM CLUB, asi como la contratacion de los servicios de
            suscripcion ofrecidos a traves de la misma.
          </p>
          <p>
            Al registrarte y suscribirte, aceptas integramente estos Terminos y
            Condiciones. Si no estas de acuerdo con alguna de las condiciones,
            te rogamos que no utilices la plataforma.
          </p>
        </section>

        <section>
          <h2>3. Descripcion del servicio</h2>
          <p>LOAM CLUB es una plataforma de suscripcion que ofrece:</p>
          <ul>
            <li>
              <strong>Plan Base (90 EUR/mes):</strong> acceso completo a la
              plataforma, 2 nuevos videos semanales de psicologia aplicada,
              ejercicios practicos y acceso a la biblioteca de contenido.
            </li>
            <li>
              <strong>Plan Plus (180 EUR/mes):</strong> todo lo incluido en el
              Plan Base, mas sesiones individuales recurrentes de 30 minutos con
              Lorena Amadio.
            </li>
          </ul>
          <p>
            El contenido de la plataforma tiene caracter formativo e informativo
            y no sustituye en ningun caso a un tratamiento psicologico o
            psiquiatrico profesional.
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
              Cada cuenta es personal e intransferible. No esta permitido
              compartir el acceso con terceros.
            </li>
            <li>
              Nos reservamos el derecho de suspender o cancelar cuentas que
              incumplan estos terminos.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Suscripcion y pago</h2>
          <ul>
            <li>
              La suscripcion se renueva automaticamente cada mes natural.
            </li>
            <li>
              Los pagos se procesan de forma segura a traves de Stripe.
            </li>
            <li>
              Los precios incluyen los impuestos aplicables, salvo que se
              indique lo contrario.
            </li>
            <li>
              Nos reservamos el derecho de modificar los precios, notificandolo
              con al menos 30 dias de antelacion. El nuevo precio se aplicara
              en el siguiente ciclo de facturacion.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Cancelacion</h2>
          <ul>
            <li>
              Puedes cancelar tu suscripcion en cualquier momento desde tu
              perfil de usuario.
            </li>
            <li>
              La cancelacion sera efectiva al final del periodo de facturacion
              en curso. Hasta esa fecha, mantendras acceso al contenido.
            </li>
            <li>
              No se realizan reembolsos por periodos parciales, salvo lo
              dispuesto en la politica de desistimiento.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Propiedad intelectual</h2>
          <ul>
            <li>
              Todo el contenido de la plataforma (videos, textos, ejercicios,
              diseno, marca) es propiedad de LOAM CLUB y esta protegido por la
              legislacion de propiedad intelectual.
            </li>
            <li>
              La suscripcion te otorga una licencia personal, no exclusiva e
              intransferible para acceder al contenido.
            </li>
            <li>
              Queda prohibida la reproduccion, distribucion, comunicacion
              publica o transformacion del contenido sin autorizacion expresa.
            </li>
            <li>
              Queda expresamente prohibido grabar, descargar o compartir los
              videos u otros contenidos de la plataforma.
            </li>
          </ul>
        </section>

        <section>
          <h2>8. Limitacion de responsabilidad</h2>
          <ul>
            <li>
              El contenido de LOAM CLUB tiene finalidad formativa e informativa
              y no constituye asesoramiento psicologico, medico ni terapeutico
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
              Utilizar el servicio de forma licita y respetuosa.
            </li>
            <li>
              No compartir tu cuenta ni tus credenciales con terceros.
            </li>
            <li>
              No intentar acceder de forma no autorizada a contenido o
              funcionalidades restringidas.
            </li>
            <li>
              No utilizar el contenido con fines comerciales sin autorizacion.
            </li>
          </ul>
        </section>

        <section>
          <h2>10. Modificaciones del servicio y los terminos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Terminos y Condiciones,
            asi como las caracteristicas del servicio. Cualquier cambio
            sustancial sera notificado por email con al menos 15 dias de
            antelacion. El uso continuado de la plataforma tras la notificacion
            implica la aceptacion de los cambios.
          </p>
        </section>

        <section>
          <h2>11. Legislacion aplicable y jurisdiccion</h2>
          <p>
            Estos Terminos y Condiciones se rigen por la legislacion espanola.
            Para la resolucion de cualquier controversia, las partes se someten
            a los juzgados y tribunales correspondientes al domicilio del
            consumidor, de conformidad con la normativa vigente.
          </p>
        </section>

        <section>
          <h2>12. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con estos Terminos y
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
