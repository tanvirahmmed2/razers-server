const express = require('express')
const multer= require('multer')
const { getProduct, addProduct } = require('../controller/product.controller')
const { isAdmin } = require('../middleware/user.middleware')
const productRouter = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


productRouter.get('/', getProduct)
productRouter.post('/addproduct', isAdmin, upload.single('image') ,addProduct)





module.exports = productRouter