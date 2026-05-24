import express from 'express';
import tasksRouter from './routes/tasks.ts';

const app = express();
const PORT = 8080;

app.use('/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Main Page');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});