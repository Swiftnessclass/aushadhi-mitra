import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,
  latitude: Number,
  longitude: Number,
});

export const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);
