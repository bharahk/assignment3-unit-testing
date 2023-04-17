require("dotenv").config();

module.exports = {
    app: {
        PORT: process.env.PORT || 3000 
    },
    db: {
        MONGODB_URI: process.env.MONGODB_URI
    }
};