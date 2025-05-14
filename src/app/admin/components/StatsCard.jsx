import React from 'react'

function StatsCard(props) {
  return (
    <div>
        <div className=" dark:bg-card-foreground border-2 border-white-5 p-4 w-82 rounded-md">
        <p className="font-bold text-xl">{props.department}</p>
        <p>{props.description}</p>
        <p className="font-bold text-5xl mt-2">{props.totalPapers}</p>
        </div>
    </div>
  )
}

export default StatsCard