import type { Session } from "next-auth";

import type { OwnerIdentity, OwnerSession } from "@/types/auth";

type AuthorizedOwnerSession = Session & {
  user: NonNullable<Session["user"]> & {
    id: string;
    email: string;
    isOwner: true;
  };
};

export const isAuthorizedOwnerSession = (
  session: Session | null,
): session is AuthorizedOwnerSession =>
  Boolean(
    session?.user?.email &&
      session.user.id &&
      session.user.isOwner === true,
  );

export const toOwnerSession = (owner: OwnerIdentity | null): OwnerSession => ({
  status: owner ? "authenticated" : "unauthenticated",
  owner,
});
