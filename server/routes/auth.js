const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("Registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(400).send("Invalid");

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token });
});

module.exports = router;