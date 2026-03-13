import Header from "@/components/Header";

type PublicSiteShellProps = {
  children: React.ReactNode;
};

export default function PublicSiteShell({
  children,
}: PublicSiteShellProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
