import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { verifyPassword } from "@/lib/auth/password";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { adminUserService } from "@/services/auth/admin-user-service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routeCatalog.login,
    error: routeCatalog.login,
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string" ? credentials.email : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!email || !password) {
          return null;
        }

        const adminUser = await adminUserService.findAdminByEmail(email);

        if (!adminUser?.passwordHash || !adminUser.isAdmin) {
          return null;
        }

        const validPassword = await verifyPassword(
          password,
          adminUser.passwordHash,
        );

        if (!validPassword) {
          return null;
        }

        return {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name ?? adminUser.email,
          isOwner: true,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isOwner = user.isOwner === true;
      }

      if (
        token.isOwner !== true ||
        typeof token.sub !== "string" ||
        typeof token.email !== "string"
      ) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      const email = typeof token.email === "string" ? token.email : "";
      const name =
        typeof token.name === "string" ? token.name : email;

      session.user = {
        ...session.user,
        id: typeof token.sub === "string" ? token.sub : "",
        email,
        name,
        isOwner: token.isOwner === true,
      };

      return session;
    },
  },
});
