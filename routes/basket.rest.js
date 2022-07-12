const router = require('express').Router();
const { Order, Cart } = require('../db/models');

// const req.body{product:[1, 2, 3, 4, 5]}

router.post('/', async (req, res) => {
  try {
    // создание нового заказа с перечнем товаров
    const { user_id } = req.session;
    const product_id = req.body; // [1,2,3,4,5]
    // const numberOrder = await Order.findAll({
    //   attributes: ['order'],
    //   where: { user_id },
    // });
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

    // });

    // const lastIndex = numberOrder.length - 1;
    // if (numberOrder.length) {
    //   for (let i = 0; i < product_id.length; i++) {
    //     await Order.create({
    //       order: numberOrder.length + 1,
    //       user_id,
    //       product_id: +product_id[i].id,
    //     });
    //   }
    // } else {
    //   for (let i = 0; i < product_id.length; i++) {
    //     console.log(product_id[i].id);
    //     await Order.create({
    //       order: 1,
    //       user_id,
    //       product_id: +product_id[i].id,
    //     });
    //   }
    // }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
