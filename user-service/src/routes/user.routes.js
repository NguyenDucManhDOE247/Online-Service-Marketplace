const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/", (req, res) => {
  res.json([{ id: 1, email: "demo@user.com" }]);
});

module.exports = router;
