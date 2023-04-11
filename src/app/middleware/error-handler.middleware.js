const logger = require("../utils/logger");

function errorHandlerMiddleware(err, req, res, next) {
    if(!err.statusCode) {
        console.log(err);
        logger.error(err);
        return res.status(500).json({ message: "Something went wrong. please try again later."});
    }

    res.status(err.statusCode).json({ message: err.message });
}

module.exports = {
    errorHandlerMiddleware: errorHandlerMiddleware
};