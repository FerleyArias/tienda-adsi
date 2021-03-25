import Item from "../models/item.js";

const item = {
  get: async (req, res) => {
    const { value } = req.query;
    const item = await Item
      .find({
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("category", ["name", "description"]);
    res.json({
      item,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const item = await Item
      .findOne({ _id: id })
      .populate("category", ["name", "description"]);

    res.json({
      item,
    });
  },
  add: async (req, res) => {
    const { category, code, name, description, price, stock } = req.body;
    const item = new Item({
      category,
      code,
      name,
      description,
      price,
      stock,
    });
    await item.save();
    res.status(200).json({
      item,
    });
  },
  //Modificar datos
  modify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const item = await Item.findByIdAndUpdate(id, remains);
    res.json({
      item,
    });
  },

  enable: async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { state: 1 });
    res.json({
      item,
    });
  },

  disable: async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, { state: 0 });
    res.json({
      item,
    });
  },
};

export default item;