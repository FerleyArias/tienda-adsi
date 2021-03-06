import Sale from "../models/sale.js";

const helpers = {
  byId: async (id) => {
    const exist = await Sale.findById(id);
    if (!exist) throw new Error(`No existe una venta para este ID`);
  },
};

export default helpers;
