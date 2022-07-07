const express = require("express");
const app = express();
const path = require("path");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// подключаем hbs
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// добавление локальной переменной во все хбс
app.use((req, res, next) => {
  res.locals.list = [
    {
      name: "парацетамол",
      picture: "https://f.stolichki.ru/s/drugs/large/10/10189.jpg",
      price: 500,
    },
    {
      name: "парацетамол",
      picture: "https://f.stolichki.ru/s/drugs/large/10/10189.jpg",
      price: 500,
    },
    {
      name: "парацетамол",
      picture: "https://f.stolichki.ru/s/drugs/large/10/10189.jpg",
      price: 500,
    },
  ];
  res.locals.sum = res.locals.list?.reduce((acc, el) => {
    acc + el.price
  },0)
  next();
});
app.use("/", mainRouter); // подключили роутер

app.listen(PORT, () => {
  console.log(`server start PORT ${PORT}`);
});
