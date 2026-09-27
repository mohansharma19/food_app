const mongoose = require("mongoose");
const colors = require("colors");

// MongoDB database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log(
            `Connected To Database: ${mongoose.connection.host}`.bgGreen
        );
    } catch (error) {
        console.log(
            "DB connection failed".bgMagenta,
            error
        );
    }
};

module.exports = connectDb;