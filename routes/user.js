const express = require("express");
const User = require("../schema/userSchema");
const router = require("express-promise-router")();

const UsersController = require("../controllers/user");

router.route("/").get(UsersController.index).post(UsersController.newUser);
router.route("/:id").get(UsersController.getUser);

module.exports = router;
