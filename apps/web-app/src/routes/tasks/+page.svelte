<script lang="ts">
    import type { PageProps } from "./$types";

    import type { Todo_task } from "shared-types";
    import TaskItem from "$lib/tasks/TaskItem.svelte";

    let { data }: PageProps = $props();
    let tasks: Todo_task[] = data.tasks;
</script>

<h1>All Tasks</h1>
{#each tasks as task}
    <TaskItem {task}></TaskItem>
{/each}
