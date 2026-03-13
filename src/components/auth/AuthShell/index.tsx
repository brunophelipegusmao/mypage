import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { routeCatalog } from "@/lib/navigation/app-routes";

type AuthShellProps = {
  children: React.ReactNode;
};

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-primary text-xs tracking-[0.18em] uppercase">
              Acesso do proprietário
            </p>
            <p className="text-sm text-foreground/70">
              Entrada dedicada ao dashboard privado
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={routeCatalog.home}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/5"
            >
              Voltar ao site
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
