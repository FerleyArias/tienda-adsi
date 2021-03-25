import Sale from "../models/sale.js";

const sale = {
  get: async (req, res) => {
    const { value } = req.query;
    const sale = await Sale.find({
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      sale,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await Sale
      .findOne({ _id: id })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      sale,
    });
  },
  add: async (req, res) => {
    const {
      user,
      person,
      typeProof,
      serieProof,
      numProof,
      total,
      tax,
      details,
    } = req.body;
    const sale = new Sale({
      user,
      person,
      typeProof,
      serieProof,
      numProof,
      total,
      tax,
      details,
    });

    await sale.save();
    res.status(200).json({
      sale,
    });
  },
  //Modificar datos
  modify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const sale = await Sale.findByIdAndUpdate(id, remains);
    res.json({
      sale,
    });
  },

  enable: async (req, res) => {
    const { id } = req.params;
    const sale = await Sale.findByIdAndUpdate(id, { state: 1 });
    res.json({
      sale,
    });
  },

  disable: async (req, res) => {
    const { id } = req.params;
    const sale = await Sale.findByIdAndUpdate(id, { state: 0 });
    res.json({
      sale,
    });
  },
};

export default sale;