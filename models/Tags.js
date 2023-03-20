const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Tags extends Model {}

Tags.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "tags",
  }
);

module.exports = Tags;
