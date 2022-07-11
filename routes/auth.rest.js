const router = require("express").Router();
// нужен для шифрования пароля
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

// записываем пользователя в базу данных
router.post("/signup", async (req, res) => {
  const { userName, userEmail, userPass } = req.body;
  const mail = userEmail;
  // защифровываме пароль для базы данных
  const hashedPass = await bcrypt.hash(userPass, 6);
  // проверяем есть ли в базе данных  юзер если нет создаем нового
  const [newUser, created] = await User.findOrCreate({
    where: {
      mail,
    },
    defaults: {
      user_name: userName,
      pass: hashedPass,
    },
  });
  // отправляем в ответ  юзера
  if (created) {
    res.json(newUser);
    // пользователь сушествует
  } else {
    console.log("???? cсервер умер");
    res.sendStatus(501);
  }
});

router.post("/login", async (req, res) => {
  const { userEmail, userPass } = req.body;
  const mail = userEmail;
  // находим пользователя по эмейлу
  const userAuth = await User.findOne({ where: { mail } });
  // сравниваем пароль если ок отпровляем обьект юзера
  if (await bcrypt.compare(userPass, userAuth.pass)) {
    return res.json(userAuth);
  }
  res.sendStatus(401);
}); /// /done

module.exports = router;
