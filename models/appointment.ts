// models/appointment.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  doctor: string;
  date: Date;
  location: string;
  reason: string;
}

const appointmentSchema = new Schema<IAppointment>({
  userId: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  reason: { type: String, required: true },
});

const Appointment =
  models.Appointment || model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
