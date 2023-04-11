const mongoose = require("mongoose");
const logger = require("../utils/logger");

function connectToMongoDb() {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        logger.info("Connected to mongoDB.");
    });
}

module.exports = {
    connectToMongoDb: connectToMongoDb
};