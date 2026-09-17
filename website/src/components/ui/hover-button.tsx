"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "solid" | "ghost" | "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export function HoverButton({
  href,
  children,
  className,
  variant = "solid",
  size = "md",
  ...props
}: ButtonProps) {
  const variants = {
    solid:
      "bg-[var(--mocha)] text-[var(--ivory)] hover:bg-[var(--mocha-deep)] border border-transparent",
    ghost:
      "bg-transparent text-[var(--ivory)] border border-[var(--ivory)]/70 hover:bg-[var(--ivory)]/10",
    light:
      "bg-[var(--ivory)] text-[var(--charcoal)] border border-transparent hover:bg-white",
    dark:
      "bg-[var(--charcoal)] text-[var(--ivory)] border border-transparent hover:bg-black",
  };

  const sizes = {
    sm: "h-10 px-5 text-xs tracking-[0.16em]",
    md: "h-12 px-7 text-[0.7rem] tracking-[0.18em]",
    lg: "h-14 px-8 text-xs tracking-[0.2em]",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-sm font-medium uppercase transition-all duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-[1px]">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-0 translate-y-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0" />
    </Link>
  );
}
