const { Sequelize } = require("sequelize");
const config = require("../config/config.json");

const dbConfig = config.development;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbConfig.storage,
});

const BookingModel = require("./booking");
const RoomModel = require("./room");

const Booking = BookingModel(sequelize);
const Room = RoomModel(sequelize);

module.exports = { sequelize, Booking, Room };
