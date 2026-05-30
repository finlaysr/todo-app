<script lang="ts">
    import type { Todo_task } from "shared-types";
    import type { PageProps } from "./$types";
    import { taskCache } from "$lib/tasks/taskCache.svelte";
    import { onMount } from "svelte";

    let { data }: PageProps = $props();
    let taskID = $derived(data.taskID);

    taskCache.init();
    let task = $derived(taskCache.getTaskWithID(taskID));
</script>

<h2>Task Details</h2>
{#if task}
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <p>Completed: {task.completed ? "Yes" : "No"}</p>
    <button
        onclick={async () => {
            if (!task) return;
            await taskCache.toggleTaskCompleted(task.id, task.completed);
        }}
        id="toggle-task"
    >
        Mark as {task.completed ? "Incomplete" : "Complete"}
    </button>
    <button
        onclick={async () => {
            if (!task) return;
            await taskCache.deleteTask(task.id);
            window.location.href = "/tasks";
        }}
        id="delete-task"
    >
        Delete Task
    </button>
{:else}
    <p>Loading task...</p>
{/if}
