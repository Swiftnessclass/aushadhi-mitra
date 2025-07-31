import { IAppointment } from "@/models/appointment";

type Props = {
  appointments: IAppointment[];
};

export default function Appointments({ appointments }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((apt) => (
            <li key={apt._id?.toString()}>
              <strong>{apt.doctor}</strong> on {new Date(apt.date).toDateString()} at{" "}
              {apt.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
