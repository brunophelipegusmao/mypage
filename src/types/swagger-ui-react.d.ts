declare module "swagger-ui-react" {
  import type { ComponentType } from "react";

  export interface SwaggerUIProps {
    url?: string;
    spec?: Record<string, unknown>;
    deepLinking?: boolean;
    defaultModelsExpandDepth?: number;
    displayRequestDuration?: boolean;
    docExpansion?: "list" | "full" | "none";
    filter?: boolean | string;
    persistAuthorization?: boolean;
  }

  const SwaggerUI: ComponentType<SwaggerUIProps>;

  export default SwaggerUI;
}
