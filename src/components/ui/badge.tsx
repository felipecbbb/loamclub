import type { HTMLAttributes } from "react";

type BadgeStatus = "active" | "past_due" | "canceled" | "incomplete" | "trialing";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children?: React.ReactNode;
}

const statusStyles: Record<BadgeStatus, string> = {
  active: "bg-green-500/20 text-green-300 border-green-500/30",
  trialing: "bg-green-500/20 text-green-300 border-green-500/30",
  past_due: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  incomplete: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  canceled: "bg-red-500/20 text-red-300 border-red-500/30",
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
