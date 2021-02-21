const express = require("express");
const router = express.Router();

const TransactionController = require("./transaction.controller");

router.get("/", TransactionController.getIndex);
router.post("/set-amount", TransactionController.setAmount);
router.post("/new-transaction", TransactionController.newTransaction);
router.get("/transactions", TransactionController.getTransactions);

module.exports = router;
