const router = require("express").Router();

const { validateUserInfo, validateUserId } = require("../utils/req.validator");

router.get("/", (req, res) => {
    res.json({ message: "test." });
});

router.post("/", (req, res) => {
    validateUserInfo(req.body);
    res.send("test.");
});

router.get("/:userId", (req, res) => {
    validateUserId(req.params.userId);
    res.send("test.");
});

router.put("/", (req, res) => {
    validateUserInfo(req.body);
    res.send("test.");
});

module.exports = router;