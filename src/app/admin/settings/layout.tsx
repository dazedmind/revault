"use client";

import { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import SettingsList from "../components/SettingsSideBar";
import ProtectedRoute from "../../component/ProtectedRoute";
import { Activity, Info, Paintbrush, Settings, User } from "lucide-react";

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
      icon: [<User />, <Settings />, <Paintbrush />]
    },
    {
      category: "Security",
      labels: ["Manage Users", "Activity Logs", "About Revault"],
      icon: [<User />, <Activity />, <Info />]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col bg-midnight">
        <ProtectedRoute>
          <nav>
            <AdminNavBar />
          </nav>

          <div className="flex min-h-screen dark:bg-secondary">
            <aside className="w-auto min-h-screen pl-17 mt-10 ml-5">
              <h1 className="text-4xl font-bold">System Settings</h1>

              {settingsData.map((setting, index) => (
                <SettingsList
                  key={index}
                  category={setting.category}
                  labels={setting.labels}
                  categoryClassName="text-2xl font-bold mb-3 mt-10"
                  ulClassName=""
                  labelClassName="pl-4 p-3 text-lg text-normal cursor-pointer"
                  icon={setting.icon}
                />
              ))}
            </aside>

            <main className="flex-1 mt-29 pl-4 min-h-screen w-auto dark:bg-secondary">
              {children}
            </main>
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
}
