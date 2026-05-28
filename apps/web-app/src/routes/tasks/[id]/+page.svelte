<script lang="ts">
    import type { PageProps } from "./$types";
    import type { Todo_task } from "shared-types";
    import { deleteTask, toggleTaskCompleted } from "$lib/tasks/taskActions";

    let { data }: PageProps = $props();
    let task: Todo_task = data.task;

    console.log("Page data:", task);
</script>

<h2>Task Details</h2>
<h3>{task.title}</h3>
<p>{task.description}</p>
<p>Completed: {task.completed ? "Yes" : "No"}</p>
<button
    onclick={(_) => {
        toggleTaskCompleted(task.id, task.completed);
    }}
    id="toggle-task"
>
    Mark as {task.completed ? "Incomplete" : "Complete"}
</button>
<button
    onclick={(_) => {
        deleteTask(task.id);
    }}
    id="delete-task"
>
    Delete Task
</button>
