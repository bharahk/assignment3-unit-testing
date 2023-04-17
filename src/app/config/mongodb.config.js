const mongoose = require("mongoose");

const { db } = require("./env.config");
const logger = require("../utils/logger");

async function connectToMongoDb() {
    await mongoose.connect(db.MONGODB_URI).then(() => {
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