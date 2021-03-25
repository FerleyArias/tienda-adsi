import Person from "../models/person.js";

const helpers = {
  byId: async (id) => {
    const exist = await Person.findById(id);
    if (!exist) throw new Error(`No existe una venta para este ID`);
  },
  byIdDocument: async (idDocument) => {
    const exist = await Person.findOne({ idDocument });
    if (exist) throw new Error(`Ya existe una persona con este documento`);
  },
  byPhone: async (phone) => {
    const exist = await Person.findOne({ phone });
    if (exist) throw new Error(`Ya existe una persona con este telefono`);
  },
  byEmail: async (email) => {
    const exist = await Person.findOne({ email });
    if (exist) throw new Error(`Ya existe una persona con este email`);
  },
};

export default helpers;