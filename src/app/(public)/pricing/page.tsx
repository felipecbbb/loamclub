"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: Replace with actual Stripe price IDs from environment variables.
// These should come from process.env.NEXT_PUBLIC_STRIPE_PRICE_BASE and
// process.env.NEXT_PUBLIC_STRIPE_PRICE_PLUS once configured in .env.local
const PRICE_BASE = "price_placeholder_base";
const PRICE_PLUS = "price_placeholder_plus";

const plans = [
  {
    name: "Plan Base",
    price: "90",
    priceId: PRICE_BASE,
    highlighted: false,
    features: [
      "Acceso completo a la plataforma",
      "2 nuevos videos cada semana",
      "Ejercicios practicos descargables",
      "Biblioteca completa de contenido",
      "Nuevos temas cada semana",
    ],
  },
  {
    name: "Plan Plus",
    price: "180",
    priceId: PRICE_PLUS,
    highlighted: true,
    badge: "Recomendado",
    features: [
      "Todo lo incluido en el Plan Base",
      "Sesion individual de 30 min con Lorena",
      "Sesiones recurrentes cada mes",
      "Orientacion personalizada",
      "Prioridad en nuevos contenidos",
    ],
  },
];

const faqs = [
  {
    q: "Puedo cancelar en cualquier momento?",
    a: "Si. Tu suscripcion se renueva mensualmente y puedes cancelarla cuando quieras desde tu perfil. No hay permanencia ni penalizaciones.",
  },
  {
    q: "Que tipo de contenido voy a encontrar?",
    a: "Videos semanales con herramientas de psicologia aplicada, ejercicios practicos y protocolos que puedes integrar en tu dia a dia. Temas como gestion de la ansiedad, limites, autoestima y regulacion emocional.",
  },
  {
    q: "Necesito tener experiencia previa en psicologia?",
    a: "No. El contenido esta disenado para ser accesible y aplicable, independientemente de tu formacion. Lorena traduce la psicologia en herramientas practicas que cualquier persona puede usar.",
  },
  {
    q: "En que consisten las sesiones del Plan Plus?",
    a: "Son sesiones individuales de 30 minutos por videollamada con Lorena Amadio. Estan pensadas para profundizar en tu proceso personal y recibir orientacion adaptada a tu situacion.",
  },
  {
    q: "Puedo cambiar de plan despues?",
    a: "Si. Puedes pasar del Plan Base al Plan Plus (o viceversa) en cualquier momento. El cambio se aplica en tu siguiente ciclo de facturacion.",
  },
  {
    q: "Que metodos de pago aceptais?",
    a: "Aceptamos tarjetas de credito y debito (Visa, Mastercard, American Express) a traves de Stripe, una plataforma de pago segura.",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function handleCheckout(priceId: string) {
    setLoading(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Ha ocurrido un error. Por favor, intentalo de nuevo.");
      }
    } catch {
      alert("Ha ocurrido un error. Por favor, intentalo de nuevo.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-16 text-center md:pt-36 md:pb-20">
        <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
          Planes
        </p>
        <h1 className="mx-auto max-w-2xl font-display text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          Elige tu plan
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-white-75)]">
          Sin permanencia. Cancela cuando quieras. Accede hoy a herramientas de
          psicologia aplicada que realmente transforman.
        </p>
      </section>

      {/* ── Plan cards ────────────────────────────────────────── */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 md:p-10 ${
                plan.highlighted
                  ? "border-[var(--color-gold)] bg-[var(--color-green-dark)]"
                  : "border-[var(--color-white-40)] bg-white/5"
              }`}
            >
              {plan.highlighted && plan.badge && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-[var(--color-gold)] px-4 py-1 text-xs font-bold tracking-wide text-[var(--color-green-dark)] uppercase">
                  {plan.badge}
                </span>
              )}

              <h2 className="font-display text-2xl md:text-3xl">
                {plan.name}
              </h2>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl md:text-6xl">
                  {plan.price}&euro;
                </span>
                <span className="text-[var(--color-white-75)]">/mes</span>
              </p>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[var(--color-white-75)]"
                  >
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading !== null}
                className={`mt-10 w-full cursor-pointer rounded-full py-4 text-sm font-bold tracking-wide uppercase transition-opacity hover:opacity-90 disabled:opacity-60 ${
                  plan.highlighted
                    ? "bg-[var(--color-gold)] text-[var(--color-green-dark)]"
                    : "bg-white text-[var(--color-green-dark)]"
                }`}
              >
                {loading === plan.priceId ? "Redirigiendo..." : "Suscribirme"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-[var(--color-green-dark)] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl md:text-5xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-16 divide-y divide-[var(--color-white-40)]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between text-left"
                >
                  <span className="text-lg font-medium">{faq.q}</span>
                  <svg
                    className={`ml-4 h-5 w-5 shrink-0 transition-transform ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <p className="mt-4 leading-relaxed text-[var(--color-white-75)]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl md:text-4xl">
          Todavia tienes dudas?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-[var(--color-white-75)]">
          Escribenos y te ayudamos a decidir.
        </p>
        <Link
          href="/contacto"
          className="mt-10 inline-block rounded-full border border-white px-10 py-4 text-sm font-bold tracking-wide uppercase transition-opacity hover:opacity-80"
        >
          Contactar
        </Link>
      </section>
    </main>
  );
}
