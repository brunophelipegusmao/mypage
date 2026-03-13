"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";

import Button from "@/components/Button";
import { Input, Label } from "@/components/Input";
import { normalizeOwnerEmail } from "@/lib/auth/owner-credentials";
import { routeCatalog } from "@/lib/navigation/app-routes";

type CredentialsSignInFormProps = {
  redirectTo?: string;
  initialError?: string | null;
};

const invalidCredentialsMessage = "Email ou senha inválidos.";
const genericAuthErrorMessage =
  "Não foi possível autenticar o proprietário com segurança. Tente novamente.";

export default function CredentialsSignInForm({
  redirectTo = routeCatalog.dashboard,
  initialError = null,
}: CredentialsSignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(initialError);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    startTransition(async () => {
      const response = await signIn("credentials", {
        email: normalizeOwnerEmail(email),
        password,
        redirect: false,
        redirectTo,
      });

      if (response?.ok && response.url) {
        router.replace(response.url);
        router.refresh();
        return;
      }

      if (response?.error === "CredentialsSignin") {
        setFormError(invalidCredentialsMessage);
        return;
      }

      setFormError(genericAuthErrorMessage);
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {formError ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
          {formError}
        </div>
      ) : null}

      <div>
        <Label htmlFor="owner-email" required>
          Email do proprietário
        </Label>
        <Input
          id="owner-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <Label htmlFor="owner-password" required>
          Senha
        </Label>
        <Input
          id="owner-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite a senha do administrador"
          required
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        className="inline-flex items-center gap-2"
        disabled={isPending}
      >
        <LogIn className="h-4 w-4" />
        {isPending ? "Entrando..." : "Entrar no dashboard"}
      </Button>
    </form>
  );
}
