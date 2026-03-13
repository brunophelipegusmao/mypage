export type ApiSurfaceStatus = "reserved" | "implemented";

export interface OpenApiSurfaceArea {
  tag: "auth" | "contact" | "posts" | "tasks" | "health";
  publicRoute: string;
  apiRoute: string;
  status: ApiSurfaceStatus;
  summary: string;
}
