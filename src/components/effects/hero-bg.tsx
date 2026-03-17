'use client';

import dynamic from 'next/dynamic';

const DarkVeil = dynamic(() => import('./dark-veil'), { ssr: false });

interface HeroBgProps {
  className?: string;
}

export function HeroBg({ className = '' }: HeroBgProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <DarkVeil
        hueShift={95}
        noiseIntensity={0.02}
        scanlineIntensity={0}
        speed={0.25}
        scanlineFrequency={0}
        warpAmount={0}
      />
      {/* Olive tint — use screen blend to ADD olive instead of darkening */}
      <div className="absolute inset-0 bg-[#5B6644] opacity-70" />
      {/* Slight vignette for depth */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.3) 100%)' }} />
    </div>
  );
}
