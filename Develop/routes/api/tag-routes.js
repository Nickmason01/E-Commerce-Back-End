const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include:[{model: Product}],
      include:[{model:ProductTag}]
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attribute: ['id','product_name', 'price', ' stock', 'category_id']
        },
        {
          model:ProductTag,
          attribute:[ 'id', 'product_id', 'tag_id']
        }
      ],
    });
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      ...req.body,
      tag_name: req.tag_name,
    });
    res.status(200).json(newTag);
  }catch (err) {
    res.status(400).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try{
    const updateTag = await Category.update({
      where: {
        id:req.params.id,
      },
    });

    if(!updateTag) {
      res.status(404).json({message: "No Tag by that ID!"});
      return;
    }
    res.status(200).json(updateTag);
  }catch (err) {
    res.status(500).json(err);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where:{
        id:req.params.id,
        tag_id: req.tag_id,
      },
    });

    if(!tagData) {
      res.status(404).json({message: "No Tag by that ID!"});
      return;
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
