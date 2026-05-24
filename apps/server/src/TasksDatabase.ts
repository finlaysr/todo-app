import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Todo_task, Todo_task_new } from 'shared-types';

const databasePath = fileURLToPath(new URL('../db/data.db', import.meta.url));

class TasksDatabase {
    private db = new Database(databasePath, { verbose: console.log });

    constructor() {
        mkdirSync(dirname(databasePath), { recursive: true });

        // Create tasks table if it doesn't exist
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS "tasks" (
                "id"	INTEGER NOT NULL UNIQUE,
                "title"	TEXT NOT NULL,
                "description"	TEXT,
                "completed"	INTEGER NOT NULL DEFAULT 0 CHECK("completed" IN (0,1)),
                PRIMARY KEY("id" AUTOINCREMENT)
            );`).run();
    }

    getAllTasks() {
        return this.db.prepare('SELECT * FROM "tasks"').all();
    }

    getTask(taskID: number) {
        return this.db.prepare('SELECT * FROM "tasks" WHERE id = ?').get(taskID);
    }

    addNewTask(newTask: Todo_task_new) {
        this.db.prepare('INSERT INTO "tasks" (title, description) VALUES (?, ?)').run(
            newTask.title,
            newTask.description
        );
    }

    changeTask(taskID: number, updatedTask: Todo_task) {
        this.db.prepare('UPDATE "tasks" SET title = ?, description = ?, completed = ? WHERE id = ?').run(
            updatedTask.title,
            updatedTask.description,
            Number(updatedTask.completed),
            taskID
        );
    }

    deleteTask(taskID: number) {
        this.db.prepare('DELETE FROM "tasks" WHERE id = ?').run(taskID);
    }
}

export { TasksDatabase };