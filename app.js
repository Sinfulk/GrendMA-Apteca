/* eslint-disable max-len */
const express = require("express");

const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session"); // птицын подключил сессию
const FileStore = require("session-file-store")(session); // птицын подключил
const logger = require("morgan"); // птицын middleware morgan с режимом логирования "dev",
require("dotenv").config();

// Импортируем созданный в отдельный файлах рутеры.
const mainRouter = require("./routes/mainRouter");
const entriesRouter = require("./routes/entries");
const authRouter = require("./routes/auth.rest");
const basketRouter = require("./routes/basket");

const PORT = process.env.PORT || 8080;

// подключаем hbs
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Подключаем middleware morgan с режимом логирования "dev", чтобы для каждого HTTP-запроса на сервер в консоль выводилась информация об этом запросе.
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true })); // чтобы парсить форма
// Подключаем middleware, которое сообщает epxress, что в папке "ПапкаПроекта/public" будут находится статические файлы, т.е. файлы доступные для скачивания из других приложений.
app.use(express.static(path.join(__dirname, "public")));
// Подключаем middleware, которое позволяет читать содержимое body из HTTP-запросов типа POST, PUT и DELETE.
app.use(express.urlencoded({ extended: true }));
// Подключаем middleware, которое позволяет читать переменные JavaScript, сохранённые в формате JSON в body HTTP-запроса.
app.use(express.json()); // чтобы парсить json

const sessionConfig = {
  name: "user_sid", // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? "test", // Секретное слово для шифрования, может быть любым
  store: new FileStore(),
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.userName = req.session?.userName;
  next();
});

app.use("/basket", basketRouter);
app.use("/", mainRouter);
app.use("/entries", entriesRouter);
app.use("/log", authRouter);

app.listen(PORT, () => {
  console.log(`server start PORT ${PORT}`);
});
