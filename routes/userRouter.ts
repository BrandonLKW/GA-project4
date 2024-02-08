const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getOne);
router.post("/login", userController.login);
router.post("/signup", userController.signup);

module.exports = router;