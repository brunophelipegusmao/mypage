import type { NextRequest } from "next/server";

import {
  getApiOwnerIdentity,
  handlePostRouteError,
  jsonNoStore,
  unauthorizedPostResponse,
} from "@/app/api/posts/_helpers";
import { postAdminService } from "@/services/posts/post-admin-service";
import {
  parsePostEditorInput,
  parsePostId,
} from "@/services/posts/post-validation";

type PostRouteContext = {
  params: Promise<{
    postId: string;
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_request: NextRequest, context: PostRouteContext) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedPostResponse();
  }

  try {
    const { postId } = await context.params;
    const normalizedPostId = parsePostId(postId);
    const post = await postAdminService.getPostById(owner.id, normalizedPostId);

    if (!post) {
      return jsonNoStore(
        { error: "Post não encontrado para o proprietário autenticado." },
        { status: 404 },
      );
    }

    return jsonNoStore(post);
  } catch (error) {
    return handlePostRouteError(error);
  }
}

export async function PATCH(request: NextRequest, context: PostRouteContext) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedPostResponse();
  }

  try {
    const { postId } = await context.params;
    const normalizedPostId = parsePostId(postId);
    const payload = parsePostEditorInput(await request.json());
    const post = await postAdminService.updatePost(
      owner.id,
      normalizedPostId,
      payload,
    );

    return jsonNoStore(post);
  } catch (error) {
    return handlePostRouteError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: PostRouteContext,
) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedPostResponse();
  }

  try {
    const { postId } = await context.params;
    const normalizedPostId = parsePostId(postId);

    await postAdminService.deletePost(owner.id, normalizedPostId);

    return jsonNoStore({ success: true });
  } catch (error) {
    return handlePostRouteError(error);
  }
}
