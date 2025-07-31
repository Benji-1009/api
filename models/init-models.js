const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/connection");
const _users = require("./users");
const _platforms = require("./platforms");
const _shipment = require("./shipment");

function initModels() {
  const Users = _users(sequelize, DataTypes);
  const Platforms = _platforms(sequelize, DataTypes);
  const Shipment = _shipment(sequelize, DataTypes);


  return {
    Users,Platforms, Shipment
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
