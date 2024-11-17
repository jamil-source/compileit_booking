const { Room } = require("../../models");

const getRoomsList = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: "Lista med rum kan inte hämtas" });
  }
};

module.exports = { getRoomsList };
