import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isOwner?: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      isOwner: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string | null;
    isOwner?: boolean;
  }
}
