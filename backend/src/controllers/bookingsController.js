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

const putBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookerName } = req.body;

    const nameRegex = /^[a-zA-ZåäöÅÄÖ\s\-]+$/;

    if (!nameRegex.test(bookerName)) {
      return res.status(400).json({
        message: "Namnet innehåller otillåtna tecken.",
      });
    }

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Bokningen hittades inte." });
    }

    booking.bookerName = bookerName;
    await booking.save();

    return res.status(200).json({
      message: booking.bookerName
        ? "Ditt rum är bokat!"
        : "Ditt rum är avbokat!",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ett fel inträffade när bokningen skulle uppdateras.",
    });
  }
};

module.exports = { getBookingsList, putBooking };
