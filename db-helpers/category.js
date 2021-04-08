import Category from "../models/category.js"

const categoryHelpers = {
  byId: async (id) => {
    const exist = await Category.findById(id)

    if(!exist) throw new Error(`No existe categoria con este ID: ${id}`) 
  },
  
  byName: async (nombre) => {
    const exist = await Category.findOne({nombre})

    if(exist) throw new Error(`Ya existe una  categoria con este nombre: ${nombre}`) 
  }
}

export default categoryHelpers