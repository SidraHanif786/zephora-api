const status =require('http-status');
const asyncHandler = require('express-async-handler');

const authUser =asyncHandler(async(req, res)=>{
    res.status(status.OK).json({message: 'Auth User'});
});

module.exports = {authUser};