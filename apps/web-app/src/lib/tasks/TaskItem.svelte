<script lang="ts">
    import type { Todo_task } from "shared-types";
    let { task } = $props();
</script>

<a href={`/tasks/${task.id}`}>
    <div>
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
    }
    div:hover {
        background-color: #ffecd0;
    }
</style>
