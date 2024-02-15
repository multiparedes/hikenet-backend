const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
require("dotenv").config();

const Users = require("../models/users.model");

const {
  hashPassword,
  errorFunction,
  generateToken,
} = require("../utils/basicUtils");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(412).json({ message: "Missing username or password" });
    }

    const user = await Users.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found 😞" });
    }

    if (!(await bcrypt.compareSync(password, user.password))) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    let token = generateToken({ user: user });

    return res.json({ message: "Login success ✔", token });
  } catch (err) {
    console.error(err);
    return errorFunction(res);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { password, username, firstName, lastName, email, isAdmin } =
      req.body;

    if (!password || !username || !firstName || !email) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await Users.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      isAdmin: isAdmin ?? false,
    });

    let token = generateToken({ user: user });

    res.json({ user: newUser, token });
  } catch (err) {
    console.error(err);
    return errorFunction(res);
  }
});

module.exports = router;
