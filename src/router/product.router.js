const express = require('express')
const multer= require('multer')
const { getProduct, addProduct, removeProduct } = require('../controller/product.controller')
const { isAdmin } = require('../middleware/user.middleware')
const productRouter = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });


productRouter.get('/',isAdmin, getProduct)
productRouter.post('/addproduct', isAdmin, upload.single('image') ,addProduct)
productRouter.delete('/removeproduct', isAdmin, removeProduct)





module.exports = productRouter