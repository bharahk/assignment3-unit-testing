const User = require("../models/user.model");
const { HttpException } = require("../utils/http.exception");

async function createUser({ userId, emailId, address }) {
    await User.create({ userId, emailId, address }).catch(err => {
        if(err.code === 11000) throw new HttpException(400, "userId Already exists.");
    });

    return { message: "User created successfully." };
}

async function getAllUsers() {
    const users = await User.find().select("-_id -__v");
    return users;
}

async function updateUserByUserId({ userId, emailId, address }) {
    const updatedUser = await User.findOneAndUpdate({ userId }, { emailId, address });
    if(!updatedUser) {
        throw new HttpException(400, "userId doesn't exists.");
    }

    return { message: "User updated successfully." };
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    updateUserByUserId
};