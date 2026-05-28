export async function deleteTask(taskID: number) {
    await fetch(`http://localhost:8080/api/tasks/${taskID}`, {
        method: "DELETE",
    })
        .catch((error) => {
            console.error("Error deleting task:", error);
        })
        .then(() => {
            console.log(`Task with id ${taskID} deleted successfully`);
        });
    window.location.reload();
}

export async function toggleTaskCompleted(
    taskID: number,
    current: boolean,
) {
    console.log(`Toggling completed status for task with id: ${taskID}`);
    console.log(`Current status: ${current}`);

    await fetch(`http://localhost:8080/api/tasks/${taskID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !current ? 1 : 0 }),
    });
    window.location.reload();
}