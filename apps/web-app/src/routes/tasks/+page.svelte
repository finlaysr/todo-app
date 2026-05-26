<script lang="ts">
    import type { PageProps } from "./$types";

    import type { Todo_task } from "shared-types";
    import TaskItem from "$lib/tasks/TaskItem.svelte";
    import NewTask from "$lib/tasks/NewTask.svelte";

    let { data }: PageProps = $props();
    let tasks: Todo_task[] = data.tasks || [];
</script>

<h2>All Tasks</h2>
<button onclick={() => window.location.reload()}>Refresh</button>
{#each tasks as task}
    <TaskItem {task}></TaskItem>
{/each}

<NewTask></NewTask>
