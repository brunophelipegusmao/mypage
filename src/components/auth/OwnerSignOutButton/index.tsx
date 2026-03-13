"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTransition } from "react";

import { routeCatalog } from "@/lib/navigation/app-routes";

export default function OwnerSignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await signOut({ redirectTo: routeCatalog.login });
        })
      }
      disabled={isPending}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "Saindo..." : "Encerrar sessão"}
    </button>
  );
}
