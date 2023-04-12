const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true
    },
    address: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;