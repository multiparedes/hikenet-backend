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
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "profile",
  },
);

Profile.User = Profile.belongsTo(User);

Profile.sync({ alter: true });

module.exports = Profile;
