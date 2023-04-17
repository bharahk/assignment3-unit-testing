const User = require("../models/user.model");
const HttpException = require("../utils/http.exception");

async function createUser({ userId, name, address }) {
    await User.create({ userId, name, address }).catch(err => {
        if (err.code === 11000) throw new HttpException(409, "userId Already exists.");

        throw err;
    });

    return { message: "User created successfully." };
}

async function getAllUsers() {
    const users = await User.find().select("-_id -__v");
    return { users: users };
}

async function updateUserByUserId({ userId, name, address }) {
    const updatedUser = await User.findOneAndUpdate({ userId }, { name, address });
    if(!updatedUser) {
        throw new HttpException(400, "userId doesn't exists.");
    }

    return { message: "User updated successfully." };
}

async function getUserByUserId(userId) {
    return await User.findOne({ userId: userId });
}

module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    updateUserByUserId: updateUserByUserId,
    getUserByUserId: getUserByUserId
};