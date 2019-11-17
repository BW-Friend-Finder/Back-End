const jwt = require('jsonwebtoken');
 

const authorize = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        const secret = process.env.JWT_SECRET || "super secret secret phrase";

        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: `invalid token`, error: err});
            } else{
                req.decodedJwt = decodedToken;
                next();
            }
        });

    } else {
        res.status(401).json({error: `user is not authorized to access this resource`});
    }
};


const validate = (user) => {

    let errors = [];

    if(!user.email.length || !user.email.includes('@')){
        errors.push('Invalid email address. Please check email for errors.')
    }

    if(!user.password){
        errors.push("Password is required")
    }

    return{
        isSuccessful: errors.length > 0 ? false : true,
        errors
    };
}


module.exports = {
    authorize,
    validate
}