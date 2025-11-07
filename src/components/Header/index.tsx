"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const liClasses = clsx(
    "px-4",
    "py-2",
    "rounded-lg",
    "text-lg",
    "font-medium",
    "bg-card/50 hover:bg-card",
    "text-card-foreground",
    "border border-border",
    "transition-all duration-300",
    "hover:scale-105",
    "hover:shadow-lg hover:shadow-primary/20",
    "hover:text-primary",
  );

  const mobileLiClasses = clsx(
    "px-4",
    "py-3",
    "text-lg",
    "font-medium",
    "hover:bg-card/50",
    "transition-all duration-300",
    "border-b",
    "border-border",
    "hover:text-primary",
  );

  return (
    <header
      className={clsx(
        "bg-background/95 border-border border-b backdrop-blur-sm",
        "text-foreground",
        "flex",
        "w-full",
        "items-center",
        "justify-between",
        "px-4 py-3 sm:px-6 sm:py-4",
        "relative",
        "animate-fade-in",
        "sticky top-0 z-50",
      )}
    >
      {/* Logo */}
      <Link href="/" className="animate-slide-in-left shrink-0">
        <div className="group flex flex-col items-center sm:flex-row sm:space-x-3">
          <svg
            aria-hidden="true"
            className="h-12 w-12 transition-all duration-300 group-hover:scale-110 sm:h-16 sm:w-16"
            viewBox="0 0 64 64"
            fill="none"
          >
            <rect x="10" y="14" width="44" height="10" rx="2" fill="#1B6AFF" />
            <rect x="14" y="28" width="36" height="10" rx="2" fill="#2780FF" />
            <rect x="18" y="42" width="28" height="10" rx="2" fill="#3B8CFF" />
          </svg>
          <span
            className={clsx(
              "text-center text-sm font-extrabold sm:text-left sm:text-lg",
              "transition-all duration-300",
              "group-hover:text-primary text-foreground",
              "mt-1 sm:mt-0",
              "from-primary to-secondary bg-linear-to-r bg-clip-text group-hover:text-transparent",
            )}
          >
            CORELAYER
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="animate-slide-in-right animation-delay-300 hidden items-center gap-4 lg:flex">
        <nav>
          <ul className="flex justify-around space-x-4 px-12">
            <li
              className={clsx(
                liClasses,
                "animate-fade-in-up animation-delay-400",
              )}
            >
              <Link href="/services">Serviços</Link>
            </li>
            <li
              className={clsx(
                liClasses,
                "animate-fade-in-up animation-delay-500",
              )}
            >
              <Link href="/portfolio">Portfólio</Link>
            </li>
            <li
              className={clsx(
                liClasses,
                "animate-fade-in-up animation-delay-600",
              )}
            >
              <Link href="/contact">Contato</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button and Theme Toggle */}
      <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
        <button
          onClick={toggleMenu}
          className="bg-card/50 hover:bg-card border-border focus:ring-primary animate-fade-in animation-delay-400 rounded-lg border p-2 transition-all duration-300 hover:scale-110 focus:ring-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="flex h-6 w-6 flex-col items-center justify-center">
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
                isMenuOpen ? "translate-y-1 rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
                isMenuOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={clsx(
                "bg-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
                isMenuOpen ? "-translate-y-1 -rotate-45" : "translate-y-1",
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "bg-background/95 border-border shadow-primary/10 absolute top-full left-0 z-50 w-full border-b shadow-xl backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav className="py-2">
          <ul className="flex flex-col">
            <li className={mobileLiClasses}>
              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                Serviços
              </Link>
            </li>
            <li className={mobileLiClasses}>
              <Link
                href="/portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                Portfólio
              </Link>
            </li>
            <li className={clsx(mobileLiClasses, "border-b-0")}>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay para fechar menu ao clicar fora (mobile) */}
      {isMenuOpen && (
        <div
          className="bg-background/50 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
