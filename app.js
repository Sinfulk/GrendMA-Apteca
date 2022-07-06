const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// подключаем hbs
app.set("view engine", "hbs");

// добавление локальной переменной во все хбс
app.use((req, res, next) => {
  res.locals.hello = "Hello from locals";
  next();
});

app.use("/", mainRouter); // подключили роутер

app.listen(PORT, () => {
  console.log(`server start PORT ${PORT}`);
});
