require("./config");

const express = require('express');
const app = express()
const cors = require("cors");
const PORT = process.env.PORT

// Swagger Docs
const swaggerDocs = require("./swagger_config");
// Swagger User Interface
const swaggerUi = require("swagger-ui-express");

app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(require("./api/example/example.route"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})