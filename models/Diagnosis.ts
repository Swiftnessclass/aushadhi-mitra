import mongoose, { Schema, models } from "mongoose";

const DiagnosisSchema = new Schema({
  symptoms: [String],
  diagnosis: String,
});

export const Diagnosis = models.Diagnosis || mongoose.model("Diagnosis", DiagnosisSchema);
