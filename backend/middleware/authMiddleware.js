const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const status = require('http-status');
const User = require('../models/usersModel');

const protect = asyncHandler(async (res, req, next)=>{
    let token;
    token= req.cookie.jwt;
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            console.error(error);
            res.status(status.UNAUTHORIZED);
            throw new Error('Not authourized, invalid token');
        }
    }else {
        res.status(status.UNAUTHORIZED);
        throw new Error('Not authourized, no token');
    }
})

module.exports = protect;