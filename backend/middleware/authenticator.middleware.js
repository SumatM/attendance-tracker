const jwt = require("jsonwebtoken");
require('dotenv').config()

function authenticate(req,res,next){

try{
    const token = req.headers.authorization.split(" ")[1]
   let decode = jwt.verify(token,process.env.JWT_KEY)
    req.body.userId = decode.userId;
        next()
}catch(err){
    console.log(err);
  res.status(401).json({error:'Not Authorized'})
}


}


module.exports = {authenticate}