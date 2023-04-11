require("dotenv").config();
const express = require("express");
const app = express();

const { connectToMongoDb } = require("./config/mongodb.config");
const { loggerMiddleware } = require("./middleware/logger.middleware");
const { errorHandlerMiddleware } = require("./middleware/error-handler.middleware");
const userController = require("./controller/user.controller");

async function bootstarp() {
    const API_PREFIX = "/api";
    const PORT = process.env.PORT;
    await connectToMongoDb();

    app.use(express.json());
    app.use(loggerMiddleware);
    app.use(API_PREFIX + "/user", userController);
    app.all("*", (req, res) => res.status(404).json({
        message: "Requested route not found."
    }));
    app.use(errorHandlerMiddleware);
    app.listen(PORT, () => {
        console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
}

bootstarp().catch(err => {
    console.log(`Error occured while starting the server: `, err);
    console.log(`TERMINATING THE SERVER.`);
    process.exit();
});

module.exports = {
    app: app
};