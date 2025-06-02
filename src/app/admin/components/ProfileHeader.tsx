// src/app/admin/profile/components/ProfileHeader.tsx
"use client";

import React from "react";
import ProfileLoader from "@/app/component/ProfileLoader";
import AdminNavBar from "./AdminNavBar";
import { ProfileCard } from "@/app/component/ProfileCard";
import avatar from "@/app/img/user.png";

interface ProfileHeaderProps {
  profile: {
    users: {
      first_name: string;
      last_name: string;
      profile_picture?: string;
      role?: string;
    };
    employee_id: string;
    college?: string;
    programOrDept?: string;
    position: string;
  } | null;
  loading: boolean;
}

export function ProfileHeader({ profile, loading }: ProfileHeaderProps) {
  if (loading) {
    return <ProfileLoader />;
  }

  if (!profile) {
    return <div className="p-8 text-center">Unable to load profile.</div>;
  }

  return (
    <>
      <AdminNavBar />
      <ProfileCard
        profile_picture={profile.users.profile_picture || avatar}
        name={`${profile.users.first_name} ${profile.users.last_name}`}
        number={profile.employee_id}
        college={profile.college || ""}
        programOrDept={profile.programOrDept || ""}
        position={profile.position}
      />
    </>
  );
}
