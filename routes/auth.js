const express = require("express");
const { signup, signin, logout } = require("../controllers/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.get("/logout", logout);

module.exports = router;
