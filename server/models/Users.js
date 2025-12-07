import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
const user = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);
export default user;
