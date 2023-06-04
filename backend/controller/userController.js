const status =require('http-status');
const asyncHandler = require('express-async-handler');

// route POST /api/users
const registerUser =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Register User'});
});

// route POST /api/users/auth
const authUser =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Auth User'});
});

// route POST /api/users/logout
const logoutUser =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Logout User'});
});

// route GET /api/users/profile
const getUserProfile =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Get User Profile'});
});

// route PUT /api/users/profile
const updateUserProfile =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Update User'});
});


module.exports = {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};