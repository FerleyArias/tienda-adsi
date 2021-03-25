import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "persons",
    required: true,
  },
  typeProof: { type: String, required: true, maxlength: 20 },
  serieProof: { type: String, maxlength: 10 },
  numProof: { type: String, maxlength: 10, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [
    {
      _id: { type: String, required: true },
      article: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
    },
  ],
  state: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("sales", saleSchema);