export type OwnerSessionStatus =
  | "authenticated"
  | "unauthenticated"
  | "unknown";

export interface OwnerIdentity {
  id: string;
  name: string;
  email: string;
}

export interface OwnerSession {
  status: OwnerSessionStatus;
  owner: OwnerIdentity | null;
}
