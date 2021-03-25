import Person from "../models/person.js";

const person = {
  get: async (req, res) => {
    const { value } = req.query;
    const person = await Person
      .find({
        $or: [
          { name: new RegExp(value, "i") },
          { description: new RegExp(value, "i") },
        ],
      })
      .sort({ createdAt: -1 });
    res.json({
      person,
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const person = await Person.findOne({ _id: id });

    res.json({
      person,
    });
  },
  add: async (req, res) => {
    const {
      typePerson,
      name,
      document,
      idDocument,
      address,
      phone,
      email,
    } = req.body;
    const person = new Person({
      typePerson,
      name,
      document,
      idDocument,
      address,
      phone,
      email,
    });
    await person.save();
    res.status(200).json({
      person,
    });
  },
  //Modificar datos
  modify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const person = await Person.findByIdAndUpdate(id, remains);
    res.json({
      person,
    });
  },

  enable: async (req, res) => {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, { state: 1 });
    res.json({
      person,
    });
  },

  disable: async (req, res) => {
    const { id } = req.params;
    const person = await Person.findByIdAndUpdate(id, { state: 0 });
    res.json({
      person,
    });
  },
};

export default person;