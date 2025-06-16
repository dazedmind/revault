"use client";

import { useState } from "react";
import NavBar from "../component/NavBar";
import SettingsList from "../component/SettingsSideBar";
import ProtectedRoute from "../component/ProtectedRoute";
import { User, Settings, Info, SunMoon, Upload } from "lucide-react";
import { Toaster } from "sonner";
import useAntiCopy from "../hooks/useAntiCopy";
import { useTheme } from "next-themes";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLabel, setActiveLabel] = useState("Edit Profile");
  const { theme } = useTheme();
  // useAntiCopy();

  const settingsData = [
    {
      category: "General",
      labels: ["Edit Profile", "Change Password", "Appearance", "About Revault"],
      icon: [<User key="user" />, <Settings key="settings" />, <SunMoon key="sunmoon" />, <Info key="info" />]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col ">
        <ProtectedRoute>
          <nav>
            <NavBar />
          </nav>
        
          <div className="flex flex-col md:flex-row min-h-screen dark:bg-secondary gap-8">
            <aside className="w-auto md:min-h-screen md:pl-17 mt-8 ml-5 md:ml-0">
              {/* <h1 className="text-4xl font-bold">System Settings</h1> */}
              {settingsData.map((setting, index) => (
                <SettingsList
                  key={index}
                  category={setting.category}
                  labels={setting.labels}
                  icon={setting.icon}
                  categoryClassName="text-2xl font-bold mb-3"
                  ulClassName=""
                  labelClassName="pl-4 p-3 text-lg text-normal cursor-pointer m-2"
                />
              ))}
            </aside>

            <main className="flex-1 mt-0 md:mt-8 px-6 md:min-h-screen w-auto dark:bg-secondary">
              {children}
            </main>
          </div>
        </ProtectedRoute>
      </div>
      <Toaster />
    </div>
  );
}