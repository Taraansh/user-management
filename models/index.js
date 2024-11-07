const { Sequelize } = require("sequelize");
const sequelize = require("../config/database"); // Database config
const Admin = require("./admin");
const SubUser = require("./sub-user");

// Initialize models
const models = {
  Admin,
  SubUser,
};

Admin.hasMany(SubUser, { foreignKey: "createdBy", as: "subUsers" });
SubUser.belongsTo(Admin, { foreignKey: "createdBy", as: "admin" });

// Add the `sequelize` instance and `Sequelize` library to the models for access in other files
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
