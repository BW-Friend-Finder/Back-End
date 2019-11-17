const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
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