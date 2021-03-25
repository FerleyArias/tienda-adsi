
import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  code: { type: String, required: true, maxlenght: 64, unique: true },
  name: { type: String, required: true, maxlenght: 50, unique: true },
  description: { type: String, maxlenght: 255 },
  price: { type: Number, required: true, default: 0 },
  stock: { type: Number, default: 0 },
  state: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("items", articleSchema);