"use client";
import { cn } from "@/lib/utils/cn";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 100));

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: { children: React.ReactNode; className?: string; visible?: boolean }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible ? "0 4px 30px rgba(91,102,68,0.12)" : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "fit-content" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl items-center justify-between rounded-2xl bg-transparent px-6 py-3 lg:flex",
        visible && "bg-[var(--color-olive)]/95",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className={cn("hidden lg:flex items-center gap-1 text-sm", className)}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-white/70 hover:text-white transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div layoutId="hovered" className="absolute inset-0 rounded-lg bg-white/10" />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export const MobileNav = ({ children, className, visible }: { children: React.ReactNode; className?: string; visible?: boolean }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible ? "0 4px 30px rgba(91,102,68,0.12)" : "none",
        width: visible ? "92%" : "100%",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden",
        visible && "bg-[var(--color-olive)]/95",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex w-full items-center justify-between", className)}>{children}</div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start gap-4 rounded-2xl bg-[var(--color-olive)] px-6 py-8 shadow-lg border border-white/10",
          className,
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) =>
  isOpen ? <IconX className="text-white h-5 w-5 cursor-pointer" onClick={onClick} /> : <IconMenu2 className="text-white h-5 w-5 cursor-pointer" onClick={onClick} />;

export const NavbarLogo = () => (
  <Link href="/" className="relative z-20 shrink-0 font-display text-lg font-bold text-[var(--color-gold)]">
    LOAM CL<span className="italic">U</span>B
  </Link>
);

export function NavbarButton({ href, children, className, variant = "primary", onClick }: {
  href?: string; children: React.ReactNode; className?: string; variant?: "primary" | "secondary" | "dark"; onClick?: () => void;
}) {
  const styles = {
    primary: "bg-[var(--color-gold)] text-[var(--color-black)] font-medium hover:opacity-90",
    secondary: "text-white/70 hover:text-white",
    dark: "bg-[var(--color-black)] text-white hover:opacity-90",
  };
  const cls = cn("px-5 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 inline-block text-center whitespace-nowrap", styles[variant], className);
  if (href) return <Link href={href} onClick={onClick} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
