const { authUser } = require("../controller/userController");
const express=require('express');

const userRouter = express.Router();
userRouter.post('/auth', authUser);

module.exports = userRouter;