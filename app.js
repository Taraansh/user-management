const sequelize = require("./config/database");
const express = require("express");
const app = express();
const routes = require("./routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");
require("dotenv").config();

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.use(express.json());
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
