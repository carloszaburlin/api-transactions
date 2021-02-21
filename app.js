require("./config");

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(require("./api/transaction/transaction.route"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
