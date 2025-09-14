const express = require('express')
const { registerUser, loginUser, getUser, changePass, logoutUser } = require('../controller/user.controller')
const { isLogin, isAdmin } = require('../middleware/user.middleware')
const userRouter = express.Router()

userRouter.get('/',isAdmin, getUser)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/changepass', isLogin, changePass)
userRouter.post('/logout', isLogin, logoutUser)

module.exports = userRouter
