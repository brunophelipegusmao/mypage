"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import OwnerSignOutButton from "@/components/auth/OwnerSignOutButton";
import ThemeToggle from "@/components/ThemeToggle";
import {
  dashboardNavigation,
  routeCatalog,
} from "@/lib/navigation/app-routes";
import type { OwnerIdentity } from "@/types/auth";

type DashboardShellProps = {
  children: React.ReactNode;
  owner: OwnerIdentity;
};

const isActiveRoute = (pathname: string, href: string) => {
  if (href === routeCatalog.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function DashboardShell({
  children,
  owner,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-0 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-white/10 bg-card/40 p-6 lg:border-r lg:border-b-0">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-primary text-xs tracking-[0.18em] uppercase">
                Dashboard
              </p>
              <h1 className="mt-2 text-xl font-semibold">Área privada</h1>
              <p className="mt-2 text-sm text-foreground/65">
                Sessão ativa do proprietário para tarefas e administração do
                blog.
              </p>
              <p className="mt-3 text-xs text-foreground/55">{owner.email}</p>
            </div>
            <ThemeToggle />
          </div>

          <nav className="space-y-2">
            {dashboardNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "block rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  isActiveRoute(pathname, item.href)
                    ? "bg-primary text-primary-foreground"
                    : "border border-white/10 bg-white/5 text-foreground/80 hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-2 text-sm text-foreground/60">
            <p>URL pública privada: `/dashboard`</p>
            <p>Blog admin: `/dashboard/blog`</p>
            <p>To-do privado: `/dashboard/todo`</p>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap gap-3">
              <Link
                href={routeCatalog.home}
                className="inline-flex rounded-lg border border-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/5"
              >
                Voltar ao site
              </Link>
              <OwnerSignOutButton />
            </div>
          </div>
        </aside>

        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
