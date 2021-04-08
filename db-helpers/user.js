import User from "../models/user.js";

const helpers = {
  userById: async (id) => {
    const exist = await User.findById(id);
    if (!exist) throw new Error(`No existe un usuario para este ID`);
  },
  userEmail: async (email) => {
    const exist = await User.findOne({email})
    if (exist) throw new Error('El email ya se encuentra en uso')
  }
};

export default helpers