const express = require("express");
const { getBookingsList } = require("../controllers/bookingsController");
const router = express.Router();

router.get("/", getBookingsList);

module.exports = router;
