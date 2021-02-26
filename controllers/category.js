import Category from '..models/category.js'

const category = {
  categoryGet = async ( req, res ) => {
    const {value} = req.query
    const category = await category
      .find({
        $or:[
          {nombre:new RegExp(value, "i")},
          {description:new RegExp(value, "i")}
        ]
      })
      .sort({'createAt':-1})
  
    res.json({
      category
    })
  },
  
  categoryPost = async (req, res) => {
    const { name, description } = req.body
    const category = new Category({ name, description})
  
    res.json({
      category
    })
  },
  
  categoryById = async (req, res) => {
    const { id } = req.params
    const category = await category.findOne({ _id: id })
    res.json({
      category
    })
  }


}


export default category