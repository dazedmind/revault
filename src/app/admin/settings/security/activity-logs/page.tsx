"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Logs } from "lucide-react";
import ActivityLog from "@/app/admin/components/ActivityLog";

const ActivityLogSettings = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;


  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} mr-10 p-6 mb-8 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Activity Logs</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <ActivityLog 
        name="Admin 1" 
        activity=" logged in" 
        time="12:54PM" 
      />

      <ActivityLog 
        name="Admin 2" 
        activity=" uploaded a new document" 
        time="2:34PM" 
      />
      
      
    </div>
  );
};

export default ActivityLogSettings;
