import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  rol: { type: String, required: true, maxlength: 100 },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  state: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("userModel", userSchema);
