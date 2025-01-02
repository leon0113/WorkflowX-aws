import { Router } from "express";
import { getUsers, postUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/create-user', postUser);

export default userRouter;