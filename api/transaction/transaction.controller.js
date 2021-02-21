const MemoryStorage = require("memorystorage");
const { use } = require("./transaction.route");
const globalMemory = MemoryStorage("global");

exports.getIndex = (req, res) => {
  res.status(200).send({ title: "API transactions" });
};

// Create a hardcoded (only) user with amount
exports.setAmount = (req, res) => {
  const { amount } = req.body;

  if (amount) {
    globalMemory.user = {
      userId: "1",
      fullName: "Carlos Zaburlin",
      amount,
      transactions: [],
    };
    res.status(201).send({ user: globalMemory.user });
  } else {
    res.status(400).send({
      msg: "You need to pass an amount value: example => {amount: 5000}",
    });
  }
};

// Create a new transaction
exports.newTransaction = (req, res) => {
  const { amount, type } = req.body;

  if (!type || (type !== "debit" && type !== "credit") || !amount || amount < 0)
    res.status(400).send({
      msg:
        "You need to pass an object param like this: {amount: 5000, type: credit/debit}, and amount > 0",
    });
  else if (globalMemory.user) {
    const totalAmount = globalMemory.user.amount - amount;

    if (totalAmount < 0)
      res.status(400).send({
        msg: "You don't have enough funds",
      });
    else {
      globalMemory.user.amount = totalAmount;
      globalMemory.user.transactions.push({
        amount,
        fullName: "Carlos Zaburlin",
        id: globalMemory.user.transactions.length,
        leaseDate: new Date(),
        type,
      });
      res.status(200).send({
        msg: "Transaction completed successfully",
        user: globalMemory.user,
      });
    }
  } else {
    res.status(404).send({
      msg:
        "User doesn't exist, you need to make a request to /set-amount with body like this {amount: 5000}",
    });
  }
};

// Get a list of transactions
exports.getTransactions = (req, res) => {
  let transactions = [];

  if (
    globalMemory.user &&
    globalMemory.user.transactions &&
    globalMemory.user.transactions[0]
  ) {
    transactions = globalMemory.user.transactions;
  }

  res.status(200).send({ transactions });
};
