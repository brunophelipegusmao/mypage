"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";
import { publicSiteNavigation, routeCatalog } from "@/lib/navigation/app-routes";

const isActiveRoute = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const menuVariants = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.24, ease: [0.2, 0.9, 0.3, 1] as const },
      };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
        <Link href={routeCatalog.home} className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-transparent" />
            <div className="relative space-y-1">
              <span className="block h-[3px] w-6 rounded-full bg-primary" />
              <span className="block h-[3px] w-5 rounded-full bg-primary/80" />
              <span className="block h-[3px] w-4 rounded-full bg-primary/60" />
            </div>
          </div>

          <div>
            <p className="text-sm leading-tight font-semibold tracking-[0.24em] text-primary uppercase">
              Bruno Mulim
            </p>
            <p className="text-foreground/65 group-hover:text-foreground/90 text-xs transition-colors">
              Next.js full-stack, produto e estrutura limpa.
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 lg:flex">
          <nav>
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-card/55 p-1">
              {publicSiteNavigation.map((item, index) => {
                const isActive = isActiveRoute(pathname, item.href);

                return (
                  <motion.li
                    key={item.href}
                    initial={
                      shouldReduceMotion ? undefined : { opacity: 0, y: -8 }
                    }
                    animate={
                      shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : { duration: 0.45, delay: 0.05 + index * 0.06 }
                    }
                  >
                    <Link
                      href={item.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(27,106,255,0.45)]"
                          : "text-foreground/80 hover:bg-white/10 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-card/60 transition-colors hover:bg-card"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.nav
              className="relative z-50 border-t border-white/10 bg-background/95 lg:hidden"
              {...menuVariants}
            >
              <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3">
                {publicSiteNavigation.map((item) => {
                  const isActive = isActiveRoute(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-card/30 text-foreground/85 hover:bg-card/60"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
            <button
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
