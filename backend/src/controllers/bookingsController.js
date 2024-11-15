const { Booking } = require("../../models");

const getBookingsList = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json(bookings);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lista med bokningar kan inte hämtas" });
  }
};

module.exports = { getBookingsList };
