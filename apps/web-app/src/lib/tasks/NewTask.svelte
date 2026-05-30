<script lang="ts">
    import { enhance } from "$app/forms";
    import { taskCache } from "$lib/tasks/taskCache.svelte";
</script>

<form
    method="POST"
    action="?/create"
    use:enhance={() => {
        return async ({ result, update }) => {
            if (result.type === "success") {
                taskCache.updateAllTasks();
                await update();
            }
        };
    }}
>
    <h2>Create New Task</h2>
    <div>
        <label for="title">Title:</label>
        <input
            type="text"
            id="title"
            name="title"
            style="max-width: 300px;"
            required
        />
    </div>
    <div>
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" />
    </div>
    <button type="submit">Create Task</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    h2 {
        margin-bottom: 0px;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    button {
        align-self: flex-start;
    }
</style>
