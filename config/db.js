
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4 // Using IPv4
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Listen for connection drops after the initial connection is established
mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected! The driver will attempt to reconnect automatically.');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

module.exports = connectDB;

module.exports = connectDB;