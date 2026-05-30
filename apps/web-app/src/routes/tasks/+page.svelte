<script lang="ts">
    import TaskItem from "$lib/tasks/TaskItem.svelte";
    import NewTask from "$lib/tasks/NewTask.svelte";

    import { taskCache } from "$lib/tasks/taskCache.svelte";
    taskCache.init();
</script>

<h2>All Tasks</h2>

{#if taskCache.tasks.length > 0}
    {#each taskCache.tasks as task (task.id)}
        <TaskItem {task} />
    {/each}
{:else}
    <p>No tasks to display</p>
{/if}

<NewTask />
