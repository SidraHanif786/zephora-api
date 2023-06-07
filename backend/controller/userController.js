const status =require('http-status');
const User = require('../models/usersModel.js');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateTokens');


// route POST /api/users
const registerUser =asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email: email});

    if (userExists){
        res.status(status.NOT_FOUND);
        throw new Error('User already exists')
    }
    const user = await User.create({
        name, email, password,
    });
    if (user){
        generateToken(res, user._id)
        res.status(status.CREATED).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // password: user.password,
        });
    } else {
        res.status(status.BAD_REQUEST);
        throw new Error('Invalid user data');
    }
});

// route POST /api/users/auth
const authUser =asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))){
        generateToken(res, user._id)
        res.status(status.CREATED).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // password: user.password,
        });
    } else {
        res.status(status.BAD_REQUEST);
        throw new Error('Invalid email or password');
    }
    

    // res.status(status.OK).json({message: 'Auth User'});
});

// route POST /api/users/logout
const logoutUser =asyncHandler(async(req, res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(status.OK).json({message: 'User Logged out'});
});

// route GET /api/users/profile
const getUserProfile =asyncHandler(async(req, res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(status.OK).json(user);
});

// route PUT /api/users/profile
const updateUserProfile =asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.status(status.OK).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email
        })

    }else{
        res.status(status.NOT_FOUND)
        throw new Error('User not found');
    }
    res.status(status.OK).json({message: 'Update User'});
});


module.exports = {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};