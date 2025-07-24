import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  alternatives: [String],
});

export const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
