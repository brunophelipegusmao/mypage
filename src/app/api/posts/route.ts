import type { NextRequest } from "next/server";

import {
  getApiOwnerIdentity,
  handlePostRouteError,
  jsonNoStore,
  unauthorizedPostResponse,
} from "@/app/api/posts/_helpers";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { postAdminService } from "@/services/posts/post-admin-service";
import { parsePostEditorInput } from "@/services/posts/post-validation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedPostResponse();
  }

  try {
    const posts = await postAdminService.listAllPostsByAuthor(owner.id);

    return jsonNoStore(posts);
  } catch (error) {
    return handlePostRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedPostResponse();
  }

  try {
    const payload = parsePostEditorInput(await request.json());
    const post = await postAdminService.createPost(owner.id, payload);

    return jsonNoStore(post, {
      status: 201,
      headers: {
        Location: routeCatalog.apiPost(post.id),
      },
    });
  } catch (error) {
    return handlePostRouteError(error);
  }
}
