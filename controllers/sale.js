import Sale from "../models/sale.js";
import Stock from "../db-helpers/stock.js"

const sale = {
  //Obtener
  get: async (req, res) => {
    const { value } = req.query;
    const sale = await Sale
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
      details,
    } = req.body;

    //total
    const total = details.reduce((acc, article) => acc + ((article.quantity * article.price) - article.discount), 0) 
    //tax
    const tax = total * 0.19

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
    details.map((item) => Stock.disminuirStock(item._id,item.quantity))
    res.status(200).json({
      sale,
    });
  },
  enable: async (req, res) => {
    const { id } = req.params;
    const sale = await Sale.findByIdAndUpdate(id, { state: 1 });
    sale.details.map((item) => Stock.disminuirStock(item._id,item.quantity))
    res.json({
      sale,
    });
  },
  disable: async (req, res) => {
    const { id } = req.params;
    const sale = await Sale.findByIdAndUpdate(id, { state: 0 });
    sale.details.map((item) => Stock.aumentarStock(item._id,item.quantity))
    res.json({
      sale,
    });
  },
};

export default sale;