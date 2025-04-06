import NavBar from "../component/NavBar";
import SettingsList from "../component/SettingsSideBar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to 'Edit Profile'

  // Array of category and its respective labels array
  const settingsData = [
    {
      category: "General",
      labels: [
        "Edit Profile",
        "Change Password",
        "Appearance"      
      ],
    },
    {
      category: "Security & Privacy",
      labels: ["Two-Factor Authentication", "Account Activity Log"],
    },
  ];

  // A layout that renders the header, the settings sidebar, and the corresponding setting
  return (
    <div className="h-full flex flex-col bg-midnight">
      {/* Header */}
      <nav>
        <NavBar />
      </nav>

      {/* Layout Content */}
      <div className="flex h-screen bg-midnight">
        {/* Sidebar */}
        <aside className="w-auto h-screen pl-17 pt-10 ml-5">
          <h1 className="text-4xl font-bold text-white-75">System Settings</h1>

          {/* Settings List of category and their respective labels */}
          {settingsData.map((setting, index) => (
            <SettingsList
              key={index}
              category={setting.category}
              labels={setting.labels}
              categoryClassName="text-base text-white-75 font-bold mb-3 mt-10"
              ulClassName=""
              labelClassName="pl-4 text-sm text-normal mb-3 cursor-pointer hover:text-teal"
            />
          ))}
        </aside>

        {/* Main Content (dynamic) */}
        <main className="flex-1 pt-29 pl-4 mb-500 h-screen w-fill">
          {children}
        </main>
      </div>
    </div>
  );
}
