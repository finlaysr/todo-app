<script lang="ts">
    import type { Todo_task } from "shared-types";
    import binIcon from "$lib/assets/bin.svg";
    import checkbox_complete from "$lib/assets/checkbox-complete.svg";
    import checkbox_empty from "$lib/assets/checkbox-empty.svg";

    import { taskCache } from "$lib/tasks/taskCache.svelte";
    let { task }: { task: Todo_task } = $props();
</script>

<a href={`/tasks/${task.id}`}>
    <div>
        <button
            onclick={async (e) => {
                e.preventDefault();
                await taskCache.toggleTaskCompleted(
                    task.id,
                    task?.completed || false,
                );
            }}
            >{#if task?.completed}
                <img
                    src={checkbox_complete}
                    alt="Mark as Incomplete"
                    height="30px"
                />
            {:else}
                <img
                    src={checkbox_empty}
                    alt="Mark as Complete"
                    height="30px"
                />
            {/if}
        </button>

        <h3>{task?.title}</h3>
        <p>{task?.description}</p>

        <button
            onclick={async (e) => {
                e.preventDefault();
                await taskCache.deleteTask(task.id);
            }}
            id="delete-task"
        >
            <img src={binIcon} alt="Delete Task" height="30px" width="auto" />
        </button>
    </div>
</a>

<style>
    a:hover {
        background-color: #f0f0f0;
    }

    div {
        border-radius: 10px;
        background-color: #fcd6a0;
        padding: 5px 20px;
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        min-width: fit-content;
    }
    div:hover {
        background-color: #ffecd0;
    }

    #delete-task {
        cursor: pointer;
        margin-left: auto;
    }
</style>
