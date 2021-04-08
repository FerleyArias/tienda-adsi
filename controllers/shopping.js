import Shopping from "../models/shopping.js";
import Stock from "../db-helpers/stock.js"

const shopping = {
  //Obtener
  get: async (req, res) => {
    const { value } = req.query;
    const shopping = await Shopping
      .find({
        $or: [
          { typeProof: new RegExp(value, "i") },
          { numProof: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      shopping,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const shopping = await Shopping
      .findOne({ _id: id })
      .populate("user", ["name", "email"])
      .populate("person ", ["name", "idDocument"]);

    res.json({
      shopping,
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
    const shopping = new Shopping({
      user,
      person,
      typeProof,
      serieProof,
      numProof,
      total,
      tax,
      details,
    });

    //total
    shopping.total = shopping.details.reduce((acc, item) => acc + (item.quantity * item.price), 0)
    //tax
    shopping.tax = shopping.total * 0.19
    await shopping.save();
    details.map((item) => Stock.disminuirStock(item._id,item.quantity))
    res.status(200).json({
      shopping,
    });
  },
  enable: async (req, res) => {
    const { id } = req.params;
    const shopping = await Shopping.findByIdAndUpdate(id, { state: 1 });
    shopping.details.map((item) => Stock.disminuirStock(item._id,item.quantity))
    res.json({
      shopping,
    });
  },
  disable: async (req, res) => {
    const { id } = req.params;
    const shopping = await Shopping.findByIdAndUpdate(id, { state: 0 });
    shopping.details.map((item) => Stock.aumentarStock(item._id,item.quantity))
    res.json({
      shopping,
    });
  },
};

export default shopping;