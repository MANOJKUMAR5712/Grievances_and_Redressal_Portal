export const ensureUserIsAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){

        return next();
    }
    console.log('isAuthenticated : false');
    return res.status(401).json({error : 'User must be Authenticated'})
}