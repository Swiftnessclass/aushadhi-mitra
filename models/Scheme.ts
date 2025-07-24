import mongoose from "mongoose";

const SchemeSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  minAge: Number,
  maxIncome: Number,
});

export default mongoose.models.Scheme || mongoose.model("Scheme", SchemeSchema);
