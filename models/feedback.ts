import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  schemeId: mongoose.Schema.Types.ObjectId,
  feedback: String,
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
