const router = require('express').Router();
const { Order, Cart } = require('../db/models');

// const req.body{product:[1, 2, 3, 4, 5]}

router.post('/', async (req, res) => {
  try {
    // создание нового заказа с перечнем товаров
    const { user_id } = req.session;
    const product_id = req.body; // [{id:1, pr..},{id:2, pr..},{id:3, pr..}]
    const newOrder = await Order.create({
      user_id,
      status: 0,
    });

    for (let i = 0; i < product_id.length; i++) {
      Cart.create({
        order_id: newOrder.id,
        user_id,
        product_id: Number(product_id[i].id),
      });
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
