require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

const ConnectMongo = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Could not connect to MongoDB:', error.message);
        process.exit(1);
    }
};

ConnectMongo();
