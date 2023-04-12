const logger = require("../utils/logger");

function loggerMiddleware(req, res, next) {
    const originalResSend = res.send;
    
    res.send = (body) => {
        logger.info({ 
            path: req.path, 
            method: req.method, 
            query: req.query, 
            params: req.params, 
            body: req.body,
            statusCode: res.statusCode 
        });

        originalResSend.call(res, body);
    };

    next();
}

module.exports = loggerMiddleware;