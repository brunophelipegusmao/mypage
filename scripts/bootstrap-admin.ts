import "dotenv/config";

import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import { users } from "../src/db/schema/users";
import {
  assertOwnerEmail,
  assertOwnerPassword,
  resolveOwnerDisplayName,
} from "../src/lib/auth/owner-credentials";
import { hashPassword } from "../src/lib/auth/password";

const databaseUrl = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL_DIRECT or DATABASE_URL must be defined to bootstrap the administrator.",
  );
}

const adminEmail = assertOwnerEmail(process.env.ADMIN_EMAIL ?? "");
const adminPassword = assertOwnerPassword(process.env.ADMIN_PASSWORD ?? "");
const adminName = resolveOwnerDisplayName(process.env.ADMIN_NAME, adminEmail);

const bootstrapDb = drizzle({
  client: neon(databaseUrl),
  schema: {
    users,
  },
});

const run = async () => {
  const [existingAdminWithSameEmail] = await bootstrapDb
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(and(eq(users.isAdmin, true), eq(users.email, adminEmail)))
    .limit(1);

  const [existingDifferentAdmin] = await bootstrapDb
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.isAdmin, true))
    .limit(1);

  if (
    existingDifferentAdmin &&
    existingDifferentAdmin.email !== adminEmail &&
    existingDifferentAdmin.id !== existingAdminWithSameEmail?.id
  ) {
    throw new Error(
      `Another administrator already exists (${existingDifferentAdmin.email}). Refusing to create a second admin.`,
    );
  }

  const passwordHash = await hashPassword(adminPassword);

  const [existingUser] = await bootstrapDb
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);

  if (existingUser) {
    const [updatedAdmin] = await bootstrapDb
      .update(users)
      .set({
        name: adminName,
        passwordHash,
        isAdmin: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existingUser.id))
      .returning({
        id: users.id,
        email: users.email,
      });

    console.log(
      `Administrator updated successfully: ${updatedAdmin.email} (${updatedAdmin.id})`,
    );
    return;
  }

  const existingUsers = await bootstrapDb
    .select({
      id: users.id,
      email: users.email,
    })
    .from(users)
    .limit(2);

  if (!existingDifferentAdmin && existingUsers.length === 1) {
    const [promotedAdmin] = await bootstrapDb
      .update(users)
      .set({
        name: adminName,
        email: adminEmail,
        passwordHash,
        isAdmin: true,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existingUsers[0].id))
      .returning({
        id: users.id,
        email: users.email,
      });

    console.log(
      `Existing user promoted to administrator: ${promotedAdmin.email} (${promotedAdmin.id})`,
    );
    return;
  }

  if (!existingDifferentAdmin && existingUsers.length > 1) {
    throw new Error(
      "Multiple existing users were found without a configured admin. Refusing to guess which user owns the dashboard.",
    );
  }

  const [createdAdmin] = await bootstrapDb
    .insert(users)
    .values({
      name: adminName,
      email: adminEmail,
      passwordHash,
      isAdmin: true,
    })
    .returning({
      id: users.id,
      email: users.email,
    });

  console.log(
    `Administrator created successfully: ${createdAdmin.email} (${createdAdmin.id})`,
  );
};

run().catch((error) => {
  console.error("Failed to bootstrap the administrator.");
  console.error(error);
  process.exitCode = 1;
});
