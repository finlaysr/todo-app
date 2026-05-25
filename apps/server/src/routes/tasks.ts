import type { Todo_task_new, Todo_task, Todo_task_noID } from 'shared-types';
import { TasksDatabase } from '../TasksDatabase.ts';
import express from 'express';
import { Router } from 'express';
import type {Request, Response} from 'express';
import cors from 'cors';

const router: Router = Router();
router.use(express.json());
router.use(cors());

const tasksDB = new TasksDatabase();

// GET - return all tasks
router.get('/', (req: Request, res: Response) => {
  const tasks = tasksDB.getAllTasks();
  console.log('Returning tasks:', tasks);

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'List of tasks', tasks: tasks });
});

// GET by id - return a single task
router.get("/:id", (req: Request, res: Response) => {
  let taskId: number = Number(req.params.id);
  if (isNaN(taskId)) {
    console.error('Error parsing task ID:', req.params.id);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Getting task with ID:', taskId);

  const task = tasksDB.getTask(taskId);
  res.setHeader('Content-Type', 'application/json');
  if (!task) {
    res.status(404).json({ message: `Task with ID ${taskId} not found` });
    return;
  }
  res.json({ message: `Task with ID ${taskId} found`, task: task });
});

// POST - add a new task
router.post('/', (req: Request, res: Response) => {
  const newTaskReq: Todo_task_new = req.body;
  console.log('Received new task:', newTaskReq);

  tasksDB.addNewTask(newTaskReq);

  console.log('All tasks:', tasksDB.getAllTasks());
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Task created' });
});

// PUT - update whole task
router.put('/:id', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  let taskId: number = Number(req.params.id);
  if (isNaN(taskId)) {
    console.error('Error parsing task ID:', req.params.id);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Updating task with ID:', taskId);

  // Check if task exists
  if (!tasksDB.taskExists(taskId)) {
    res.status(404).json({ message: `Task with ID ${taskId} not found` });
    return;
  }
  const taskReq: Todo_task_noID = req.body;
  tasksDB.changeTask(taskId, taskReq);

  res.json({ message: `Task ${taskId} updated` });
});

// PATCH - update part of the task
router.patch("/:id", (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  let taskId: number = Number(req.params.id);
  if (isNaN(taskId)) {
    console.error('Error parsing task ID:', req.params.id);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Patching task with ID:', taskId);

  // Check if task exists
  if (!tasksDB.taskExists(taskId)) {
    res.status(404).json({ message: `Task with ID ${taskId} not found` });
    return;
  }

  const taskReq: Partial<Todo_task_noID> = req.body;
  console.log('Received task update:', taskReq);
  tasksDB.patchTask(taskId, taskReq);

  res.json({ message: `Task ${taskId} patched` });
});

// DELETE - delete a task
router.delete('/:id', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  let taskId: number = Number(req.params.id);
  if (isNaN(taskId)) {
    console.error('Error parsing task ID:', req.params.id);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Deleting task with ID:', taskId);

  // Check if task exists
  if (!tasksDB.taskExists(taskId)) {
    res.status(404).json({ message: `Task with ID ${taskId} not found` });
    return;
  }

  tasksDB.deleteTask(taskId);
  res.json({ message: `Task ${taskId} deleted` });
});

export default router;