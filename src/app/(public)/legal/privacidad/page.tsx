import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de LOAM CLUB. Información sobre el tratamiento de tus datos personales.",
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Política de Privacidad
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Última actualización: marzo 2026
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
            Recopilamos los siguientes datos personales en función de tu
            interacción con nuestra plataforma:
          </p>
          <ul>
            <li>
              <strong>Datos de registro:</strong> nombre, dirección de correo
              electrónico y contraseña cifrada.
            </li>
            <li>
              <strong>Datos de facturación:</strong> información de pago
              procesada de forma segura a través de Stripe. No almacenamos
              números de tarjeta en nuestros servidores.
            </li>
            <li>
              <strong>Datos de uso:</strong> información sobre tu actividad en
              la plataforma, como videos visualizados y progreso en ejercicios.
            </li>
            <li>
              <strong>Datos de comunicación:</strong> mensajes enviados a través
              del formulario de contacto o por email.
            </li>
            <li>
              <strong>Datos técnicos:</strong> dirección IP, tipo de navegador,
              sistema operativo y datos de cookies (ver Política de Cookies).
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Finalidades del tratamiento</h2>
          <p>Tratamos tus datos personales para las siguientes finalidades:</p>
          <ul>
            <li>Gestionar tu cuenta y suscripción en la plataforma.</li>
            <li>Procesar pagos y facturación a través de Stripe.</li>
            <li>
              Proporcionarte acceso al contenido y servicios contratados.
            </li>
            <li>
              Comunicarnos contigo en relación con tu cuenta, cambios en el
              servicio o respuestas a consultas.
            </li>
            <li>
              Mejorar la plataforma y personalizar tu experiencia de uso.
            </li>
            <li>Cumplir con obligaciones legales y fiscales.</li>
          </ul>
        </section>

        <section>
          <h2>4. Base jurídica del tratamiento</h2>
          <ul>
            <li>
              <strong>Ejecución del contrato:</strong> el tratamiento es
              necesario para prestarte el servicio al que te has suscrito.
            </li>
            <li>
              <strong>Consentimiento:</strong> para el envío de comunicaciones
              comerciales, cuando corresponda.
            </li>
            <li>
              <strong>Interés legítimo:</strong> para la mejora de nuestros
              servicios y la prevención del fraude.
            </li>
            <li>
              <strong>Obligación legal:</strong> para el cumplimiento de
              obligaciones fiscales y legales.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Destinatarios de los datos</h2>
          <p>
            Tus datos podrán ser comunicados a los siguientes terceros,
            únicamente en la medida necesaria para la prestación del servicio:
          </p>
          <ul>
            <li>
              <strong>Stripe:</strong> procesamiento de pagos (con sede en EE.
              UU., adherido al EU-US Data Privacy Framework).
            </li>
            <li>
              <strong>Supabase:</strong> alojamiento de la base de datos y
              autenticación.
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
            fuera del Espacio Económico Europeo (EEE). En tales casos, nos
            aseguramos de que existan garantías adecuadas, como cláusulas
            contractuales tipo aprobadas por la Comisión Europea o la adhesión
            al EU-US Data Privacy Framework.
          </p>
        </section>

        <section>
          <h2>7. Plazo de conservación</h2>
          <p>
            Conservaremos tus datos personales durante el tiempo que mantengas
            tu cuenta activa y, posteriormente, durante los plazos legalmente
            establecidos para el cumplimiento de obligaciones fiscales y legales
            (generalmente 5 años para datos fiscales).
          </p>
        </section>

        <section>
          <h2>8. Tus derechos</h2>
          <p>
            De conformidad con el Reglamento General de Protección de Datos
            (RGPD), tienes los siguientes derechos:
          </p>
          <ul>
            <li>
              <strong>Acceso:</strong> derecho a obtener confirmación de si
              estamos tratando tus datos y a acceder a ellos.
            </li>
            <li>
              <strong>Rectificación:</strong> derecho a corregir datos inexactos
              o incompletos.
            </li>
            <li>
              <strong>Supresión:</strong> derecho a solicitar la eliminación de
              tus datos cuando ya no sean necesarios.
            </li>
            <li>
              <strong>Limitación:</strong> derecho a solicitar la limitación del
              tratamiento en determinadas circunstancias.
            </li>
            <li>
              <strong>Portabilidad:</strong> derecho a recibir tus datos en un
              formato estructurado y de uso común.
            </li>
            <li>
              <strong>Oposición:</strong> derecho a oponerte al tratamiento de
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
            . Responderemos a tu solicitud en un plazo máximo de 30 días.
          </p>
          <p>
            Asimismo, tienes derecho a presentar una reclamación ante la Agencia
            Española de Protección de Datos (AEPD) si consideras que el
            tratamiento de tus datos no se ajusta a la normativa vigente.
          </p>
        </section>

        <section>
          <h2>9. Seguridad</h2>
          <p>
            Implementamos medidas técnicas y organizativas adecuadas para
            proteger tus datos personales contra el acceso no autorizado, la
            pérdida, la destrucción o la alteración. Entre estas medidas se
            incluyen el cifrado de datos, el acceso restringido y la
            monitorización de seguridad.
          </p>
        </section>

        <section>
          <h2>10. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar esta Política de Privacidad
            en cualquier momento. Cualquier cambio será publicado en esta página
            con la fecha de actualización correspondiente. Te recomendamos
            revisarla periódicamente.
          </p>
        </section>
      </div>
    </main>
  );
}
