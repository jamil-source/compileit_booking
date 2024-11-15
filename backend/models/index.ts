import { Sequelize } from "sequelize";
import * as config from "../config/config.json";

const dbConfig = config.development;

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbConfig.storage,
});

import BookingModel from "./booking";
import RoomModel from "./room";

export const Booking = BookingModel(sequelize);
export const Room = RoomModel(sequelize);

export default sequelize;
