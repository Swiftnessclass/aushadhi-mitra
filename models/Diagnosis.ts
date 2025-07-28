import mongoose from "mongoose";

const DiagnosisSchema = new mongoose.Schema({
  symptoms: [String],
  diagnosis: String,
});

export const Diagnosis = mongoose.models.Diagnosis || mongoose.model("Diagnosis", DiagnosisSchema);
