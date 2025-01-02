import { Router } from "express";
import { getUser, getUsers, postUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:cognitoId', getUser);
userRouter.post('/create-user', postUser);

export default userRouter;