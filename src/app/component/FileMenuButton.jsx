import React from 'react'

function FileMenuButton({icon, label}) {
  return (
    <div>
        <div className='flex align-middle items-center gap-2 mt-4'>
            <div className='bg-dusk rounded-md p-2'>
                {icon}
            </div>
            <p>{label}</p>
        </div>
    </div>
  )
}

export default FileMenuButton