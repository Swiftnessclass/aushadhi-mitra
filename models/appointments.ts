import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  doctor: string;
  date: Date;
  location: string;
  reason: string;
  registeredUsers: { type: [String], default: [] }
}

// ✅ Serialized version for Client Components
export interface SerializedAppointment {
  _id: string;
  userId: string;
  doctor: string;
  date: string;
  location: string;
  reason: string;


}

const appointmentSchema = new Schema<IAppointment>({
  userId: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  reason: { type: String, required: true },
  registeredUsers: { type: [String], default: [] }

});

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;