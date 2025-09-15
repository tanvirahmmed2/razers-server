const Product = require("../model/product.model")

const cloudinary = require('../config/cloudinary');

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
        const { name, old_price, new_price, quantity, description } = req.body;


        if (!name || !old_price || !new_price || !quantity || !description) {
            return res.status(400).send({
                success: false,
                message: 'Fill all the details'
            });
        }

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'Add an image'
            });
        }

        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadedImage = await cloudinary.uploader.upload(fileStr, {
            folder: 'products',
        });

        const newProduct = new Product({
            name,
            old_price,
            new_price,
            quantity,
            description,
            imageUrl: uploadedImage.secure_url,
            public_id: uploadedImage.public_id
        });

        await newProduct.save();

        return res.status(201).send({
            success: true,
            message: 'Product added successfully',
            product: newProduct
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to add product',
            error: error.message
        });
    }
};


const removeProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).send({
                success: false,
                message: 'Product ID is required'
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'No product found with this ID'
            });
        }

        // ✅ Correct field name
        if (product.public_id) {
            const result = await cloudinary.uploader.destroy(product.public_id);
            console.log('Cloudinary delete result:', result);
        }

        await Product.findByIdAndDelete(productId);

        res.status(200).send({
            success: true,
            message: 'Product and image removed successfully'
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    getProduct,
    addProduct,
    removeProduct
}