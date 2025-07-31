// models/apointUser.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  language: string;
}

const userSchema = new Schema<IUser>({
  userId: String,
  name: String,
  age: Number,
  gender: String,
  location: String,
  language: String,
});

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);
