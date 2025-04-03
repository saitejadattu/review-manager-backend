const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();

const connectToDB = () => {
    mongoose.connect(process.env.URI)
        .then(() => console.log("MongoDB connected Successfully"))
        .catch((error) => console.log(`DB Connection ${error.message}`))
}

module.exports = connectToDB