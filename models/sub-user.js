const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Admin = require("./admin");

const SubUser = sequelize.define(
  "SubUser",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "sub-user",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "sub_users",
  }
);

module.exports = SubUser;
