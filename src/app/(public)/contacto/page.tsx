"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // TODO: Connect to backend / email service
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  }

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="px-6 pt-24 pb-16 text-center md:pt-36 md:pb-20">
        <p className="mb-6 text-sm tracking-[0.25em] uppercase text-[var(--color-white-75)]">
          Contacto
        </p>
        <h1 className="mx-auto max-w-2xl font-display text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.1]">
          Hablemos
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--color-white-75)]">
          Si tienes alguna pregunta, sugerencia o simplemente quieres saber mas
          sobre LOAM CLUB, estamos aqui para ayudarte.
        </p>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="px-6 pb-28 md:pb-36">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Informacion de contacto
            </h2>
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-sm tracking-wide uppercase text-[var(--color-white-40)]">
                  Email
                </p>
                <a
                  href="mailto:hola@loamclub.com"
                  className="mt-1 block text-lg transition-opacity hover:opacity-80"
                >
                  hola@loamclub.com
                </a>
              </div>
              <div>
                <p className="text-sm tracking-wide uppercase text-[var(--color-white-40)]">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/psicolorenaamadio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-lg transition-opacity hover:opacity-80"
                >
                  @psicolorenaamadio
                </a>
              </div>
              <div>
                <p className="text-sm tracking-wide uppercase text-[var(--color-white-40)]">
                  Horario de respuesta
                </p>
                <p className="mt-1 text-lg text-[var(--color-white-75)]">
                  Respondemos en un plazo de 24-48 horas habiles.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Envianos un mensaje
            </h2>

            {sent ? (
              <div className="mt-10 rounded-2xl border border-[var(--color-gold)] bg-white/5 p-8 text-center">
                <p className="font-display text-xl">Mensaje enviado</p>
                <p className="mt-3 text-[var(--color-white-75)]">
                  Gracias por escribirnos. Te responderemos lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm tracking-wide uppercase text-[var(--color-white-40)]"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--color-white-40)] bg-white/5 px-4 py-3 text-white placeholder-[var(--color-white-40)] outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm tracking-wide uppercase text-[var(--color-white-40)]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[var(--color-white-40)] bg-white/5 px-4 py-3 text-white placeholder-[var(--color-white-40)] outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm tracking-wide uppercase text-[var(--color-white-40)]"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-[var(--color-white-40)] bg-white/5 px-4 py-3 text-white placeholder-[var(--color-white-40)] outline-none transition-colors focus:border-[var(--color-gold)]"
                    placeholder="Cuentanos en que podemos ayudarte..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full cursor-pointer rounded-full bg-[var(--color-gold)] py-4 text-sm font-bold tracking-wide text-[var(--color-green-dark)] uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
