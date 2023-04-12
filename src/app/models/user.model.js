const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        maxlength: 320
    },
    address: {
        type: String,
        required: true,
        maxlength: 1000
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;