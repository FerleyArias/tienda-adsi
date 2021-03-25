import mongoose from "mongoose";

const personSchema = mongoose.Schema({
  typePerson: {type: String, required: true,maxlength: 10},
  name: { type: String, required: true, maxlength: 50 },
  document: { type: String, maxlength: 30, required: true },
  idDocument: { type: String, maxlength: 20, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, unique: true, maxlength: 15 },
  email: { type: String, unique: true, lowercase: true, required: true },
  state: { type: Number, default: 1 },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("persons", personSchema);