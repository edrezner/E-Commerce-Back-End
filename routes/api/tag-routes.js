const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        attributes: [],
      },
    ],
  })
    .then((tag) => {
      res.json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;

  Tag.findByPk(tagId, {
    include: [
      {
        model: Tag,
        through: ProductTag,
        attributes: [],
      },
    ],
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "Tag not found" });
        return;
      }

      res.json(tag);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  Tag.destroy(tagId, {
    where: {
      id: tagId,
    },
  })
    .then((deletedRows) => {
      if (deletedRows === 0) {
        res.status(404).json({ message: "Tag not found" });
        return;
      }

      res.json({ message: "Tag deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
