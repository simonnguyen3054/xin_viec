const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");

//feed endpoint
router.get("/api/feed", feedController.feed_get);

router.post("/api/post/create", feedController.post_create);

router.get("/api/posts/:id", feedController.post_get);

module.exports = router;