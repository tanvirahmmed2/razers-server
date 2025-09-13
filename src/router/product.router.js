const express = require('express')
const { getProduct, addProduct } = require('../controller/product.controller')
const productRouter = express.Router()


productRouter.get('/', getProduct)
productRouter.post('/addproduct', addProduct)





module.exports = productRouter