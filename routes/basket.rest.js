const router = require('express').Router();
const async = require('hbs/lib/async');
const { Order } = require('../db/models');

// const req.body{product:[1, 2, 3, 4, 5]}

router.post('/', async (req, res) => { // создание нового заказа с перечнем товаров
  const { user_id } = req.session;
  const propuct_id = req.body.product; // [1,2,3,4,5]
  const numberOrder = await Order.findAll({
    attributes: ['order'],
    where: { user_id },
  });

  const lastIndex = numberOrder.lastIndexOf();
  if (lastIndex) {
    for (let i = 0; i < propuct_id.length; i++) {
      Order.create({ order: (numberOrder[lastIndex] + 1), user_id, product_id: product_id[i] });
    }
  } else {
    for (let i = 0; i < propuct_id.length; i++) {
      Order.create({ order: 1, user_id, product_id: product_id[i] });
    }
  }
  res.sendStatus(200);
});



module.exports = router;
