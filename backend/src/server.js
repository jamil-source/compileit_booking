const express = require("express");
const { sequelize } = require("../models");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));

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
