import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  isAuthorizedOwnerSession,
  toOwnerSession,
} from "@/lib/auth/owner-access";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { adminUserService } from "@/services/auth/admin-user-service";

export const getOwnerIdentity = async () => {
  const session = await auth();

  if (!isAuthorizedOwnerSession(session)) {
    return null;
  }

  const persistedOwner = await adminUserService.getAdminIdentityById(
    session.user.id,
  );

  return persistedOwner;
};

export const getOwnerSession = async () =>
  toOwnerSession(await getOwnerIdentity());

export const requireOwnerSession = async () => {
  const session = await auth();

  if (!isAuthorizedOwnerSession(session)) {
    redirect(routeCatalog.login);
  }

  const persistedOwner = await adminUserService.getAdminIdentityById(
    session.user.id,
  );

  if (!persistedOwner) {
    redirect(routeCatalog.login);
  }

  return session;
};

export const requireOwnerIdentity = async () => {
  const owner = await getOwnerIdentity();

  if (!owner) {
    redirect(routeCatalog.login);
  }

  return owner;
};
