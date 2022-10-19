const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include:[{model: Product}],
  
    });
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attribute: ['id','product_name', 'price', ' stock', 'category_id']
        },
      ],
    });
    res.status(200).json(categoryData)
  }catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      id: req.body.category_id,
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  }catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.body.category.id,
      },
    });

    if(!updateCategory) {
      res.status(404).json({message: "No Category by that ID!"});
      return;
    }
    console.log(updateCategory);
    res.status(200).json(updateCategory);
  }catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where:{
        id:req.body.category.id,
        category_id: req.body.category_id,
      },
    });

    if(!categoryData) {
      res.status(404).json({message: "No Category by that ID!"});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
