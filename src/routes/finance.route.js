const express = require("express");
const router = express.Router();

const financeController = require("../controllers/finance.controller");
const auth = require("./../middlewares/auth");

router.use(auth);

router.post("/cash-register", financeController.createFinance);
router.post("/safe-deposit", financeController.createFinance);
router.post("/transfer", financeController.createFinance);
router.post("/closing-days", financeController.createFinance);

router.get("/cash-register", financeController.getAllFinance);
router.get("/safe-deposit", financeController.getAllFinance);
router.get("/transfer", financeController.getAllFinance);
router.get("/closing-days", financeController.getAllFinance);

router.patch("/status/:id", financeController.changeFinanceStatus);

router.delete("/delete", financeController.deleteAllFinance);

module.exports = router;
