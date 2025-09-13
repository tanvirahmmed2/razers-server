const Product = require("../model/product.model")

const getProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.send({
            success: true,
            message: `Production Server is running`,
            payload: { products }
        })
    } catch (error) {
        res.send({
            success: true,
            message: error,
        })
    }
}



const addProduct = async (req, res) => {
    try {
        const { name, old_price, new_price, quantity, description } = req.body
        if (!name || !old_price || !new_price || !quantity || !description) {
            res.status(500).send({
                success: false,
                message: `Fill all the details`
            })
        }
        const { image } = req.file
        if (!image) {
            res.status(500).send({
                success: false,
                message: `Add image`,
            })
        }


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error,
        })

    }
}
module.exports = {
    getProduct,
    addProduct
}