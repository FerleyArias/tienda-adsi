import Item from "../models/item.js";

const stock = {
  disminuirStock: async (_id, cantidad) => {
    let { stock } = await Item.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad);
    await Item.findByIdAndUpdate({ _id }, { stock });
  },
  aumentarStock: async (_id, cantidad) => {
    let { stock } = await Item.findById(_id);
    stock = parseInt(stock) + parseInt(cantidad);
    await Item.findByIdAndUpdate({ _id }, { stock });
  },
};

export default stock;