const express = require("express");
const router = express.Router();

const middleware = require("../middleware/auth");
const expenseControllers = require("../controllers/expenseControllers");

router.get(
  "/getExpense",
  middleware.authenticate,
  expenseControllers.getExpenses
);

router.post(
  "/postExpense",
  middleware.authenticate,
  expenseControllers.postExpense
);

module.exports = router;
