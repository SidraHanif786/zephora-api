import status from 'http-status';

const authUser =(req, res)=>{
    res.status(status.OK).json({message: 'Auth User'});
};

export {authUser};