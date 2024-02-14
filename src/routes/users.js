const { Router } = require("express");
const router = Router();

const bcrypt = require("bcrypt");
require("dotenv").config();

// DEVELOP, CREATE FAKE DATA
const { faker } = require("@faker-js/faker");

// Impor the sequelize table
const Users = require("../models/users.model");
const { where } = require("sequelize");
// Check if the table exists, create if not.
Users.sync({ alter: true });

function errorFunction(res) {
  return res.status(500).json({ message: "HELP! Something broke 🧯🔥" });
}

async function hashPassword(password) {
  return await bcrypt.hashSync(
    password,
    Number.parseInt(process.env.SALT_ROUNDS)
  );
}

router.route("/").get(getAllUsers).post(postFakeUser);

async function getAllUsers(req, res) {
  try {
    const users = await Users.findAll();

    res.json(users);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function postFakeUser(req, res) {
  try {
    const password = faker.internet.password();
    const hashedPassword = await hashPassword(password);

    const newUser = await Users.create({
      username: faker.internet.userName(),
      password: hashedPassword,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      isAdmin: faker.datatype.boolean(),
    });

    res.json(newUser);
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function getUser(req, res) {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    res.json(user ?? { message: "User not found 😞" });
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json(
      deletedUser == 0
        ? { message: "User not found 😞" }
        : { message: "User deleted successfully 😃" }
    );
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function patchUser(req, res) {
  try {
    let { password } = req.body;

    if (password) {
      password = await hashPassword(password);
    }

    const updatedUser = await Users.update(
      {
        ...req.body,
        password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json(
      updatedUser == 0
        ? { message: "User not found 😞" }
        : { message: "User updated successfully 😃" }
    );
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

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

    return res.json({ message: "Login success ✔" });
  } catch (err) {
    console.error(err);
  }
});

router.route("/:id").get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
