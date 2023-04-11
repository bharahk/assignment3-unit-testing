const { HttpException } = require("./http.exception");

function validateUserId(emailId) {
    if(!emailId?.match(/U[0-9]{5}/)) {
        throw new HttpException(400, "Invalid request. please check the userId.");
    }

    return true;
}

function validateEmailId(emailId) {
    if(!emailId?.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        throw new HttpException(400, "Invalid request. please check the emailId.");
    }

    return true;
}

function validateAddress(address) {
    if(typeof address !== "string" || !address || address.length > 1000) {
        throw new HttpException(400, "Invalid request. please check the address.");
    }

    return true;
}

function validateUserInfo({ userId, emailId, address }) {
    return validateUserId(userId) && validateEmailId(emailId) && validateAddress(address);
}

module.exports = {
    validateUserInfo: validateUserInfo,
    validateUserId: validateUserId
};