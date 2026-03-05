import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-[#2e3520]/50 rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
