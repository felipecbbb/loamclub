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
      "Ejercicios prácticos descargables",
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
      "Sesión individual de 30 min con Lorena",
      "Sesiones recurrentes cada mes",
      "Orientación personalizada",
      "Prioridad en nuevos contenidos",
    ],
  },
];

const faqs = [
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí. Tu suscripción se renueva mensualmente y puedes cancelarla cuando quieras desde tu perfil. No hay permanencia ni penalizaciones.",
  },
  {
    q: "¿Qué tipo de contenido voy a encontrar?",
    a: "Videos semanales con herramientas de psicología aplicada, ejercicios prácticos y protocolos que puedes integrar en tu día a día. Temas como gestión de la ansiedad, límites, autoestima y regulación emocional.",
  },
  {
    q: "¿Necesito tener experiencia previa en psicología?",
    a: "No. El contenido está diseñado para ser accesible y aplicable, independientemente de tu formación. Lorena traduce la psicología en herramientas prácticas que cualquier persona puede usar.",
  },
  {
    q: "¿En qué consisten las sesiones del Plan Plus?",
    a: "Son sesiones individuales de 30 minutos por videollamada con Lorena Amadio. Están pensadas para profundizar en tu proceso personal y recibir orientación adaptada a tu situación.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Puedes pasar del Plan Base al Plan Plus (o viceversa) en cualquier momento. El cambio se aplica en tu siguiente ciclo de facturación.",
  },
  {
    q: "¿Qué métodos de pago aceptáis?",
    a: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de Stripe, una plataforma de pago segura.",
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
        alert("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
      }
    } catch {
      alert("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 pt-28 pb-20 text-center md:pt-40 md:pb-28 bg-roots">
        <div className="relative z-10">
          <p className="mb-6 animate-fade-in text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
            Planes
          </p>
          <h1 className="mx-auto max-w-2xl animate-fade-up font-display text-5xl leading-tight tracking-tight text-white md:text-7xl md:leading-[1.1]">
            Elige tu plan
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fade-up delay-200 text-lg leading-relaxed text-white/80">
            Sin permanencia. Cancela cuando quieras. Accede hoy a herramientas de
            psicología aplicada que realmente transforman.
          </p>
        </div>
      </section>

      {/* ── Plan cards ────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 md:py-36">
        <div className="mx-auto grid max-w-4xl gap-8 stagger-children md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-hover relative flex flex-col rounded-2xl border p-8 md:p-10 ${
                plan.highlighted
                  ? "border-[var(--color-gold)] bg-[var(--color-olive)] shadow-lg"
                  : "border-[var(--color-border-strong)] bg-white shadow-sm"
              }`}
            >
              {plan.highlighted && plan.badge && (
                <span className="absolute -top-3.5 left-8 rounded-full bg-[var(--color-gold)] px-4 py-1 text-xs font-bold tracking-wide text-[var(--color-black)] uppercase animate-pulse-gold">
                  {plan.badge}
                </span>
              )}

              <h2
                className={`font-display text-2xl md:text-3xl ${
                  plan.highlighted ? "text-white" : "text-[var(--color-black)]"
                }`}
              >
                {plan.name}
              </h2>

              <p className="mt-6 flex items-baseline gap-1">
                <span
                  className={`font-display text-5xl md:text-6xl ${
                    plan.highlighted
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-olive)]"
                  }`}
                >
                  {plan.price}&euro;
                </span>
                <span
                  className={
                    plan.highlighted
                      ? "text-white/70"
                      : "text-[var(--color-olive)]"
                  }
                >
                  /mes
                </span>

              </p>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 ${
                      plan.highlighted
                        ? "text-white/90"
                        : "text-[var(--color-text-secondary)]"
                    }`}
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
                className={`mt-10 w-full cursor-pointer rounded-lg py-4 text-sm font-bold tracking-wide uppercase transition-all hover:brightness-110 disabled:opacity-60 ${
                  plan.highlighted
                    ? "bg-[var(--color-gold)] text-[var(--color-black)]"
                    : "bg-[var(--color-olive)] text-white"
                }`}
              >
                {loading === plan.priceId ? "Redirigiendo..." : "Suscribirme"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-[var(--color-olive)] px-6 py-28 md:py-36 bg-roots">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-center font-display text-3xl text-white md:text-5xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-16 divide-y divide-white/20">
            {faqs.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between text-left"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.q}
                  </span>
                  <svg
                    className={`ml-4 h-5 w-5 shrink-0 text-[var(--color-gold)] transition-transform duration-300 ${
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
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openFaq === i
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="leading-relaxed text-white/75">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 text-center md:py-36">
        <h2 className="font-display text-3xl text-[var(--color-black)] md:text-4xl animate-fade-up">
          ¿Todavía tienes dudas?
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-[var(--color-olive)]">
          Escríbenos y te ayudamos a decidir.
        </p>
        <Link
          href="/contacto"
          className="mt-10 inline-block rounded-lg border-2 border-[var(--color-olive)] px-10 py-4 text-sm font-bold tracking-wide text-[var(--color-olive)] uppercase transition-all hover:bg-[var(--color-olive)] hover:text-white"
        >
          Contactar
        </Link>
      </section>
    </main>
  );
}
