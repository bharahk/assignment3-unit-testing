const mongoose = require("mongoose");

function connectToMongoDb() {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to mongoDB.");
    });
}

module.exports = {
    connectToMongoDb: connectToMongoDb
};