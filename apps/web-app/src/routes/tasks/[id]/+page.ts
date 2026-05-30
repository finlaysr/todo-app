import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
  const taskID = Number(params.id);

  if (Number.isNaN(taskID)) {
    throw error(400, `Invalid task ID: ${params.id}`);
  }

  return { taskID };
};
