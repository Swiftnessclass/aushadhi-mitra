"use client";

import { useEffect, useState } from "react";
import ProfileSummary, { Profile } from "@/components/dashboard/ProfileSummary"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <ProfileSummary profile={profile} />
    </div>
  );
}
