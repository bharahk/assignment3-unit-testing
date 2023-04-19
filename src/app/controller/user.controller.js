const router = require("express").Router();

const { validateUserData } = require("../utils/req.validator");
const { createUser, getAllUsers, updateUserByUserId } = require("../service/user.service");

router.post("/", (req, res, next) => {
    validateUserData(req.body);

    createUser(req.body)
    .then(responseBody => res.status(201).json(responseBody))
    .catch(err => next(err));
});

router.get("/", (req, res, next) => {
    getAllUsers()
    .then(responseBody => res.json(responseBody))
    .catch(err => next(err));
});

router.put("/", (req, res, next) => {
    validateUserData(req.body);

    updateUserByUserId(req.body)
    .then(responseBody => res.json(responseBody))
    .catch(err => next(err));
});

module.exports = router;