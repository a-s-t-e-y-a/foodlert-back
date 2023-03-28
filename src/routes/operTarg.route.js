const express = require("express")
const router = express.Router()

const operTargController = require("../controllers/operTargGraph.controller")
const auth = require("./../middlewares/auth")

router.use(auth)

router.post("/create_operation_target",operTargController.operTargetGraph)
router.get("/get_operation_target",operTargController.getOper_target)

module.exports = router