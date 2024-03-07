const { DataTypes, Model } = require("sequelize");

const db = require("../utils/database");
const { capitalizeString } = require("../utils/basicUtils");
const Profile = require("../models/profile.model");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 255],
          msg: "min_len_4",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "cannot_be_null",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return capitalizeString(`${this.firstName} ${this.lastName}`);
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "invalid_email",
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: "user",
  },
);

User.sync({ alter: true });

Profile.belongsTo(User);

module.exports = User;
