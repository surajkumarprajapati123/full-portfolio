const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Add user from payload (you would fetch from DB in real app)
      req.user = {
        _id: decoded.id,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


const admin = asyncHandler(async(req,res,next)=>{
  try {
    
    if(req.user.role === 'admin'){
      next()
    }
    throw new Error("Only Admin Can Access this ")
  } catch (error) {
  throw new Error(error)
  }
})

module.exports = { protect,admin };