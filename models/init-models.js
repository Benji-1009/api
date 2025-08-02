import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import _users from "./users.js";
import _platforms from "./platforms.js";
import _shipment from "./shipment.js";

export function initModels() {
  const Users = _users(sequelize, DataTypes);
  const Platforms = _platforms(sequelize, DataTypes);
  const Shipment = _shipment(sequelize, DataTypes);
  return {
    Users, Platforms, Shipment
  };
}
