import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Derecho de Desistimiento",
  description:
    "Información sobre tu derecho de desistimiento en LOAM CLUB. 14 días para ejercerlo con excepción de contenido digital accedido.",
};

export default function DesistimientoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:py-36">
      <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
        Legal
      </p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Derecho de Desistimiento
      </h1>
      <p className="mt-4 text-sm text-[var(--color-white-40)]">
        Última actualización: marzo 2026
      </p>

      <div className="mt-12 space-y-10 text-[var(--color-white-75)] leading-relaxed [&_h2]:mb-4 [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h2]:md:text-2xl [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
        <section>
          <h2>1. Tu derecho de desistimiento</h2>
          <p>
            De conformidad con el Real Decreto Legislativo 1/2007, de 16 de
            noviembre, por el que se aprueba el texto refundido de la Ley
            General para la Defensa de los Consumidores y Usuarios, tienes
            derecho a desistir del contrato de suscripción en un plazo de{" "}
            <strong>14 días naturales</strong> desde la fecha de contratación,
            sin necesidad de justificación alguna.
          </p>
        </section>

        <section>
          <h2>2. Excepción para contenido digital</h2>
          <p>
            De acuerdo con el artículo 103.m) del texto refundido de la Ley
            General para la Defensa de los Consumidores y Usuarios, el derecho
            de desistimiento no será aplicable cuando hayas accedido al
            contenido digital de la plataforma.
          </p>
          <p>
            Al suscribirte y acceder al contenido (videos, ejercicios,
            recursos), aceptas expresamente que el suministro del contenido
            digital comienza de inmediato y reconoces que, una vez accedido al
            contenido, pierdes el derecho de desistimiento.
          </p>
          <p>
            Esta excepción se basa en que el contenido digital, una vez
            accedido, no puede ser &quot;devuelto&quot; de la misma forma que un
            producto físico.
          </p>
        </section>

        <section>
          <h2>3. Cómo ejercer el derecho de desistimiento</h2>
          <p>
            Si deseas ejercer tu derecho de desistimiento dentro del plazo de 14
            días y antes de haber accedido al contenido, puedes hacerlo de las
            siguientes formas:
          </p>
          <ul>
            <li>
              Enviando un email a{" "}
              <a
                href="mailto:hola@loamclub.com"
                className="text-white underline transition-opacity hover:opacity-80"
              >
                hola@loamclub.com
              </a>{" "}
              con el asunto &quot;Desistimiento&quot;, indicando tu nombre, email de
              registro y fecha de suscripción.
            </li>
            <li>
              Utilizando el siguiente formulario tipo de desistimiento (no
              obligatorio):
            </li>
          </ul>

          <div className="mt-6 rounded-2xl border border-[var(--color-white-40)] bg-white/5 p-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-white">
              Modelo de formulario de desistimiento
            </p>
            <div className="space-y-3 text-sm">
              <p>A la atención de LOAM CLUB (hola@loamclub.com):</p>
              <p>
                Por la presente le comunico que desisto del contrato de
                suscripción al servicio LOAM CLUB.
              </p>
              <p>Fecha de contratación: _______________</p>
              <p>Nombre del consumidor: _______________</p>
              <p>Email de registro: _______________</p>
              <p>Fecha: _______________</p>
              <p>Firma (solo si se envía en papel): _______________</p>
            </div>
          </div>
        </section>

        <section>
          <h2>4. Efectos del desistimiento</h2>
          <ul>
            <li>
              Una vez recibida tu comunicación de desistimiento, procederemos al
              reembolso íntegro del pago realizado en un plazo máximo de{" "}
              <strong>14 días naturales</strong>.
            </li>
            <li>
              El reembolso se realizará utilizando el mismo medio de pago
              empleado en la transacción original (tarjeta de crédito/débito a
              través de Stripe).
            </li>
            <li>
              Tu acceso a la plataforma será desactivado de forma inmediata tras
              la confirmación del desistimiento.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Cancelación de la suscripción (fuera del plazo de desistimiento)</h2>
          <p>
            Independientemente del derecho de desistimiento, puedes cancelar tu
            suscripción en cualquier momento desde tu perfil de usuario. La
            cancelación será efectiva al final del periodo de facturación en
            curso y no se realizarán reembolsos por periodos parciales.
          </p>
        </section>

        <section>
          <h2>6. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con el derecho de
            desistimiento, puedes escribirnos a{" "}
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
