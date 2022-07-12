const router = require('express').Router();
const {
  Order, User, Cart, Product,
} = require('../db/models');

router.get('/', async (req, res) => {
  let orders;
  // console.log(req.session.user_id);
  try {
    orders = await Order.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['user_name', 'mail'],
        },
        {
          model: Cart,
          attributes: ['order_id', 'product_id', 'count'],
          include: [
            {
              model: Product,
              attributes: ['product_name', 'price', 'picture'],
            }],
        },
      ],
      // raw: true,
      // nest: true,
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
  console.log(orders[0].Carts[0].Product.product_name);
  return res.render('entries/personalArea', { orders });
});

module.exports = router;
