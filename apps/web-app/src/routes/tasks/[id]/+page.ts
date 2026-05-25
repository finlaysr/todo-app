import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
    console.log("Loading task with ID:", params.id);
    const res = await fetch(`http://localhost:8080/api/tasks/${params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        console.error("Failed to load task with id: ", params.id, "Status:", res.status);
        return;
    }
    const data = await res.json();
    const task = data.task;
    console.log(task);
    return { task: task };
};
