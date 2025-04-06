import React from 'react'

const InputField = ({ label, type, name, placeholder, className = "" }) => (
    <div className="flex flex-col w-full">
      <label className="text-sm text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`px-3 py-2 bg-midnight border outline-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal ${className}`}
      />
    </div>
  );

function Upload() {
  return (
    <div className='flex flex-col gap-8'>
        <span className='flex flex-col gap-2'>
            <label htmlFor="title">Paper Title</label>
            <textarea name="title" id="title" className='p-4 bg-midnight border border-white-5 rounded-md w-2xl outline-0'></textarea>
        </span>

        <span className='flex flex-col gap-2'>
            <label htmlFor="authors">Authors</label>
            <input name="authors" id="authors" className='p-4 bg-midnight border border-white-5 rounded-md w-2xl outline-0'></input>
        </span>

        <span className='flex flex-col gap-2'>
            <label htmlFor="keywords">Keywords</label>
            <input name="keywords" id="keywords" className='p-4 bg-midnight border border-white-5 rounded-md w-2xl outline-0'></input>
        </span>

        <span className='flex flex-col gap-2'>
            <label htmlFor="tags">Tags</label>

            <div className='tags-card flex gap-4 items-center align-middle'>
              <div className='flex gap-2 items-center align-middle bg-dusk w-auto p-2 text-sm rounded-md'>
                <p>Information Technology</p>
                <button className='bg-white-5 p-1 rounded-full cursor-pointer text-xs'>x</button>
              </div>
              <div className='flex gap-2 items-center align-middle text-center bg-dusk w-auto p-2 text-sm rounded-md'>
                <p>SIA</p>
                <button className='bg-white-5 p-1 rounded-full cursor-pointer text-xs'>x</button>
              </div>
              <div className='flex gap-2 items-center align-middle bg-teal w-auto p-2 text-sm rounded-md'>
                <button className=' p-1 rounded-full cursor-pointer text-xs'>Add +</button>
              </div>
            </div>
        </span>

        <span className='flex flex-col gap-2'>
            <label htmlFor="abstract">Abstract</label>
            <textarea name="abstract" id="abstract" className='p-4 bg-midnight border border-white-5 rounded-md w-2xl h-42 outline-0'></textarea>
        </span>

    
    </div>
  )
}

export default Upload