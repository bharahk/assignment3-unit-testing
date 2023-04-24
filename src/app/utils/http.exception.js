class HttpException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = HttpException;