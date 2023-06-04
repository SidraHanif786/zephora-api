const status = require('http-status')

// for any routes that doesn't exist
const notFound = (req, res, next) =>{
    const error = new Error(`Not Found -${req.originalUrl}`);
    res.status(status.NOT_FOUND);
    next(error);
}


// for any error that occur in our routes
const errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode === 200? 500 : res.statusCode;
    let message = err.message;
    if (err.name === 'Cast error' && err.kind ==='ObjectId'){
        statusCode = status.NOT_FOUND;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV ==='production' ? null : error.stack,
    });
}

module.exports = {notFound, errorHandler};