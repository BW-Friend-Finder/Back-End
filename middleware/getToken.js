const jwt = require('jsonwebtoken');


function getToken(email){
    //define payload
    const payload = {
      email
    };
  
    //secret
    const secret = process.env.JWT_SECRET || "super secret secret phrase";
  
    //options
    const options = {
      expiresIn: '1d'
    }
    
    //sign token and ship
    return jwt.sign(payload, secret, options)
  }

  module.exports = getToken