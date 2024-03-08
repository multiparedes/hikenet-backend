const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
require("dotenv").config();

const { User, Profile } = require("../models");

const {
  hashPassword,
  errorFunction,
  generateToken,
  verifyToken,
} = require("../utils/basicUtils");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(412).json({ message: "Missing username or password" });
    }

    const user = await User.findOne({
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

    let token = generateToken(user);

    return res
      .cookie("auth._token.cookie", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({ message: "Login success ✔", token, user });
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
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await hashPassword(password);

    try {
      const existingUser = await User.findOne({ where: { username } });

      if (existingUser?.id) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const newUser = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        isAdmin: isAdmin ?? false,
      });

      await Profile.create({ userId: newUser.id });

      let token = generateToken(newUser);

      return res.json({ user: newUser, token });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.error(err);
    return errorFunction(res);
  }
});

router.post("/logout", (req, res) => {
  return res
    .clearCookie("auth._token.cookie")
    .json({ message: "User logout successfully ✔" });
});

router.get("/user", async (req, res) => {
  let user = verifyToken(req.get("Authorization"));

  if (!user || Date.now() > user.exp * 1000) {
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.json(user);
});

module.exports = router;
