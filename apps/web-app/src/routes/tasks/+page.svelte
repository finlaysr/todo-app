<script lang="ts">
    import type { Todo_task, Todo_task_noID } from 'shared-types';

    let tasks: Todo_task[] = $state([]);
    async function loadAll() {
        const res = await fetch("http://localhost:8080/tasks/", {
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
        tasks = data.tasks;
    }
    
</script>

<button onclick={loadAll}>Load Tasks </button>

{#each tasks as task}
    <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Completed: {task.completed ? "Yes" : "No"}</p>
    </div>
{/each}