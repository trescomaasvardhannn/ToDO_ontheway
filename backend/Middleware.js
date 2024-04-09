// Middleware for handling auth
const jwt= require("jsonwebtoken");
const {JWT_SECRET}= import("../JWT_SECRET.cjs")
function customSplit(str) {
    const result = [];
    let word = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== ' ') {
        word += str[i];
      } else if (word) {
        result.push(word);
        word = '';
      }
    }
    if (word) {
      result.push(word);
    }
    return result;
  }

function userMiddleware(req, res, next,JWT_SECRET) {
    // Implement user auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token= req.headers.authorization;
    // console.log(token);
    const words=customSplit(token);
    const jwtToken= words[1];
    // console.log(words)
    // console.log(jwtToken)
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET);
    console.log(decodedValue);
    try{

        
        
        if(decodedValue.username)
        {
            req.username= decodedValue.username;
            // console.log(req.username)
            next();   
        }
            
    }
    catch(err){
        res.status(403).json({
            msg:"you are not authenticated"
        })
    }
}

module.exports = userMiddleware;