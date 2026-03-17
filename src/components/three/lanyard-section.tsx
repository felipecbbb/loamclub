'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

function MemberCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [swinging, setSwinging] = useState(true);

  // Subtle swinging animation when not interacting
  useEffect(() => {
    if (!swinging) return;
    let frame: number;
    const animate = () => {
      const t = Date.now() / 1000;
      setRot({
        x: Math.sin(t * 0.8) * 3,
        y: Math.cos(t * 0.6) * 8,
      });
      setPos({
        x: Math.sin(t * 0.5) * 6,
        y: Math.cos(t * 0.7) * 4,
      });
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [swinging]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2);
    const y = (e.clientY - cy) / (rect.height / 2);
    setRot({ x: -y * 15, y: x * 15 });
    setSwinging(false);
  };

  const handleMouseLeave = () => {
    setRot({ x: 0, y: 0 });
    setTimeout(() => setSwinging(true), 300);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Lanyard string */}
      <div className="w-px h-16 md:h-24 relative">
        <div
          className="absolute inset-0 w-[3px] -ml-[1px] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #5B6644 0%, #FDDF59 30%, #5B6644 60%, #FDDF59 90%, #5B6644 100%)',
            transform: `translateX(${pos.x * 0.3}px)`,
            transition: swinging ? 'none' : 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Clip */}
      <div
        className="w-8 h-4 rounded-b-lg bg-[var(--color-gold)] relative z-10 shadow-sm"
        style={{
          transform: `translateX(${pos.x * 0.5}px)`,
          transition: swinging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-olive)]" />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-grab active:cursor-grabbing"
        style={{
          perspective: '800px',
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: swinging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <div
          className="w-[240px] h-[340px] md:w-[280px] md:h-[400px] rounded-xl overflow-hidden relative shadow-2xl"
          style={{
            transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: swinging ? 'none' : 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card face */}
          <div className="absolute inset-0 bg-[var(--color-olive)]">
            {/* Grain texture */}
            <div className="bg-grain absolute inset-0 pointer-events-none" />

            {/* Gold top accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[var(--color-gold)]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              {/* Logo */}
              <div className="font-display text-3xl md:text-4xl text-[var(--color-gold)] tracking-wider">
                LOAM CL<span className="italic">U</span>B
              </div>

              {/* Divider */}
              <div className="w-16 h-px bg-[var(--color-gold)]/30 my-5" />

              {/* Member text */}
              <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase">
                Miembro
              </div>

              {/* Root illustration */}
              <svg className="mt-8 opacity-[0.08]" width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
                <g stroke="white" fill="none" strokeWidth="1" strokeLinecap="round">
                  <path d="M40 0 C38 20, 28 35, 20 55 C16 65, 14 72, 10 80" />
                  <path d="M40 0 C42 20, 52 35, 60 55 C64 65, 66 72, 70 80" />
                  <path d="M40 15 C34 25, 22 30, 12 32" />
                  <path d="M40 15 C46 25, 58 30, 68 32" />
                  <path d="M40 35 C35 42, 25 48, 15 55" />
                  <path d="M40 35 C45 42, 55 48, 65 55" />
                </g>
              </svg>
            </div>

            {/* Corner marks */}
            <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-[var(--color-gold)]/20" />
            <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-[var(--color-gold)]/20" />
            <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-[var(--color-gold)]/20" />
            <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-[var(--color-gold)]/20" />

            {/* Gold bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-[var(--color-gold)]" />

            {/* Shine effect on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${105 + rot.y * 2}deg, transparent 40%, rgba(253,223,89,0.06) 50%, transparent 60%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LanyardSection() {
  return (
    <section className="relative bg-[var(--color-olive)] overflow-hidden">
      <div className="bg-grain pointer-events-none absolute inset-0" />

      {/* Subtle root lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="white" fill="none" strokeWidth="0.8" strokeLinecap="round">
            <path d="M400 0 C398 80,370 160,340 260 C320 320,300 400,280 500" />
            <path d="M400 0 C402 80,430 160,460 260 C480 320,500 400,520 500" />
            <path d="M340 260 C300 280,250 290,180 285" />
            <path d="M460 260 C500 280,550 290,620 285" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl grid md:grid-cols-2 items-center py-20 md:py-0 md:min-h-[80vh]">
        {/* Left: Text */}
        <div className="px-8 md:px-16 order-2 md:order-1">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-white/50 mb-6">
            Tu espacio te espera
          </p>

          <h2 className="font-display text-4xl text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Únete al<br />
            <span className="text-[var(--color-gold)] italic">club</span>
          </h2>

          <p className="mt-6 text-base text-white/70 max-w-md leading-relaxed">
            Accede a todos los cursos, ejercicios y herramientas
            de psicología aplicada diseñados por Lorena Amadio.
          </p>

          <div className="mt-10">
            <Link
              href="/pricing"
              className="inline-block bg-[var(--color-gold)] px-8 py-3.5 text-sm font-medium text-[var(--color-black)] rounded-lg transition-all hover:opacity-90"
            >
              Ver planes desde 90 EUR/mes
            </Link>
          </div>

          <div className="mt-10 space-y-3 text-sm text-white/50">
            <div className="flex items-center gap-3">
              <span className="w-px h-3 bg-[var(--color-gold)]" />Sin permanencia
            </div>
            <div className="flex items-center gap-3">
              <span className="w-px h-3 bg-[var(--color-gold)]" />Cancela cuando quieras
            </div>
            <div className="flex items-center gap-3">
              <span className="w-px h-3 bg-[var(--color-gold)]" />Acceso inmediato
            </div>
          </div>
        </div>

        {/* Right: Card */}
        <div className="flex items-center justify-center py-12 md:py-20 order-1 md:order-2">
          <MemberCard />
        </div>
      </div>
    </section>
  );
}
