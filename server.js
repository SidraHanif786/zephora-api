const express = require("express");
const userRouter =require("./backend/router/userRouter.js");
const productRouter = require("./backend/router/products.js");
const categoryRouter = require("./backend/router/categories.js");
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./backend/db');
const { notFound, errorHandler } = require("./backend/middleware/errorMiddleware.js");
const cookieParser = require("cookie-parser");

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.get('/', (req, res)=>res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=>console.log(`App is listening at port ${port}`));



// POST /api/users         -Register a user
// POST /api/users/auth    -Authenticate a user nd get token
// POST /api/users/logout  -Logout user and clear cookies
// GET  /api/users/profile -Get user profile
// PUT  /api/users/profile -Update profile