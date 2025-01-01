import { Router } from "express";
import { createProject, getProjects, getSingleProject } from "../controllers/project.controller";

const projectRouter = Router();

projectRouter.get('/', getProjects);
projectRouter.get('/:id', getSingleProject);
projectRouter.post('/', createProject);

export default projectRouter;