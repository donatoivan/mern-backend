const jwt = require('jsonwebtoken');
require('dotenv').config();

//JWW authentication to see if token and user match
module.exports = (req, res, next) => {
  //token is in headers

  const token = req.header('auth-x-token');
  //if no token
  if(!token) {
    return res.status(401).send('No token. Authorization denied.')
  }

  try {
    //decode token
    const decoded = jwt.verify(token, process.env.jwtSecret);
    //grab user from token
    req.user = decoded.user
    //call next as we're in middleware
    next();
  } catch (error) {
    res.status(401).send('Token is not valid')
  }
}