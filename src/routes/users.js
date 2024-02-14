const { Router } = require("express");
const router = Router();

// DEVELOP, CREATE FAKE DATA
const { faker } = require("@faker-js/faker");

// Impor the sequelize table
const Users = require("../model/users.model");
// Check if the table exists, create if not.
Users.sync({});

function errorFunction(res) {
  return res.status(500).json({ message: "HELP! Something broke 🧯🔥" });
}

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await Users.findAll();

      res.json(users);
    } catch (error) {
      console.log(error);
      return errorFunction(res);
    }
  })
  .post(postUser);

async function getUser(req, res) {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    res.json(user ?? { message: "User not found 😞" });
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function postUser(req, res) {
  try {
    const newUser = await Users.create({
      username: faker.internet.userName(),
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
        : { message: "User deleted successfully 😃" },
    );
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

async function patchUser(req, res) {
  try {
    const updatedUser = await Users.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.json(
      updatedUser == 0
        ? { message: "User not found 😞" }
        : { message: "User updated successfully 😃" },
    );
  } catch (error) {
    console.log(error);
    return errorFunction(res);
  }
}

router.route("/:id").get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;
