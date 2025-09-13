require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

const ConnectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Could not connect to MongoDB:', error.message);
        process.exit(1);
    }
};

ConnectMongo();
