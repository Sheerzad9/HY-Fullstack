const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  const users = await User.find({}).populate("blogs", {
    url: true,
    title: true,
    author: true,
  });
  res.status(200).json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Username found in db, username must be unique!" });
  }
  if (password.trim().length < 3) {
    return res
      .status(400)
      .json({ error: "Password must be atleast 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
