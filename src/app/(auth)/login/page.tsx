import type { Metadata } from "next";
import { redirect } from "next/navigation";

import CredentialsSignInForm from "@/components/auth/CredentialsSignInForm";
import RouteScaffold from "@/components/RouteScaffold";
import { getOwnerIdentity } from "@/lib/auth/owner-session";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { resolveSafeCallbackUrl } from "@/lib/navigation/safe-callback-url";
import { buildAbsoluteUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Entrada reservada para autenticação do proprietário via Auth.js Credentials e sessão JWT.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Login | Bruno Mulim",
    description:
      "Rota reservada para autenticação privada do proprietário com login e senha.",
    url: buildAbsoluteUrl("/login"),
  },
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const getSearchParamValue = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

const getLoginErrorMessage = (error?: string) => {
  if (!error) {
    return null;
  }

  if (error === "CredentialsSignin") {
    return "Email ou senha inválidos.";
  }

  return "Não foi possível autenticar o proprietário com segurança. Tente novamente.";
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const owner = await getOwnerIdentity();
  const params = await searchParams;
  const callbackUrl = resolveSafeCallbackUrl(
    getSearchParamValue(params.callbackUrl),
  );
  const errorMessage = getLoginErrorMessage(getSearchParamValue(params.error));

  if (owner) {
    redirect(routeCatalog.dashboard);
  }

  return (
    <div className="px-4 py-10 md:py-14">
      <RouteScaffold
        eyebrow="Auth"
        title="Entrada do proprietário"
        description="O login existe apenas para o proprietário. A autenticação agora usa credenciais próprias, senha com hash seguro, sessão JWT e proteção server-side do dashboard."
        tags={["Login único do proprietário", "Credentials", "JWT"]}
        checklist={[
          "Login e senha sem OAuth e sem cadastro público.",
          "Sessão JWT lida e validada no servidor.",
          "Dashboard privado protegido sem depender só do cliente.",
        ]}
        note="Leitores do blog não usam esta rota. O dashboard continua reservado apenas ao proprietário."
      />

      <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-white/10 bg-card/45 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.24)] md:p-8">
        <p className="text-sm leading-relaxed text-foreground/70">
          Use o email e a senha do administrador para entrar na área privada em
          {" "}
          <code>/dashboard</code>.
        </p>

        <div className="mt-6 max-w-xl">
          <CredentialsSignInForm
            redirectTo={callbackUrl}
            initialError={errorMessage}
          />
        </div>
      </div>
    </div>
  );
}
