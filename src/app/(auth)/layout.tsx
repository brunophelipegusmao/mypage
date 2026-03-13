import AuthShell from "@/components/auth/AuthShell";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <AuthShell>{children}</AuthShell>;
}
