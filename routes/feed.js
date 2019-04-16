const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");

//feed endpoint
router.get("/api/feed", feedController.feed_get);

module.exports = router;