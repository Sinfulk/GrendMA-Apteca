const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.post('/signup', async (req, res) => {
  const { userName, userEmail, userPass } = req.body;
  const mail = userEmail;
  const hashedPass = await bcrypt.hash(userPass, 6);
  const [newUser, created] = await User.findOrCreate({
    where: {
      mail,
    },
    defaults: {
      user_name: userName,
      pass: hashedPass,
    },
  });
  if (created) {
    res.json(newUser);
  } else {
    res.sendStatus(501);
  }
}); /// / done

router.post('/login', async (req, res) => {
  const { userEmail, userPass } = req.body;
  const mail = userEmail;
  const userAuth = await User.findOne({ where: { mail } });
  if (await bcrypt.compare(userPass, userAuth.pass)) {
    return res.json(userAuth);
  }
  res.sendStatus(401);
}); /// /done

module.exports = router;
