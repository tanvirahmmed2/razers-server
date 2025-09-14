const express = require('express')
const { registerUser, loginUser, getUser, changePass } = require('../controller/user.controller')
const { isLogin } = require('../middleware/user.middleware')
const userRouter = express.Router()

userRouter.get('/', getUser)

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.put('/changepass', isLogin, changePass)

module.exports = userRouter
