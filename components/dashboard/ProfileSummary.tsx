export type Profile = {
  name: string;
  age: number;
  gender: string;
  location: string;
  language: string;
};

export default function ProfileSummary({ profile }: { profile: Profile }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">👤 Profile Summary</h3>
      <ul className="text-sm space-y-1">
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Age:</strong> {profile.age}</li>
        <li><strong>Gender:</strong> {profile.gender}</li>
        <li><strong>Location:</strong> {profile.location}</li>
        <li><strong>Language:</strong> {profile.language}</li>
      </ul>
    </div>
  );
}
