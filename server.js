const express = require("express");
const userRouter =require("./backend/routes/userRouter.js");
const dotenv = require('dotenv');
const { notFound, errorHandler } = require("./backend/middleware/errorMiddleware.js");

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/users', userRouter);

app.get('/', (req, res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=>console.log(`App is listening at port ${port}`));
