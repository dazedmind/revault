import { Switch } from "@/components/ui/switch";
import React from "react";

const NotificationPreferenceSettings = () => {
  return (
    <div>
      <h1 className="text-2xl ml-1">Notification Preference</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div>
          <p className="text-white-100 text-base font-normal">
            Enable Notification
          </p>
          <p className="text-white-25 text-xs font-normal">
            Display numbers of contribution on profile
          </p>
        </div>
        <Switch />
      </div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div>
          <p className="text-white-100 text-base font-normal">
            Enable Push Notification
          </p>
          <p className="text-white-25 text-xs font-normal">
            Receive notification from app
          </p>
        </div>
        <Switch />
      </div>

      <div className="w-3xl outline-2 bg-midnight  p-5 ml-5 rounded-md flex justify-between items-center mt-5">
        <div>
          <p className="text-white-100 text-base font-normal">
            Email Notification
          </p>
          <p className="text-white-25 text-xs font-normal">
            Receive notifications through registered email address
          </p>
        </div>
        <Switch />
      </div>
    </div>
  );
};

export default NotificationPreferenceSettings;
