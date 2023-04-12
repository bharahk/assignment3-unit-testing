const HttpException = require("./http.exception");

function validateUserId(emailId) {
    if(!emailId?.match(/U[0-9]{5}/)) {
        throw new HttpException(400, "Invalid request. please check the userId.");
    }

    return true;
}

function validateName(name) {
    if(typeof name !== "string" || name.length < 2 || name.length > 100) {
        throw new HttpException(400, "Invalid request. please check the name.");
    }

    return true;
}

function validateAddress(address) {
    if(typeof address !== "string" || !address || address.length > 1000) {
        throw new HttpException(400, "Invalid request. please check the address.");
    }

    return true;
}

function validateUserData({ userId, name, address }) {
    return validateUserId(userId) && validateName(name?.trim()) && validateAddress(address?.trim());
}

module.exports = {
    validateUserData: validateUserData
};