const { HttpException } = require("../utils/http.exception");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ message: "hi" });
});

module.exports = router;