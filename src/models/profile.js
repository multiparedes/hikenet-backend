"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: { name: "userId" },
      });
    }

    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }
  Profile.init(
    {
      description: { type: DataTypes.TEXT, defaultValue: null },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    },
  );
  return Profile;
};
