const express = require("express");
const { getRoomsList } = require("../controllers/roomsController");
const router = express.Router();

router.get("/", getRoomsList);

module.exports = router;
