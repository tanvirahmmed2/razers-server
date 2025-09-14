require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')



const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies['auth-token']
        if (!token) {
            res.status(500).send({
                success: false,
                message: 'token not found. please loggin first'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            res.status(500).send({
                success: false,
                message: 'jwt failed to decode user information'
            })
        }
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Login failed',
            error: error.message
        })
    }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Token not found. Please login first'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({
        success: false,
        message: 'Invalid token. Please login again'
      });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isAdmin) {
      return res.status(403).send({
        success: false,
        message: 'You are not an admin'
      });
    }

    // Save decoded user info for later use
    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).send({
      success: false,
      message: 'Failed to verify admin access',
      error: error.message
    });
  }
};

module.exports = {
    isLogin,
    isAdmin
}