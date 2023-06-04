const { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } = require("../controller/userController");
const express=require('express');

const userRouter = express.Router();
userRouter.post('/', registerUser); 
userRouter.post('/auth', authUser);
userRouter.post('/logout', logoutUser);
userRouter.route('/profile').get(getUserProfile).put(updateUserProfile);

module.exports = userRouter;

// POST /api/users         -Register a user
// POST /api/users/auth    -Authenticate a user nd get token
// POST /api/users/logout  -Logout user and clear cookies
// GET  /api/users/profile -Get user profile
// PUT  /api/users/profile -Update profile