import type { PageLoad } from "./$types";
import type { Todo_task, Todo_task_noID } from "shared-types";


export const load: PageLoad = async ({ fetch, params }) => {
    const res = await fetch("http://localhost:8080/api/tasks/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status !== 200) {
            console.error("Failed to load tasks");
            return;
        }
        const data = await res.json();
        console.log(data);
        return { tasks: data.tasks };
}
