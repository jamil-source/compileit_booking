import express from "express";
import { sequelize } from "../models";
const app = express();
const PORT = 3000;

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running in ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
