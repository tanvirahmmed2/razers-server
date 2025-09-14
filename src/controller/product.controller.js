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



const cloudinary = require('../config/cloudinary'); // your Cloudinary config

const addProduct = async (req, res) => {
    try {
        const { name, old_price, new_price, quantity, description } = req.body;

        // 1️⃣ Validate product fields
        if (!name || !old_price || !new_price || !quantity || !description) {
            return res.status(400).send({
                success: false,
                message: 'Fill all the details'
            });
        }

        // 2️⃣ Validate image file
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'Add an image'
            });
        }

        // 3️⃣ Convert buffer to base64 string for Cloudinary
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // 4️⃣ Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(fileStr, {
            folder: 'products', // optional: folder name in Cloudinary
        });

        // 5️⃣ Create product object (replace with your Product model)
        const newProduct = new Product({
            name,
            old_price,
            new_price,
            quantity,
            description,
            imageUrl: uploadedImage.secure_url, // store the Cloudinary URL
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







module.exports = {
    getProduct,
    addProduct
}