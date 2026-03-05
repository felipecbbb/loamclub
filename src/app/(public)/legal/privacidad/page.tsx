import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de Privacidad",
  description:
    "Politica de privacidad de LOAM CLUB. Informacion sobre el tratamiento de tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Politica de Privacidad
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Ultima actualizacion: marzo 2026
      </p>

      <div className="mt-12 space-y-10 text-[var(--color-white-75)] leading-relaxed [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:md:text-2xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        <section>
          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de tus datos personales es LOAM CLUB,
            operado por Lorena Amadio.
          </p>
          <ul>
            <li>Email de contacto: hola@loamclub.com</li>
            <li>Sitio web: loamclub.com</li>
          </ul>
        </section>

        <section>
          <h2>2. Datos que recopilamos</h2>
          <p>
            Recopilamos los siguientes datos personales en funcion de tu
            interaccion con nuestra plataforma:
          </p>
          <ul>
            <li>
              <strong>Datos de registro:</strong> nombre, direccion de correo
              electronico y contrasena cifrada.
            </li>
            <li>
              <strong>Datos de facturacion:</strong> informacion de pago
              procesada de forma segura a traves de Stripe. No almacenamos
              numeros de tarjeta en nuestros servidores.
            </li>
            <li>
              <strong>Datos de uso:</strong> informacion sobre tu actividad en
              la plataforma, como videos visualizados y progreso en ejercicios.
            </li>
            <li>
              <strong>Datos de comunicacion:</strong> mensajes enviados a traves
              del formulario de contacto o por email.
            </li>
            <li>
              <strong>Datos tecnicos:</strong> direccion IP, tipo de navegador,
              sistema operativo y datos de cookies (ver Politica de Cookies).
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidades del tratamiento</h2>
          <p>Tratamos tus datos personales para las siguientes finalidades:</p>
          <ul>
            <li>Gestionar tu cuenta y suscripcion en la plataforma.</li>
            <li>Procesar pagos y facturacion a traves de Stripe.</li>
            <li>
              Proporcionarte acceso al contenido y servicios contratados.
            </li>
            <li>
              Comunicarnos contigo en relacion con tu cuenta, cambios en el
              servicio o respuestas a consultas.
            </li>
            <li>
              Mejorar la plataforma y personalizar tu experiencia de uso.
            </li>
            <li>Cumplir con obligaciones legales y fiscales.</li>
          </ul>
        </section>

        <section>
          <h2>4. Base juridica del tratamiento</h2>
          <ul>
            <li>
              <strong>Ejecucion del contrato:</strong> el tratamiento es
              necesario para prestarte el servicio al que te has suscrito.
            </li>
            <li>
              <strong>Consentimiento:</strong> para el envio de comunicaciones
              comerciales, cuando corresponda.
            </li>
            <li>
              <strong>Interes legitimo:</strong> para la mejora de nuestros
              servicios y la prevencion del fraude.
            </li>
            <li>
              <strong>Obligacion legal:</strong> para el cumplimiento de
              obligaciones fiscales y legales.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Destinatarios de los datos</h2>
          <p>
            Tus datos podran ser comunicados a los siguientes terceros,
            unicamente en la medida necesaria para la prestacion del servicio:
          </p>
          <ul>
            <li>
              <strong>Stripe:</strong> procesamiento de pagos (con sede en EE.
              UU., adherido al EU-US Data Privacy Framework).
            </li>
            <li>
              <strong>Supabase:</strong> alojamiento de la base de datos y
              autenticacion.
            </li>
            <li>
              <strong>Proveedores de alojamiento web:</strong> para el
              funcionamiento de la plataforma.
            </li>
          </ul>
          <p>
            No vendemos ni compartimos tus datos personales con terceros con
            fines comerciales.
          </p>
        </section>

        <section>
          <h2>6. Transferencias internacionales</h2>
          <p>
            Algunos de nuestros proveedores de servicios pueden estar ubicados
            fuera del Espacio Economico Europeo (EEE). En tales casos, nos
            aseguramos de que existan garantias adecuadas, como clausulas
            contractuales tipo aprobadas por la Comision Europea o la adhesion
            al EU-US Data Privacy Framework.
          </p>
        </section>

        <section>
          <h2>7. Plazo de conservacion</h2>
          <p>
            Conservaremos tus datos personales durante el tiempo que mantengas
            tu cuenta activa y, posteriormente, durante los plazos legalmente
            establecidos para el cumplimiento de obligaciones fiscales y legales
            (generalmente 5 anos para datos fiscales).
          </p>
        </section>

        <section>
          <h2>8. Tus derechos</h2>
          <p>
            De conformidad con el Reglamento General de Proteccion de Datos
            (RGPD), tienes los siguientes derechos:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> derecho a obtener confirmacion de si
              estamos tratando tus datos y a acceder a ellos.
            </li>
            <li>
              <strong>Rectificacion:</strong> derecho a corregir datos inexactos
              o incompletos.
            </li>
            <li>
              <strong>Supresion:</strong> derecho a solicitar la eliminacion de
              tus datos cuando ya no sean necesarios.
            </li>
            <li>
              <strong>Limitacion:</strong> derecho a solicitar la limitacion del
              tratamiento en determinadas circunstancias.
            </li>
            <li>
              <strong>Portabilidad:</strong> derecho a recibir tus datos en un
              formato estructurado y de uso comun.
            </li>
            <li>
              <strong>Oposicion:</strong> derecho a oponerte al tratamiento de
              tus datos en determinadas circunstancias.
            </li>
          </ul>
          <p>
            Para ejercer estos derechos, ponte en contacto con nosotros en{" "}
            <a
              href="mailto:hola@loamclub.com"
              className="text-white underline transition-opacity hover:opacity-80"
            >
              hola@loamclub.com
            </a>
            . Responderemos a tu solicitud en un plazo maximo de 30 dias.
          </p>
          <p>
            Asimismo, tienes derecho a presentar una reclamacion ante la Agencia
            Espanola de Proteccion de Datos (AEPD) si consideras que el
            tratamiento de tus datos no se ajusta a la normativa vigente.
          </p>
        </section>

        <section>
          <h2>9. Seguridad</h2>
          <p>
            Implementamos medidas tecnicas y organizativas adecuadas para
            proteger tus datos personales contra el acceso no autorizado, la
            perdida, la destruccion o la alteracion. Entre estas medidas se
            incluyen el cifrado de datos, el acceso restringido y la
            monitorizacion de seguridad.
          </p>
        </section>

        <section>
          <h2>10. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar esta Politica de Privacidad
            en cualquier momento. Cualquier cambio sera publicado en esta pagina
            con la fecha de actualizacion correspondiente. Te recomendamos
            revisarla periodicamente.
          </p>
        </section>
      </div>
    </main>
  );
}
