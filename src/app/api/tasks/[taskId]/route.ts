import type { NextRequest } from "next/server";

import {
  getApiOwnerIdentity,
  handleTaskRouteError,
  jsonNoStore,
  unauthorizedTaskResponse,
} from "@/app/api/tasks/_helpers";
import { taskService } from "@/services/tasks/task-service";
import {
  parseTaskEditorInput,
  parseTaskId,
} from "@/services/tasks/task-validation";

type TaskRouteContext = {
  params: Promise<{
    taskId: string;
  }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(request: NextRequest, context: TaskRouteContext) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedTaskResponse();
  }

  try {
    const { taskId } = await context.params;
    const normalizedTaskId = parseTaskId(taskId);
    const payload = parseTaskEditorInput(await request.json());
    const task = await taskService.updateTask(owner.id, normalizedTaskId, payload);

    return jsonNoStore(task);
  } catch (error) {
    return handleTaskRouteError(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: TaskRouteContext,
) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedTaskResponse();
  }

  try {
    const { taskId } = await context.params;
    const normalizedTaskId = parseTaskId(taskId);

    await taskService.deleteTask(owner.id, normalizedTaskId);

    return jsonNoStore({ success: true });
  } catch (error) {
    return handleTaskRouteError(error);
  }
}
