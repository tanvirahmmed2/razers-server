const express = require('express')
const { getProduct, addProduct } = require('../controller/product.controller')
const { isAdmin } = require('../middleware/user.middleware')
const productRouter = express.Router()


productRouter.get('/', getProduct)
productRouter.post('/addproduct', isAdmin, addProduct)





module.exports = productRouter