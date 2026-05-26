<script lang="ts">
    import type { Todo_task } from "shared-types";
    let { task }: { task: Todo_task } = $props();

    // import { toggleTaskCompleted } from "$lib/toggleTaskCompleted";
    export async function toggleTaskCompleted(
        taskID: number,
        current: boolean,
    ) {
        console.log(`Toggling completed status for task with id: ${taskID}`);
        console.log(`Current status: ${current}`);

        await fetch(`http://localhost:8080/api/tasks/${taskID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !current ? 1 : 0 }),
        });
    }
</script>

<a href={`/tasks/${task.id}`}>
    <div>
        <button
            onclick={(e) => {
                e.preventDefault();
                toggleTaskCompleted(task.id, task.completed);
            }}>{task.completed ? "Completed" : "Uncompleted"}</button
        >

        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Completed: {task.completed ? "Yes" : "No"}</p>
    </div>
</a>

<style>
    a {
        text-decoration: none;
        color: inherit;
    }
    a:hover {
        background-color: #f0f0f0;
    }

    div {
        border-radius: 10px;
        background-color: #fcd6a0;
        padding: 5px 20px;
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
    }
    div:hover {
        background-color: #ffecd0;
    }
</style>
