import express from "express";
import dotenv from 'dotenv';
// import { authUser } from "./backend/controller/userController.js";
import userRouter from "./backend/routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// app.post('/api/users', authUser);
app.use('/api/users', userRouter);

app.get('/', (req, res)=>res.send('Server is ready'));
app.listen(port, ()=>console.log(`App is listening at port ${port}`));


