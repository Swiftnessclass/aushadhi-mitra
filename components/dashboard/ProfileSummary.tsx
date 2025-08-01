export type Profile = {
  name: string;
  age: number;
  gender: string;
  location: string;
  language: string;
};

export default function ProfileSummary({ profile }: { profile: Profile }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
    <h3 className="text-lg font-semibold text-blue-900">👤 Profile Summary</h3>
    <ul className="text-sm text-gray-700 space-y-1">
      <li><span className="font-semibold text-gray-800">Name:</span> {profile.name}</li>
      <li><span className="font-semibold text-gray-800">Age:</span> {profile.age}</li>
      <li><span className="font-semibold text-gray-800">Gender:</span> {profile.gender}</li>
      <li><span className="font-semibold text-gray-800">Location:</span> {profile.location}</li>
      <li><span className="font-semibold text-gray-800">Language:</span> {profile.language}</li>
    </ul>
  </div>
  
  );
}
