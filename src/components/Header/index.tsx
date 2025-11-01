"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "./logo.svg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const liClasses = clsx(
    "px-3",
    "py-2",
    "rounded-md",
    "text-lg",
    "font-medium",
    "hover:bg-primary/20",
    "transition-colors",
    "transition-shadow text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
    "hover:text-shadow-[0_4px_8px_rgba(0,0,0,0.7)]",
  );

  const mobileLiClasses = clsx(
    "px-4",
    "py-3",
    "text-lg",
    "font-medium",
    "hover:bg-primary/20",
    "transition-colors",
    "border-b",
    "border-primary-foreground/20",
  );

  return (
    <header
      className={clsx(
        "bg-primary",
        "text-primary-foreground",
        "flex",
        "w-full",
        "items-center",
        "justify-between",
        "p-4",
        "relative",
      )}
    >
      {/* Logo */}
      <Link href="/" className="shrink-0">
        <div className="flex flex-col items-center sm:flex-row sm:space-x-3">
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            className="sm:h-20 sm:w-20"
          />
          <span
            className={clsx(
              "sm:text-md text-center text-sm font-extrabold sm:text-left",
              "transition-shadow text-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
              "hover:text-shadow-[0_4px_8px_rgba(0,0,0,0.7)]",
              "mt-1 sm:mt-0",
            )}
          >
            BRUNO GUSMÃO MULIM
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <nav>
          <ul className="flex justify-around space-x-4 px-12">
            <li className={liClasses}>
              <Link href="/services">Serviços</Link>
            </li>
            <li className={liClasses}>
              <Link href="/portfolio">Portfólio</Link>
            </li>
            <li className={liClasses}>
              <Link href="/contact">Contato</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="hover:bg-primary/20 focus:ring-primary-foreground/50 rounded-md p-2 transition-colors focus:ring-2 focus:outline-none lg:hidden"
        aria-label="Toggle menu"
      >
        <div className="flex h-6 w-6 flex-col items-center justify-center">
          <span
            className={clsx(
              "bg-primary-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
              isMenuOpen ? "translate-y-1 rotate-45" : "-translate-y-1",
            )}
          />
          <span
            className={clsx(
              "bg-primary-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
              isMenuOpen ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={clsx(
              "bg-primary-foreground block h-0.5 w-6 transition-all duration-300 ease-out",
              isMenuOpen ? "-translate-y-1 -rotate-45" : "translate-y-1",
            )}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "bg-primary absolute top-full left-0 z-50 w-full shadow-lg transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 transform opacity-100"
            : "invisible -translate-y-2 transform opacity-0",
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
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
