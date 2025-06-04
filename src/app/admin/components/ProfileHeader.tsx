// src/app/admin/components/ProfileHeader.tsx
"use client";

import React from "react";
import ProfileLoader from "@/app/component/ProfileLoader";
import AdminNavBar from "./AdminNavBar";
import { ProfileCard } from "@/app/component/ProfileCard";
import avatar from "@/app/img/user.png";

// Updated interface to match new auth system
interface ProfileHeaderProps {
  profile: {
    user_id: number;
    firstName: string;
    role: string;
    email: string;
    userNumber?: string;
    // Additional fields that might come from the user profile
    lastName?: string;
    middleName?: string;
    profile_picture?: string;
    position?: string;
    department?: string;
    college?: string;
  } | null;
  loading: boolean;
}

export function ProfileHeader({ profile, loading }: ProfileHeaderProps) {
  // Add detailed logging to see what we're receiving
  console.log("🔍 ProfileHeader received profile:", profile);
  console.log("🔍 Profile loading state:", loading);

  if (loading) {
    return <ProfileLoader />;
  }

  if (!profile) {
    console.log("❌ No profile data available");
    return (
      <>
        <AdminNavBar />
        <div className="p-8 text-center">Unable to load profile.</div>
      </>
    );
  }

  // Helper function to get role display name
  const getRoleDisplayName = (role: string) => {
    const roleMapping: { [key: string]: string } = {
      ADMIN: "Administrator",
      ASSISTANT: "Admin Assistant",
      LIBRARIAN: "Librarian-in-Charge",
      FACULTY: "Faculty",
      STUDENT: "Student",
    };
    return roleMapping[role] || role;
  };

  // Helper function to get department/college info
  const getDepartmentInfo = () => {
    if (profile.department) return profile.department;
    if (profile.college) return profile.college;

    // Default based on role
    switch (profile.role) {
      case "ADMIN":
      case "ASSISTANT":
      case "LIBRARIAN":
        return "Administrative Office";
      default:
        return "PLM";
    }
  };

  // Enhanced name construction function
  const constructFullName = () => {
    const nameParts = [];

    // Add first name (required)
    if (profile.firstName?.trim()) {
      nameParts.push(profile.firstName.trim());
    }

    // Add middle name/initial only if it has actual content
    if (profile.middleName?.trim()) {
      nameParts.push(profile.middleName.trim());
    }

    // Add last name if available
    if (profile.lastName?.trim()) {
      nameParts.push(profile.lastName.trim());
    }

    // Join with spaces and return
    const fullName = nameParts.join(" ");

    console.log("👤 Constructing name:", {
      firstName: profile.firstName,
      middleName: profile.middleName,
      lastName: profile.lastName,
      result: fullName,
    });

    return fullName;
  };

  const displayName = constructFullName() || profile.firstName || "Admin User";

  console.log("🎯 Final display name:", displayName);
  console.log("📋 Profile data being sent to ProfileCard:", {
    name: displayName,
    number: profile.userNumber || profile.user_id?.toString() || "",
    college: getDepartmentInfo(),
    programOrDept: profile.department || "",
    position: profile.position || getRoleDisplayName(profile.role),
    profile_picture: profile.profile_picture || avatar,
  });

  return (
    <>
      <AdminNavBar />
      <ProfileCard
        profile_picture={profile.profile_picture || avatar}
        name={displayName}
        number={profile.userNumber || profile.user_id?.toString() || ""}
        college={getDepartmentInfo()}
        programOrDept={profile.department || ""}
        position={profile.position || getRoleDisplayName(profile.role)}
      />
    </>
  );
}
