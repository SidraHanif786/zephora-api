import { authUser } from "../controller/userController";
import express from 'express';

const userRouter = express.Router();
userRouter.post('/auth', authUser);

export default userRouter;