import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class Room extends Model {}

  Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maximumAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Room",
      tableName: "Rooms",
    }
  );

  return Room;
};
