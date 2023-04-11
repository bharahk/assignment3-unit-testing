const router = require("express").Router();

const { validateUserInfo, validateUserId } = require("../utils/req.validator");
const { createUser, getAllUsers, updateUserByUserId } = require("../service/user.service");

router.post("/", (req, res, next) => {
    validateUserInfo(req.body);

    createUser(req.body)
    .then(responseBody => res.json(responseBody))
    .catch(err => next(err));
});

router.get("/", (req, res) => {
    getAllUsers()
    .then(responseBody => res.json(responseBody))
    .catch(err => next(err));
});

router.put("/", (req, res, next) => {
    validateUserInfo(req.body);

    updateUserByUserId(req.body)
    .then(responseBody => res.json(responseBody))
    .catch(err => next(err));
});

module.exports = router;