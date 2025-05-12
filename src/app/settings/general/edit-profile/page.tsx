"use client";
import InputField from "@/app/component/InputField";
import Image from "next/image";
import avatar from "@/app/img/user.jpg";
import { Button } from "@/components/ui/button";
import WarningMessage from "@/app/component/WarningMessage";
import { FaMicrosoft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/component/LoadingScreen";
import { useTheme } from "next-themes";
const EditProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json(); // <-- move this here regardless of res.ok

        if (!res.ok) {
          console.error(
            "Failed to fetch profile:",
            data?.error || res.statusText,
          );
          return;
        }

        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className={`flex flex-col w-auto mr-10 ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} p-6 pb-10 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Edit Profile</h1>
      {/* divider */}

      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      {/* Warning message from WarningMessage.tsx */}

      <div className="relative w-full mt-5">
        <WarningMessage
          containerClassName="w-xl"
          textClassName=" "
          message="Contact your admin if you want to request to change your Student Information"
        />

        {/* Image positioned absolutely */}
        <Image
          src={avatar}
          alt="Avatar"
          className="w-[124px] h-[124px] rounded-full absolute top-0 right-25"
        />
      </div>

      {!loading && profile && (
        <>
          <InputField
            containerClassName="mt-5"
            label="Name"
            type="text"
            name="fullName"
            placeholder={`${profile.users.first_name || ""} ${profile.users.last_name || ""}`}
            inputClassName="w-sm ml-5 h-14 dark:bg-secondary"
            labelClassName="ml-5"
            value={undefined}
            onChange={undefined}
          />

          <InputField
            containerClassName="pt-4"
            label="Student Number"
            type="number"
            name="studentNumber"
            placeholder={profile.student_num || profile.employee_id}
            inputClassName="w-sm ml-5 h-14 dark:bg-secondary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            labelClassName="ml-5"
            value={undefined}
            onChange={undefined}
          />

          <InputField
            containerClassName="pt-4"
            label="Program/Department"
            type="text"
            name="program"
            placeholder={profile.program || profile.department}
            inputClassName="w-sm ml-5 h-14 dark:bg-secondary cursor-not-allowed"
            labelClassName="ml-5"
            value={undefined}
            onChange={undefined}
          />

          <span className="relative">
            <InputField
              containerClassName="pt-4"
              label="Email"
              type="email"
              name="email"
              placeholder={profile.users.email || ""}
              inputClassName="w-sm ml-5 h-14 dark:bg-secondary"
              labelClassName="ml-5"
              disabled={false}
              value={undefined}
              onChange={undefined}
            />

            <Button className="absolute bottom-0 right-30 bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer text-white">
              Save Changes
            </Button>
          </span>
        </>
      )}

      <h1 className="text-2xl ml-1 mt-10">Manage Linked Accounts</h1>

      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between mt-5 dark:bg-secondary">
        <div className="flex flex-row justify-center items-center gap-2">
          <FaMicrosoft />
          <p className="text-base font-normal">Microsoft</p>
        </div>
        <Button className="bg-gradient-to-r from-teal-gradient-left to-teal-gradient-right hover:bg-gradient-to-br font-inter cursor-pointer w-[100px]">
          Link
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
