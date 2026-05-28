import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

// Create a new task
export const actions: Actions = {
    create: async ({ request }) => {
        const data = await request.formData();
        const title = data.get("title") as string;
        const description = data.get("description") as string;

        await fetch(`http://localhost:8080/api/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        throw redirect(303, '/tasks');
        window.location.reload();
    },
};
