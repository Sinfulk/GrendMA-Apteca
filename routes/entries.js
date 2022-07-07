const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/auth", (req, res) => {
  // отправить на ручку работы с базой данных
  res.render("entries/authentication");
});

///  POST signup
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
    res.redirect("/");
  } else {
    const message = "Такой пользователь уже существует!";
    res.render("entries/authentication", { message });
  }
});

///  POST login

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
  // if (response.ok) {
  //   const userAuth = await response.json();
  //   req.session.userName = newUser.userName;
  //   res.redirect('/');
  // } else {
  //   res.send('Ошибочка какая-то');
  // }
});
module.exports = router;
