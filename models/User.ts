import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
  location: String,
  language: String,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
