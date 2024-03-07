const { DataTypes, Model } = require("sequelize");
const { User } = require("../models/users.model");

const db = require("../utils/database");

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "profile",
  },
);

Profile.sync({ alter: true });

module.exports = Profile;
