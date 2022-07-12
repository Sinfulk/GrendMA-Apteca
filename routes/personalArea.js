const router = require('express').Router();
const { Order, User } = require('../db/models');

router.get('/', async (req, res) => {
  let orders;
  console.log(req.session.user_id);
  try {
    orders = await User.findByPk(req.session.user_id, {
      include: { 
        model: Order,
         
      },
    });
    // orders = await User.findAll({
    //   where: { mail: req.session.userEmail },
    //   include: { model: Order },
    // });
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось получить записи из базы данных.',
      error: {},
    });
  }
  console.log(orders);
  return res.render('entries/personalArea', { orders });
});

module.exports = router;
