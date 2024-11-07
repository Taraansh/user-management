const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User Management",
    description: "An Assignment",
    contact: {
      email: "taraanshnandwani123@gmail.com",
    },
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ["http"],
  securityDefinition: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
