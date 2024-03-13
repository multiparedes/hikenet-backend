"use strict";
const { Model } = require("sequelize");
const { capitalizeString } = require("../utils/basicUtils");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Profile, User }) {
      this.hasOne(Profile, {
        foreignKey: { name: "userId", allowNull: false },
        as: "profile",
      });

      this.belongsToMany(User, {
        as: "followers",
        foreignKey: "followedId",
        through: "Followers",
      });

      this.belongsToMany(User, {
        as: "followings",
        foreignKey: "followerId",
        through: "Followers",
      });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
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
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
