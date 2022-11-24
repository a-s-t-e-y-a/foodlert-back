const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feed.controller");

router.post("/", feedController.createFeed);
router.get("/", feedController.getAllFeed);
router.get("/:id", feedController.getFeed);
router.patch("/:id", feedController.updateFeed);
router.delete("/:id", feedController.deleteFeed);

module.exports = router;
