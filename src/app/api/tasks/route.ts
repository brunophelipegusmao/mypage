import type { NextRequest } from "next/server";

import {
  getApiOwnerIdentity,
  handleTaskRouteError,
  jsonNoStore,
  unauthorizedTaskResponse,
} from "@/app/api/tasks/_helpers";
import { routeCatalog } from "@/lib/navigation/app-routes";
import { taskService } from "@/services/tasks/task-service";
import { parseTaskEditorInput } from "@/services/tasks/task-validation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedTaskResponse();
  }

  try {
    const tasks = await taskService.listTasksByOwner(owner.id);

    return jsonNoStore(tasks);
  } catch (error) {
    return handleTaskRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  const owner = await getApiOwnerIdentity();

  if (!owner) {
    return unauthorizedTaskResponse();
  }

  try {
    const payload = parseTaskEditorInput(await request.json());
    const task = await taskService.createTask(owner.id, payload);

    return jsonNoStore(task, {
      status: 201,
      headers: {
        Location: routeCatalog.apiTask(task.id),
      },
    });
  } catch (error) {
    return handleTaskRouteError(error);
  }
}
