const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// подключаем hbs
app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.urlencoded({ extended: true })); // чтобы парсить форма
app.use(express.json()); // чтобы парсить json
app.use(express.static(path.join(__dirname, "public")));
app.use("/", mainRouter); // подключили роутер

app.listen(PORT, () => {
  console.log(`server start PORT ${PORT}`);
});
