import DashboardShell from "@/components/dashboard/DashboardShell";
import { requireOwnerIdentity } from "@/lib/auth/owner-session";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const owner = await requireOwnerIdentity();

  return <DashboardShell owner={owner}>{children}</DashboardShell>;
}
