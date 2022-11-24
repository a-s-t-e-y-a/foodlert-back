const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const branchRoute = require("./branch.route");
const departmentRoute = require("./department.route");
const employeeRoute = require("./employee.route");
const jobTitleRoute = require("./jobTitle.route");
const payrollgroupRoute = require("./payrollgroup.route");
const restaurentRoute = require("./restaurent.route");
const roleRoute = require("./role.route");
const scheduleRoute = require("./schedule.route");
const userRoute = require("./user.route");
const financeRoute = require("./finance.route");
const taskRoute = require("./../routes/task.route");
// File_Appending
const feedRoute = require('./../routes/feed.route');
const inventoryRoute = require("./../routes/inventory.route");
const cateringRoute = require("./cateringOrder.route");
const menuItemRoute = require("./../routes/menuItem.route");

router.use("/auth", authRoute);
router.use("/restaurents", restaurentRoute);
router.use("/branches", branchRoute);
router.use("/departments", departmentRoute);
router.use("/employees", employeeRoute);
router.use("/job-titles", jobTitleRoute);
router.use("/payroll-group", payrollgroupRoute);
router.use("/roles", roleRoute);

router.use("/schedule", scheduleRoute);
router.use("/users", userRoute);

router.use("/finance", financeRoute);
router.use("/task", taskRoute);
// Routes_Appending
router.use('/feed', feedRoute);
router.use("/catering-order", cateringRoute);
router.use("/menu", menuItemRoute);
router.use("/inventory", inventoryRoute);

module.exports = router;
