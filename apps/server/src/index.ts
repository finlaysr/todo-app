import express from 'express';
import tasksRouter from './routes/tasks.ts';
import cors from 'cors';

const app = express();
const PORT = 8080;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Main Page');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});