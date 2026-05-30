import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { taskCache } from '$lib/tasks/taskCache.svelte';

// Called from create new task form
export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const title = data.get("title") as string;
        const description = data.get("description") as string;

        const res = await fetch(`http://localhost:8080/api/tasks/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description: description || "" }),
        });

        if (!res.ok) {
            return { success: false, message: "Failed to create task" };
        }

        return { success: true, message: "Task created successfully" };
    },
};
