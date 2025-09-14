require('dotenv').config();
const mongoose = require('mongoose');
const connectDB= async()=>{
    await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');
}

module.exports= connectDB