const express = require("express");
const {
  getBookingsList,
  putBooking,
} = require("../controllers/bookingsController");
const router = express.Router();

router.get("/", getBookingsList);
router.put("/:id", putBooking);

module.exports = router;
