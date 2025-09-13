const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    old_price: {
        type: String,
        required: true,
    },
    new_price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    addedAT: {
        type: Date,
        default: new Date
    }
})


const Product = mongoose.model('products', productSchema)

module.exports = Product