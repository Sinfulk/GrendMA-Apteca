const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/auth", (req, res) => {
  // отправить на ручку работы с базой данных
  res.render("entries/authentication");
});

router.get("/logout", (req, res) => {
  /// убивает сессию
  req.session.destroy();
  res.clearCookie("user_sid").redirect("/");
});

///  POST signup феч на бэк проверяем есть ли такой емейл
router.post("/signup", async (req, res) => {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/log/signup`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  if (response.ok) {
    const newUser = await response.json();
    req.session.userName = newUser.user_name;
    req.session.user_id = newUser.id;
    res.redirect("/");
  } else {
    const message = "Такой пользователь уже существует!";
    res.render("entries/authentication", { message });
  }
});

///  POST login фечь на бэк
router.post("/login", async (req, res) => {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/log/login`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  if (response.ok) {
    const userAuth = await response.json();
    req.session.userName = userAuth.user_name;
    req.session.user_id = userAuth.id;
    res.redirect("/");
  } else {
    const message = "Не верное имя пользователя или пароль!";
    res.render("entries/authentication", { message });
  }
});
module.exports = router;
