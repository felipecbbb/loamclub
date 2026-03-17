"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");
    router.push(redirect || "/app/dashboard");
  }

  return (
    <main className="min-h-screen grid md:grid-cols-2">
      {/* ── Left: Form ── */}
      <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <p className="font-display text-xl text-[#5B6644] tracking-wide animate-fade-up">
            LOAM CL<span className="italic">U</span>B
          </p>

          {/* Heading */}
          <h1 className="font-display text-3xl text-[#1A1A1A] mt-10 mb-3 animate-fade-up">
            Bienvenida de nuevo
          </h1>
          <p className="text-[#5B6644] text-sm mb-10 animate-fade-up">
            Accede a tu espacio de psicología aplicada
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-up">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#5B6644]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[var(--color-border)] rounded-lg py-3 px-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#5B6644] focus:ring-2 focus:ring-[#5B6644]/20 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#5B6644]"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[var(--color-border)] rounded-lg py-3 px-4 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#5B6644] focus:ring-2 focus:ring-[#5B6644]/20 focus:outline-none transition-all duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-[var(--color-error)] text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5B6644] text-white font-medium rounded-lg py-3 mt-2 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              Entrar
            </button>
          </form>

          <p className="mt-8 text-sm text-[#1A1A1A]/50">
            ¿No tienes cuenta?{" "}
            <Link
              href="/registro"
              className="text-[#5B6644] underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Visual panel ── */}
      <div className="hidden md:flex relative bg-[#5B6644] rounded-l-3xl overflow-hidden items-center justify-center">
        {/* Grain texture */}
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

        {/* Root pattern SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 0 C400 200 300 300 200 400 C100 500 150 600 200 800"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M400 0 C400 250 500 350 600 450 C700 550 650 700 600 800"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M200 0 C250 200 350 300 400 400 C450 500 350 650 300 800"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M600 0 C550 150 450 250 400 350 C350 450 400 600 450 800"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M0 300 C150 320 250 380 400 400 C550 420 650 380 800 350"
            stroke="white"
            strokeWidth="0.8"
          />
          <path
            d="M0 500 C100 480 250 450 400 460 C550 470 700 520 800 540"
            stroke="white"
            strokeWidth="0.8"
          />
        </svg>

        {/* Testimonial content */}
        <div className="relative z-10 max-w-sm px-10 text-center animate-fade-in">
          {/* Gold accent line */}
          <div className="w-8 h-0.5 bg-[#FDDF59] mx-auto mb-8" />

          <blockquote className="font-display italic text-xl text-white/90 leading-relaxed">
            &ldquo;LOAM me ayudó a entender patrones que llevaba repitiendo
            años. Por fin siento que avanzo con claridad.&rdquo;
          </blockquote>

          <div className="mt-8">
            <p className="text-white/70 text-sm font-medium">Sofía R.</p>
            <p className="text-white/60 text-xs mt-1">Alumna LOAM CLUB</p>
          </div>
        </div>
      </div>

      {/* ── Mobile: Visual section (stacks below form) ── */}
      <div className="md:hidden bg-[#5B6644] px-8 py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <div className="relative z-10">
          <div className="w-8 h-0.5 bg-[#FDDF59] mx-auto mb-6" />
          <blockquote className="font-display italic text-lg text-white/90 leading-relaxed max-w-xs mx-auto">
            &ldquo;LOAM me ayudó a entender patrones que llevaba repitiendo
            años.&rdquo;
          </blockquote>
          <p className="text-white/70 text-xs mt-4">Sofía R. — Alumna LOAM CLUB</p>
        </div>
      </div>
    </main>
  );
}
