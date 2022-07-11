const router = require('express').Router();
const { Order } = require('../db/models');

router.get('/', async (req, res) => {
  let orders;
  console.log(req.session.user_id);
  try {
    orders = await Order.findAll({
      where: { user_id: req.session.user_id },
    });
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
