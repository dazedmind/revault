import React from 'react'
import { useTheme } from 'next-themes'

function StatsCard(props) {
  const { theme } = useTheme()
  return (
    <div>
        <div className={` ${theme === 'light' ? 'border-white-50 bg-tertiary' : 'border-white-5 bg-dusk'}  border-2 p-4 w-72 rounded-md`}>
        <p className="font-bold text-xl">{props.department}</p>
        <p>{props.description}</p>
        <p className="font-bold text-5xl mt-2">{props.totalPapers}</p>
        </div>
    </div>
  )
}

export default StatsCard