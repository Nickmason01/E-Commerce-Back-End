const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attribute: ["id", "product_name", "price", " stock", "category_id"],
        },
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const newCategory = await Category.create(req.body);
  newCategory ? res.status(200).json(newCategory) : res.status(400).json(err);
});

router.put("/:id", async (req, res) => {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  if (!updateCategory) {
    res.status(404).json({ message: "No Category by that ID!" });
    return;
  }
  console.log(updateCategory);
  res.status(200).json(updateCategory);

  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!categoryData) {
    res.status(404).json({ message: "No Category by that ID!" });
    return;
  } else {
    res.status(200).json(categoryData);
  }
});

module.exports = router;
