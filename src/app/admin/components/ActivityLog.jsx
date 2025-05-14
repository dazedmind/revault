import React from 'react'
import { Logs } from "lucide-react";
function ActivityLog(props) {
  return (
    <div className="w-auto dark:bg-secondary p-5 rounded-md flex gap-4 items-center">
        <div>
            <Logs />
        </div>
        <div className="flex justify-between w-full">
            <div>
                <p className="text-white-100 text-base font-normal">
                {props.name}              
                {props.activity}
                </p>

            </div>

            <div>
                <p className="text-white-100 text-base font-normal">{props.time}</p>
            </div>
        </div>
    </div>
    )
}

export default ActivityLog