import Item from "../models/item.js";

const helpers = {
  byId: async (id) => {
    const exist = await Item.findById(id);
    if (!exist) throw new Error(`No existe un articulo para este ID`);
  },
  byName: async (name) => {
    const exist = await Item.findOne({ name });
    if (exist) throw new Error(`Ya existe un aritculo con este nombre`);
  },
  byCode: async (code) => {
    const exist = await Item.findOne({ code });
    if (exist) throw new Error(`Ya existe un articulo con este codigo`);
  }
};

export default helpers;