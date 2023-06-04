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



// POST /api/users         -Register a user
// POST /api/users/auth    -Authenticate a user nd get token
// POST /api/users/logout  -Logout user and clear cookies
// GET  /api/users/profile -Get user profile
// PUT  /api/users/profile -Update profile