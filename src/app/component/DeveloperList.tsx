import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const DeveloperList = ({ onClick }: { onClick: () => void }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const isLoginPage = pathname === "/" || pathname.startsWith("/login");

  useEffect(() => {
    setMounted(true);
  }, []);

  const developers = [
    {
      name: "Durante, KC D.",
      role: "Programmer & Documentation",
      icon: "💻",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Lastra, Kristhia Cayle F.",
      role: "Team Leader & Documentation Head",
      icon: "👑",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Insigne, Matthew Jacob B.",
      role: "System Programmer",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Valena, John Allen Troy E.",
      role: "Lead Programmer & System Designer",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Yacub, Jetthro Karl C.",
      role: "Documentation Member",
      icon: "📝",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`bg-white border-2 rounded-2xl shadow-lg p-6 mx-4 max-w-md w-full text-center`}>
        <h2 className="text-2xl font-bold text-gold">System Developers</h2>
        <p className="text-sm text-gray-600 mb-4 italic">Keyboard Warriors ⚔️</p>
        <div className="space-y-4">
          {developers.map((dev, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
              <span className="text-2xl">{dev.icon}</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{dev.name}</p>
                <p className="text-sm text-gray-600">{dev.role}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className=" cursor-pointer mt-6 px-6 py-2 bg-gold hover:brightness-105 text-white rounded-lg font-semibold"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeveloperList;