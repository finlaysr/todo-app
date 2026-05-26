<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Todo_task } from "shared-types";

    let { data }: PageProps = $props();
    let task: Todo_task = data.task;

    console.log("Page data:", task);
</script>

<h2>Task Details</h2>
<button onclick={() => window.location.reload()}>Refresh</button>
<h3>{task.title}</h3>
<p>{task.description}</p>
<p>Completed: {task.completed ? "Yes" : "No"}</p>
