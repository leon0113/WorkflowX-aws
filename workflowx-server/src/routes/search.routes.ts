import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/task.controller";
import { search } from "../controllers/search.controller";

const searchRouter = Router();

searchRouter.get('/', search);

export default searchRouter;