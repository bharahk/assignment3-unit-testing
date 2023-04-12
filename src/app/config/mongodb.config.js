const mongoose = require("mongoose");
const logger = require("../utils/logger");

function connectToMongoDb() {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        logger.info("Connected to mongoDB.");
    });
}

function closeMongoDbConnection() {
    mongoose.connection.close();
}

module.exports = {
    connectToMongoDb: connectToMongoDb,
    closeMongoDbConnection: closeMongoDbConnection
};