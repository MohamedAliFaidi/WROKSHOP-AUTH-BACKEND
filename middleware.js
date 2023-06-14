const jwt = require("jsonwebtoken");
const User = require("./Models/User")


function authenticated (req, res, next) {
    // Check if the user is authenticated
    
    try {
        const token = req.headers.cookie.split("=")[1];
        const decoded = jwt.verify(token, "kurhqerygq0981ygjqgvfug7821y3jhvqjdhqwj3123259d");
        const user = User.findOne(decoded.email);
    
        if(Date.now() >  decoded.exp){
            res.status(401).json("token expired");
        }
    
    
        if (!user) {
          return res.status(401).json("unauthorized");
        }
      } catch (error) {
        res.status(401).json("unauthorized");
      }
  



  
    // The user is authenticated, continue to the next middleware or route handler
    next();
  };


  module.exports = {
    authenticated

  }