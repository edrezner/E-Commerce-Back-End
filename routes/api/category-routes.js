const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;

  Tag.findByPk(categoryId, {
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((category) => {
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.json(category);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((isUpdated) => {
      res.status(200).json({
        message: isUpdated ? "Category is updated." : "Nothing to update.",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;

  Tag.destroy(categoryId, {
    where: {
      id: categoryId,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.json({ message: "Category deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
