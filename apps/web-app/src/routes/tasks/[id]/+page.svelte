<script lang="ts">
    import type { PageProps } from "./$types";
    let { data }: PageProps = $props();
    console.log("Page data:", data.task);
</script>

<h1>Task Details</h1>
<h2>{data.task.title}</h2>
<p>{data.task.description}</p>
<p>Completed: {data.task.completed ? "Yes" : "No"}</p>
