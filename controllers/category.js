import Category from '../models/category.js'

const category = {
  categoryGet: async (req, res) => {
    const {value} = req.query
    const category = await category
      .find({
        $or:[
          {nombre:new RegExp(value, "i")},
          {description:new RegExp(value, "i")}
        ]
      })
      .sort({createAt:-1})
  
    res.json({
      category
    })
  },
  
  categoryPost: async (req, res) => {
    const { name, description } = req.body
    const category = new Category({ name, description})
    await category.save();

    res.json({
      category
    })
  },
  
  categoryById: async (req, res) => {
    const { id } = req.params
    const category = await Category.findOne({ _id: id })
    res.json({
      category
    })
  },

  categoryModify: async (req, res) => {
    const { id } = req.params;
    const { _id, createdAt, __v, state, ...remains } = req.body;
    const category = await Category.findByIdAndUpdate(id, remains);
    res.json({
      category,
    });
  },

  stateEnable: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: 1 });
    res.json({
      category,
    });
  },

  stateDisable: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { state: 0 });
    res.json({
      category,
    });
  },

  categoryDelete: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.json({
      category,
    });
  }  
}


export default category