import type { Todo_task_new } from 'shared-types';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { Router } from 'express';

import Database from 'better-sqlite3';

const router: Router = Router();
router.use(express.json());

const databasePath = fileURLToPath(new URL('../../db/data.db', import.meta.url));
mkdirSync(dirname(databasePath), { recursive: true });
const db = new Database(databasePath, { verbose: console.log });
// Create tasks table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS "tasks" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT NOT NULL,
	"description"	TEXT,
	"completed"	INTEGER NOT NULL DEFAULT 0 CHECK("completed" IN (0,1)),
	PRIMARY KEY("id" AUTOINCREMENT)
);`).run();

// GET - return all tasks
router.get('/', (req, res) => {
  const tasks = db.prepare('SELECT * FROM "tasks"').all();

  console.log('Returning tasks:', tasks);
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'List of tasks', tasks: tasks });
});

// POST - add a new task
router.post('/', (req, res) => {
  const newTaskReq: Todo_task_new = req.body;
  console.log('Received new task:', newTaskReq);

  db.prepare('INSERT INTO "tasks" (title, description, completed) VALUES (?, ?, ?)').run(
    newTaskReq.title,
    newTaskReq.description,
    0
  );

  const tasks = db.prepare('SELECT * FROM "tasks"').all();
  console.log('All tasks:', tasks);

  res.json({ message: 'Task created', tasks: tasks });
});

export default router;