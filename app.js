const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const { sequelize } = require("./models/index");

const app = express();

app.use(express.json());
app.use(cors());
sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("DB successfully");
  });
// sequelize.authenticate();

///////////////////////////

const edTemplate = require("./routers/rotues/Template");
const fileHistory = require("./routers/rotues/history");

///////////////////////////

app.use("/etl/template", edTemplate);
app.use("/etl/history", fileHistory);

////////////////////////////

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("server is running", PORT);
});
