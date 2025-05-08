import React from "react";

const ActivityLogSettings = () => {
  return (
    <div>
      <h1 className="text-2xl ml-1">Activity Logs</h1>
      {/* divider */}
      <div className="bg-dusk h-0.5 w-5xl mb-2 mt-2"></div>
      <div className="w-3xl outline-2 bg-midnight mt-5 p-5 ml-5 rounded-md flex justify-between items-center">
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
  );
};

export default ActivityLogSettings;