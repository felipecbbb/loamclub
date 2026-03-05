"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegistroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--color-gold)] mb-4">
            Revisa tu email
          </h1>
          <p className="text-[var(--color-white-75)] mb-6">
            Te hemos enviado un enlace de confirmacion a{" "}
            <span className="text-white font-medium">{email}</span>. Haz clic
            en el para activar tu cuenta.
          </p>
          <Link
            href="/login"
            className="text-sm text-[var(--color-gold)] hover:underline"
          >
            Volver a iniciar sesion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-[var(--color-gold)] mb-8 text-center">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Nombre completo"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Contrasena"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Minimo 6 caracteres"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <Button type="submit" loading={loading} className="w-full mt-2">
            Crear cuenta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-white-75)]">
          Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-[var(--color-gold)] hover:underline"
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </main>
  );
}
