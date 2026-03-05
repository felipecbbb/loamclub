"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "Como funciona la suscripcion?",
    answer:
      "Tu suscripcion te da acceso a todo el contenido de LOAM CLUB. Se renueva automaticamente cada mes. Puedes gestionarla en cualquier momento desde la seccion de Perfil.",
  },
  {
    question: "Puedo cancelar en cualquier momento?",
    answer:
      "Si, puedes cancelar tu suscripcion cuando quieras desde tu Perfil > Gestionar suscripcion. Seguiras teniendo acceso hasta el final del periodo ya pagado.",
  },
  {
    question: "Como accedo a las sesiones con Lorena?",
    answer:
      "Las sesiones en vivo con Lorena estan disponibles exclusivamente para el Plan Plus. Si tienes este plan, recibiras una notificacion con el enlace antes de cada sesion. Tambien puedes ver las fechas programadas en tu Dashboard.",
  },
  {
    question: "Con que frecuencia se publica contenido nuevo?",
    answer:
      "Publicamos nuevo contenido de forma regular, generalmente cada semana. Recibiras una notificacion cada vez que haya una nueva leccion disponible.",
  },
  {
    question: "Como contacto con soporte?",
    answer:
      "Puedes escribirnos en cualquier momento a hola@loamclub.com. Respondemos en un plazo de 24-48 horas habiles.",
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
        <h1 className="font-display text-3xl font-bold">Ayuda</h1>
        <p className="text-[var(--color-white-75)] mt-1">
          Preguntas frecuentes y contacto.
        </p>
      </div>

      {/* FAQ */}
      <div className="space-y-2">
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="bg-[var(--color-green-dark)] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-6 py-4 flex items-center justify-between group"
            >
              <span className="font-medium text-sm group-hover:text-[var(--color-gold)] transition-colors">
                {item.question}
              </span>
              <svg
                className={`w-4 h-4 text-[var(--color-white-40)] shrink-0 ml-4 transition-transform ${
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
            {openIndex === idx && (
              <div className="px-6 pb-4">
                <p className="text-sm text-[var(--color-white-75)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-[var(--color-green-dark)] rounded-2xl p-6 text-center">
        <h2 className="font-medium text-lg mb-2">Necesitas mas ayuda?</h2>
        <p className="text-sm text-[var(--color-white-75)] mb-4">
          Escribenos y te responderemos lo antes posible.
        </p>
        <a
          href="mailto:hola@loamclub.com"
          className="inline-block bg-[var(--color-gold)] text-[var(--color-green-dark)] font-medium text-sm px-6 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          hola@loamclub.com
        </a>
      </div>
    </div>
  );
}
