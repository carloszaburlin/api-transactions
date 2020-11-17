// Swagger
const swaggerJsDoc = require("swagger-jsdoc");

// Options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Example Name",
      description: "Describe the service functionality",
      contact: {
        name: "Fulanito Ejemplo",
        email: "fulanito@claro.com.ar"
      },
      servers: [
        "http://localhost:8000"
      ]
    }
  },
  apis: ["./api/example/*.route.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
