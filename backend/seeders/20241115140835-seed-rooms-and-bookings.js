const { Room } = require("../models");

module.exports = {
  up: async (queryInterface) => {
    const roomsData = [
      {
        name: "Margret",
        maximumAmount: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Steve",
        maximumAmount: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ada",
        maximumAmount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Edmund",
        maximumAmount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Grace",
        maximumAmount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Rooms", roomsData);

    const roomRecords = await Room.findAll({
      attributes: ["id", "name"],
    });

    const today = new Date();
    const endDate = new Date();
    endDate.setMonth(today.getMonth() + 6);

    const bookings = [];
    let currentDate = new Date(today);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];

      for (const room of roomRecords) {
        const roomId = room.id;

        for (let hour = 8; hour < 17; hour++) {
          const startTime = `${String(hour).padStart(2, "0")}:00`;
          const endTime = `${String(hour + 1).padStart(2, "0")}:00`;

          bookings.push({
            roomId,
            date: dateStr,
            startTime,
            endTime,
            bookerName: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    await queryInterface.bulkInsert("Bookings", bookings);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Bookings", {}, {});
    await queryInterface.bulkDelete("Rooms", {}, {});
  },
};
