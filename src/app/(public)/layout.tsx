import PublicSiteShell from "@/components/public/PublicSiteShell";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <PublicSiteShell>{children}</PublicSiteShell>;
}
