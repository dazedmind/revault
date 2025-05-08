"use client";
import { useState } from "react";
import AdminNavBar from '../components/AdminNavBar'
import SettingsList from "../components/SettingsSideBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLabel, setActiveLabel] = useState("Edit Profile");

  const settingsData = [
    {
      category: "General",
      labels: ["Edit Profile", "Change Password", "Appearance"],
    },
    {
      category: "Security",
      labels: ["Manage Users", "Activity Logs"],
    },
  ];

  return (
    <div className="h-full flex flex-col bg-midnight">
      <nav>
        <AdminNavBar />
      </nav>

      <div className="flex h-screen bg-midnight">
        <aside className="w-auto h-screen pl-17 pt-10 ml-5">
          <h1 className="text-4xl font-bold text-white-75">System Settings</h1>

          {settingsData.map((setting, index) => (
            <SettingsList
              key={index}
              category={setting.category}
              labels={setting.labels}
              categoryClassName="text-2xl text-white-75 font-bold mb-3 mt-10"
              ulClassName=""
              labelClassName="pl-4 p-3 text-lg text-normal cursor-pointer"
            />
          ))}
        </aside>

        <main className="flex-1 pt-29 pl-4 mb-500 h-screen w-fill">
          {children}
        </main>
      </div>
    </div>
  );
}
