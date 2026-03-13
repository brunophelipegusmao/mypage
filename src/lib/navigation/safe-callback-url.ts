import { routeCatalog } from "@/lib/navigation/app-routes";
import {
  deploymentOrigin,
  siteOrigin,
} from "@/lib/site-metadata";

const trustedOrigins = new Set([siteOrigin.origin, deploymentOrigin.origin]);

export const resolveSafeCallbackUrl = (
  candidate: string | undefined,
  fallback = routeCatalog.dashboard,
) => {
  if (!candidate) {
    return fallback;
  }

  const normalizedCandidate = candidate.trim();

  if (!normalizedCandidate) {
    return fallback;
  }

  if (normalizedCandidate.startsWith("/")) {
    return normalizedCandidate;
  }

  try {
    const parsedUrl = new URL(normalizedCandidate);

    if (!trustedOrigins.has(parsedUrl.origin)) {
      return fallback;
    }

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}` || fallback;
  } catch {
    return fallback;
  }
};
