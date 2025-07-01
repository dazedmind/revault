"use client";

import { useEffect, useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import SettingsList from "../components/SettingsSideBar";
import ProtectedRoute from "../../component/ProtectedRoute";
import { Activity, Cog, Info, Settings, SunMoon, FolderSync, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userType, setUserType] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState("Edit Profile");
  const { theme } = useTheme();
  
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  if (userType === null) {
    // You can show a loading spinner or blank screen to avoid hydration mismatch
    return null;
  }

  const settingsData = [
    {
      category: "General",
      labels: ["Edit Profile", "Change Password", "Appearance"],
      icon: [<User key="user" />, <Settings key="settings" />, <SunMoon key="sunmoon" />],
    },
    {
      category: "Security",
      labels:
        userType === "LIBRARIAN"
          ? ["Activity Logs", "About Revault"]
          : userType === "ASSISTANT"
          ? ["Manage Users", "Activity Logs", "About Revault"]
          : ["Manage Users", "Activity Logs", "Backup Files", "About Revault"],
      icon: 
        userType === "LIBRARIAN"
        ? [<Activity key="activity" />, <Info key="info" />]
        : userType === "ASSISTANT"
        ? [<User key="user2" />, <Activity key="activity" />, <Info key="info" />]
        : [<User key="user2" />, <Activity key="activity" />, <FolderSync />, <Info key="info" />],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col bg-midnight">
        <ProtectedRoute>
          <nav>
            <AdminNavBar />
          </nav>
           {/* Hero Section */}
   

          <div className="flex flex-col md:flex-row min-h-screen dark:bg-secondary gap-8">
            <aside className="w-auto md:min-h-screen md:pl-17 mt-8 ml-5 md:ml-0">
              {settingsData.map((setting, index) => (
                <SettingsList
                  key={index}
                  category={setting.category}
                  labels={setting.labels}
                  categoryClassName="text-2xl font-bold mb-3"
                  ulClassName=""
                  labelClassName="pl-4 p-3 text-lg text-normal cursor-pointer m-2"
                  icon={setting.icon}
                />
              ))}
            </aside>

            <main className="flex-1 mt-0 md:mt-8 px-6 md:min-h-screen w-auto dark:bg-secondary">
              {children}
            </main>
          </div>
        </ProtectedRoute>
      </div>
    </div>
  );
}
