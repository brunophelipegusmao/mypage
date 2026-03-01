"use client";

import clsx from "clsx";
import Link from "next/link";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const buttonVariants = {
  primary:
    "border border-primary/40 bg-linear-to-r from-primary to-primary/75 text-primary-foreground hover:shadow-[0_0_32px_rgba(27,106,255,0.45)]",
  secondary:
    "border border-white/20 bg-white/6 text-secondary-foreground hover:bg-white/12 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)]",
  muted:
    "border border-border bg-muted/60 text-muted-foreground hover:bg-muted/85",
};

const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-3 text-lg",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses = clsx(
    "transform rounded-xl font-semibold transition-all duration-300",
    "hover:-translate-y-0.5 hover:scale-[1.01]",
    "focus:ring-primary/45 focus:ring-2 focus:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none",
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}

export default Button;
