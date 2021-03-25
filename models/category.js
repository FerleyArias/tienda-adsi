import mongoose from 'mongoose'

const CategorySchema=mongoose.Schema({
  name:{type:String, required:true, maxlength:50, unique:true},
  description:{type:String, maxlength:150},
  state:{type:Number, default:1},
  createdAt:{type:Date, default:Date.now}
})

export default mongoose.model('categories', CategorySchema)