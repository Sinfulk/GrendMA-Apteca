const router = require("express").Router();
const { Product } = require("../db/models");

router.get("/", async (req, res) => {
  let products;

  try {
    products = await Product.findAll();
  } catch (error) {
    return res.render("error", {
      message: "Не удалось получить записи из базы данных.",
      error: {},
    });
  }

  return res.render("main", { products });
});

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;