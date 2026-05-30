import type { Todo_task } from "shared-types";
import { browser } from "$app/environment";
import { onMount } from "svelte";

const STORAGE_KEY = "TaskCache";
const TASKS_API_URL = "http://localhost:8080/api/tasks";

class TaskCache {
    tasks = $state<Todo_task[]>([]);

    init() {
        onMount(() => {
            console.log("TaskCache onMount called");
            if (browser) {
                this.tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            } else {
                console.warn("TaskCache: Not running in browser, cannot initialize from localStorage");
            }
        });
    }

    getTaskWithID(id: number): Todo_task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    async updateAllTasks() {
        const res = await fetch(TASKS_API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            console.log("Failed to fetch updated tasks");
            return;
        }
        const data = await res.json();
        this.tasks = data.tasks;
        if (browser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
        } else {
            console.warn("TaskCache: Not running in browser, cannot save to localStorage");
        }
    }

    async deleteTask(taskID: number) {
        await fetch(`${TASKS_API_URL}/${taskID}`, {
            method: "DELETE",
        })
            .catch((error) => {
                console.error("Error deleting task:", error);
            })
            .then(() => {
                console.log(`Task with id ${taskID} deleted successfully`);
            });

        await this.updateAllTasks();
    }

    async toggleTaskCompleted(taskID: number, current: boolean) {
        console.log(`Toggling completed status for task with id: ${taskID}`);
        console.log(`Current status: ${current}`);

        await fetch(`${TASKS_API_URL}/${taskID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !current ? 1 : 0 }),
        });
        await this.updateAllTasks();
    }
}

export const taskCache = new TaskCache();
