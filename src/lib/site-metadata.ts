const localFallbackUrl = "http://localhost:3000";

const normalizeUrl = (value: string) => value.replace(/\/$/, "");

const toHttpsUrl = (value?: string | null) => {
  if (!value) {
    return null;
  }

  return `https://${value}`;
};

const resolveCanonicalSiteUrl = () => {
  return normalizeUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      toHttpsUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
      toHttpsUrl(process.env.VERCEL_URL) ||
      localFallbackUrl,
  );
};

const resolveDeploymentUrl = () => {
  return normalizeUrl(
    toHttpsUrl(process.env.VERCEL_BRANCH_URL) ||
      toHttpsUrl(process.env.VERCEL_URL) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      localFallbackUrl,
  );
};

export const siteOwnerName = "Bruno Mulim";
export const siteTitle = "Bruno Mulim | Engenharia de produto e sistemas";
export const siteDescription =
  "Site pessoal e profissional em Next.js full-stack, preparado para evoluir com conteúdo público, área privada e ferramentas internas.";
export const siteKeywords = [
  "bruno mulim",
  "next.js full-stack",
  "engenharia de produto",
  "desenvolvimento web",
  "typescript",
  "tailwind css",
  "seo técnico",
];

export const siteUrl = resolveCanonicalSiteUrl();
export const siteOrigin = new URL(siteUrl);

export const deploymentUrl = resolveDeploymentUrl();
export const deploymentOrigin = new URL(deploymentUrl);

export const isVercelDeployment = process.env.VERCEL === "1";
export const vercelEnvironment = process.env.VERCEL_ENV ?? "development";
export const isPreviewDeployment =
  isVercelDeployment && vercelEnvironment !== "production";
export const isProductionDeployment =
  !isVercelDeployment || vercelEnvironment === "production";
export const shouldIndexSite = isProductionDeployment;

export const publicSitePaths = ["/", "/services", "/portfolio", "/blog", "/contact"];

export const buildAbsoluteUrl = (path: string) =>
  new URL(path, siteOrigin).toString();
