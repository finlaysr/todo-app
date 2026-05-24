import type { Todo_task_new, Todo_task } from 'shared-types';
import { TasksDatabase } from '../TasksDatabase.ts';
import express from 'express';
import { Router } from 'express';

const router: Router = Router();
router.use(express.json());

const tasksDB = new TasksDatabase();

// GET - return all tasks
router.get('/', (req, res) => {
  const tasks = tasksDB.getAllTasks();
  console.log('Returning tasks:', tasks);

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'List of tasks', tasks: tasks });
});

// GET by id - return a single task
router.get("/:id", (req, res) => {
  let taskId: number;
  try {
    taskId = Number(req.params.id);
  }
  catch (error) {
    console.error('Error parsing task ID:', error);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Updating task with ID:', taskId);

  tasksDB.getTask(taskId);

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Task found', task: tasksDB.getTask(taskId) });
});

// POST - add a new task
router.post('/', (req, res) => {
  const newTaskReq: Todo_task_new = req.body;
  console.log('Received new task:', newTaskReq);

  tasksDB.addNewTask(newTaskReq);

  console.log('All tasks:', tasksDB.getAllTasks());
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Task created', tasks: tasksDB.getAllTasks() });
});

// PUT - update whole task
router.put('/:id', (req, res) => {
  let taskId: number;
  try {
    taskId = Number(req.params.id);
  }
  catch (error) {
    console.error('Error parsing task ID:', error);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Updating task with ID:', taskId);

  const taskReq: Todo_task = req.body;
  tasksDB.changeTask(taskId, taskReq);

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Task updated', tasks: tasksDB.getAllTasks() });
});

// DELETE - delete a task
router.delete('/:id', (req, res) => {
  let taskId: number;
  try {
    taskId = Number(req.params.id);
  }
  catch (error) {
    console.error('Error parsing task ID:', error);
    res.status(400).json({ message: 'Invalid task ID' });
    return;
  }
  console.log('Deleting task with ID:', taskId);

  tasksDB.deleteTask(taskId);
  
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Task deleted', tasks: tasksDB.getAllTasks() });
});

export default router;