import React from 'react'
import { Logs } from "lucide-react";

const ActivityLog = ({ name, activity, time, ip_address, act_type, act_status }) => (
    <div className="w-auto dark:bg-secondary p-5 rounded-md flex gap-4 items-center">
        <div className="w-60">
            <p className="text-white-100 text-base font-normal">{time}</p>
        </div>
        <div>
             <Logs />
         </div>
         <div className="flex justify-between w-full">
             <div className="flex gap-1">                 
                <p className="text-teal text-base font-normal">
                 {name}
                 </p>
                <p className="text-white-100 text-base font-normal">
                {activity}
                </p>
             </div>
             <div>
                <p className="text-white-100 text-base font-normal">
                    {act_type}
                </p>
             </div>
             <div>
                <p className="text-white-100 text-base font-normal">
                    {act_status}
                </p>
             </div>
             <div>
                <p className="text-white-100 text-base font-normal">
                {ip_address}
                </p>
             </div>
         </div>
    </div>
  );

export default ActivityLog