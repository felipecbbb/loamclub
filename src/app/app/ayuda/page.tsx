"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "¿Cómo funciona la suscripción?",
    answer:
      "Tu suscripción te da acceso a todo el contenido de LOAM CLUB. Se renueva automáticamente cada mes. Puedes gestionarla en cualquier momento desde la sección de Perfil.",
  },
  {
    question: "¿Puedo cancelar en cualquier momento?",
    answer:
      "Sí, puedes cancelar tu suscripción cuando quieras desde tu Perfil > Gestionar suscripción. Seguirás teniendo acceso hasta el final del periodo ya pagado.",
  },
  {
    question: "¿Cómo accedo a las sesiones con Lorena?",
    answer:
      "Las sesiones en vivo con Lorena están disponibles exclusivamente para el Plan Plus. Si tienes este plan, recibirás una notificación con el enlace antes de cada sesión. También puedes ver las fechas programadas en tu Dashboard.",
  },
  {
    question: "¿Con qué frecuencia se publica contenido nuevo?",
    answer:
      "Publicamos nuevo contenido de forma regular, generalmente cada semana. Recibirás una notificación cada vez que haya una nueva lección disponible.",
  },
  {
    question: "¿Cómo contacto con soporte?",
    answer:
      "Puedes escribirnos en cualquier momento a hola@loamclub.com. Respondemos en un plazo de 24-48 horas hábiles.",
  },
];

export default function AyudaPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(idx: number) {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-black)]">
          Ayuda
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Preguntas frecuentes y contacto.
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[var(--color-border)] bg-white shadow-sm overflow-hidden card-hover"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-6 py-4 flex items-center justify-between group"
            >
              <span className="font-medium text-sm text-[var(--color-black)] group-hover:text-[var(--color-olive)] transition-colors">
                {item.question}
              </span>
              <svg
                className={`w-4 h-4 text-[var(--color-olive-light)] shrink-0 ml-4 transition-transform duration-300 ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === idx
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-4 border-t border-[var(--color-border)]">
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-4">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-olive)] p-8 text-center bg-roots">
        <div className="relative z-10">
          <h2 className="font-medium text-lg text-white mb-2">
            ¿Necesitas más ayuda?
          </h2>
          <p className="text-sm text-white/75 mb-4">
            Escríbenos y te responderemos lo antes posible.
          </p>
          <a
            href="mailto:hola@loamclub.com"
            className="inline-block bg-[var(--color-gold)] text-[var(--color-black)] font-medium text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition-all"
          >
            hola@loamclub.com
          </a>
        </div>
      </div>
    </div>
  );
}
