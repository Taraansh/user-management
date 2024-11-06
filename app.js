const sequelize = require("./config/database");
const express = require("express");
const app = express();
const routes = require("./routes/index");

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
