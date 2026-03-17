import type { HTMLAttributes } from "react";

type BadgeStatus = "active" | "past_due" | "canceled" | "incomplete" | "trialing";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children?: React.ReactNode;
}

const statusStyles: Record<BadgeStatus, string> = {
  active: "bg-[var(--color-olive)]/10 text-[var(--color-olive)] border-[var(--color-olive)]/30",
  trialing: "bg-[var(--color-olive)]/10 text-[var(--color-olive)] border-[var(--color-olive)]/30",
  past_due: "bg-[var(--color-gold)]/20 text-[var(--color-olive)] border-[var(--color-gold)]/50",
  incomplete: "bg-[var(--color-gold)]/20 text-[var(--color-olive)] border-[var(--color-gold)]/50",
  canceled: "bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/30",
};

const statusLabels: Record<BadgeStatus, string> = {
  active: "Activa",
  trialing: "Prueba",
  past_due: "Pendiente",
  incomplete: "Incompleta",
  canceled: "Cancelada",
};

export function Badge({
  status,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]} ${className}`}
      {...props}
    >
      {children ?? statusLabels[status]}
    </span>
  );
}
