const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

router.post("/signup", async (req, res) => {
  const { user_name, mail, pass } = req.body;
  const hashedPass = await bcrypt.hash(pass, 6);
  const [newUser, created] = await User.findOrCreate({
    where: {
      mail,
    },
    defaults: {
      user_name,
      pass: hashedPass,
    },
  });
  if (created) {
    res.json(newUser);
  } else {
    res.sendStatus(501);
  }
}); //// done

router.post("/login", async (req, res) => {
  const { mail, pass } = req.body;
  const userAuth = await User.findOne({ where: { mail } });
  if (await bcrypt.compare(pass, userAuth.pass)) {
    res.json(userAuth);
  }
  res.sendStatus(300);
});

module.exports = router;
