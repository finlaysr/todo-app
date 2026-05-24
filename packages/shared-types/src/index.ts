// Exact representation of task in database
export interface Todo_task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Required fields to create a new task
export interface Todo_task_new {
  title: string;
  description: string;
}

// Used to update a task
export interface Todo_task_noID {
  title: string;
  description: string;
  completed: boolean;
}