import { Router } from "express";
import { createTask, getTasks, getUserTasks, updateTaskStatus } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/', getTasks);
taskRouter.post('/', createTask);
taskRouter.patch('/:taskId/status', updateTaskStatus);
taskRouter.get('/user/:userId', getUserTasks);

export default taskRouter;