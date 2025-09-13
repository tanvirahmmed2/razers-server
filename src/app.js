const express= require('express')
const cors= require('cors')
const userRouter = require('./router/user.router')
const productRouter = require('./router/product.router')



const app= express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/product', productRouter)



module.exports= app