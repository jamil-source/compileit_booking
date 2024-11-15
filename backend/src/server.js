const express = require("express");
const { sequelize } = require("../models");
const app = express();
const PORT = 3000;

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
