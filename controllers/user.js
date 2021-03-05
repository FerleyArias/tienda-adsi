import User from "../models/user.js";
import bcrypt from "bcrypt";

const user = {
  //Obtener usuario
  userGet: async (req, res) => {
    const { value } = req.query;
    const user = await User.find({
      $or: [{ name: new RegExp(value, "i") }, { email: new RegExp(value, "i") }],
    });
    res.json({
      user,
    });
  },
  //Obtener usuario por ID
  userGetById: async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.json({
      user,
    });
  },
  //Añadir usuario
  userPost: async (req, res) => {
    const { name, email, password, rol } = req.body;
    const user = new User({ name, email, password, rol });
    user.password = bcrypt.hashSync(password, 10);
    await user.save();
    res.json({
      user,
    });
  },
  //Modificar usuario
  userModify: async (req, res) => {
    const { id } = req.params;
    const { _id, __v, state, createdAt,rol, email, ...remains } = req.body
    remains.password = bcrypt.hashSync(remains.password, 10);
    //1: buscar, 2: modificar
    const user = await User.findOneAndUpdate(id, remains);
    res.json({
      user,
    });
  },

  stateEnable: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: 1 });
    res.json({
      user,
    });
  },

  stateDisable: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: 0 });
    res.json({
      user,
    });
  }

}

export default user