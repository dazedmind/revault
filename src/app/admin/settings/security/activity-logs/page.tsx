"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Logs } from "lucide-react";
const ActivityLogSettings = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;


  return (
    <div className={`flex flex-col w-auto ${theme === 'light' ? 'bg-secondary border-white-50' : 'bg-midnight'} mr-10 p-6 rounded-xl border-1 border-white-5`}>
      <h1 className="text-2xl ml-1">Activity Logs</h1>
      {/* divider */}
      <div className={`h-0.5 w-auto my-4 ${theme === 'light' ? 'bg-white-50' : 'bg-dusk'}`}></div>

      <div className="w-auto dark:bg-secondary mt-5 p-5 ml-5 rounded-md flex gap-4 items-center">
        <div>
          <Logs />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-white-100 text-base font-normal">
              Admin logged in
            </p>
            <p className="text-white-25 text-xs font-normal">
              Quezon CIty, Manila
            </p>
          </div>

          <div>
            <p className="text-white-100 text-base font-normal">12:54PM</p>
            <p className="text-white-25 text-xs font-normal">Not you?</p>
          </div>
        </div>
      </div>

      <div className="w-auto dark:bg-secondary mt-5 p-5 ml-5 rounded-md flex gap-4 items-center">
        <div>
          <Logs />
        </div>
        <div className="flex justify-between w-full">
          <div>
            <p className="text-white-100 text-base font-normal">
              Login on Windows PC
            </p>
            <p className="text-white-25 text-xs font-normal">
              Quezon CIty, Manila
            </p>
          </div>

          <div>
            <p className="text-white-100 text-base font-normal">12:54PM</p>
            <p className="text-white-25 text-xs font-normal">Not you?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogSettings;
