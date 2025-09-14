require('dotenv').config()
const jwt = require('jsonwebtoken')



const isLogin = async (req, res, next) => {
    try {
        const token = res.cookies['auth-token']
        if (!token) {
            res.status(500).send({
                success: false,
                message: 'token not found. please loggin first'
            })
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET )
        if(!decoded){
            res.status(500).send({
                success: false,
                message: 'jwt failed to decode user information'
            })
        }
        req.user= decoded
        next()
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Login failed',
            error: error.message
        })
    }
}


module.exports = {
    isLogin
}