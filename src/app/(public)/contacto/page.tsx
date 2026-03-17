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
      <section className="relative overflow-hidden bg-[var(--color-olive)] px-6 pt-28 pb-20 text-center md:pt-40 md:pb-28 bg-roots">
        <div className="relative z-10">
          <p className="mb-6 animate-fade-in text-sm tracking-[0.25em] uppercase text-[var(--color-gold)]">
            Contacto
          </p>
          <h1 className="mx-auto max-w-2xl animate-fade-up font-display text-5xl leading-tight tracking-tight text-white md:text-7xl md:leading-[1.1]">
            Hablemos
          </h1>
          <p className="mx-auto mt-8 max-w-xl animate-fade-up delay-200 text-lg leading-relaxed text-white/80">
            Si tienes alguna pregunta, sugerencia o simplemente quieres saber más
            sobre LOAM CL<span className="italic">U</span>B, estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] px-6 py-28 md:py-36">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          {/* Contact info - olive bg card */}
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-olive)] p-8 md:p-10 bg-roots">
            <div className="relative z-10">
              <h2 className="font-display text-2xl text-white md:text-3xl">
                Información de contacto
              </h2>
              <div className="mt-10 space-y-8">
                <div>
                  <p className="text-sm tracking-wide uppercase text-[var(--color-gold)]">
                    Email
                  </p>
                  <a
                    href="mailto:hola@loamclub.com"
                    className="mt-1 block text-lg text-white transition-opacity hover:opacity-80 gold-underline"
                  >
                    hola@loamclub.com
                  </a>
                </div>
                <div>
                  <p className="text-sm tracking-wide uppercase text-[var(--color-gold)]">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/psicolorenaamadio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-lg text-white transition-opacity hover:opacity-80 gold-underline"
                  >
                    @psicolorenaamadio
                  </a>
                </div>
                <div>
                  <p className="text-sm tracking-wide uppercase text-[var(--color-gold)]">
                    Horario de respuesta
                  </p>
                  <p className="mt-1 text-lg text-white/80">
                    Respondemos en un plazo de 24-48 horas hábiles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-[var(--color-black)] md:text-3xl">
              Envíanos un mensaje
            </h2>

            {sent ? (
              <div className="mt-10 rounded-2xl border border-[var(--color-gold)] bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/20">
                  <svg className="h-6 w-6 text-[var(--color-olive)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-display text-xl text-[var(--color-black)]">
                  Mensaje enviado
                </p>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  Gracias por escribirnos. Te responderemos lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium tracking-wide uppercase text-[var(--color-olive-light)]"
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
                    className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-4 py-3 text-[var(--color-black)] placeholder-[var(--color-olive-light)] outline-none transition-colors focus:border-[var(--color-olive)] focus:ring-2 focus:ring-[var(--color-olive)]/20"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium tracking-wide uppercase text-[var(--color-olive-light)]"
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
                    className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-4 py-3 text-[var(--color-black)] placeholder-[var(--color-olive-light)] outline-none transition-colors focus:border-[var(--color-olive)] focus:ring-2 focus:ring-[var(--color-olive)]/20"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium tracking-wide uppercase text-[var(--color-olive-light)]"
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
                    className="w-full resize-none rounded-lg border border-[var(--color-border-strong)] bg-white px-4 py-3 text-[var(--color-black)] placeholder-[var(--color-olive-light)] outline-none transition-colors focus:border-[var(--color-olive)] focus:ring-2 focus:ring-[var(--color-olive)]/20"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full cursor-pointer rounded-lg bg-[var(--color-olive)] py-4 text-sm font-bold tracking-wide text-white uppercase transition-all hover:brightness-110 disabled:opacity-60"
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
