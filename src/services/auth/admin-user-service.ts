import "server-only";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import {
  normalizeOwnerEmail,
  resolveOwnerDisplayName,
} from "@/lib/auth/owner-credentials";
import type { OwnerIdentity } from "@/types/auth";

type AdminUserRecord = {
  id: string;
  name: string | null;
  email: string;
  passwordHash: string | null;
  isAdmin: boolean;
};

const adminUserColumns = {
  id: users.id,
  name: users.name,
  email: users.email,
  passwordHash: users.passwordHash,
  isAdmin: users.isAdmin,
};

export const adminUserService = {
  async findAdminByEmail(email: string): Promise<AdminUserRecord | null> {
    const normalizedEmail = normalizeOwnerEmail(email);
    const [adminUser] = await db
      .select(adminUserColumns)
      .from(users)
      .where(and(eq(users.email, normalizedEmail), eq(users.isAdmin, true)))
      .limit(1);

    return adminUser ?? null;
  },
  async getAdminIdentityById(userId: string): Promise<OwnerIdentity | null> {
    const [adminUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(and(eq(users.id, userId), eq(users.isAdmin, true)))
      .limit(1);

    if (!adminUser) {
      return null;
    }

    return {
      id: adminUser.id,
      name: resolveOwnerDisplayName(adminUser.name, adminUser.email),
      email: adminUser.email,
    };
  },
};
