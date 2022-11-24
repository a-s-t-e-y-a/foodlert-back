const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const { fileUpload } = require("../utils/fileUpload");

//router.post('/', auth, userController.createUser);
router.get("/", auth, userController.getUsers);
router.get("/:userId", auth, userController.getUser);
router.patch("/:userId", auth, fileUpload.any(), userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
