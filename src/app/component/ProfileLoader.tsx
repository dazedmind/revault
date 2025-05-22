import React from 'react'

function ProfileLoader() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
    {/* Header */}
    <div className="flex items-center p-6 justify-between">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full" />
        <div className="h-6 w-32 bg-gray-300 rounded" />
      </div>
      <div className="h-10 w-24 bg-gray-300 rounded" />
    </div>

    {/* Profile Section */}
    <div className="bg-gray-100 p-10 rounded-xl flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <div className="h-24 w-24 bg-gray-300 rounded-full" />
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="h-10 w-28 bg-gray-300 rounded" />
    </div>

    {/* Statistics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-lg space-y-2">
          <div className="h-4 w-40 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-8 w-12 bg-gray-300 rounded" />
        </div>
      ))}
    </div>

    {/* Manage Published Papers */}
    <div className="space-y-4">
      <div className="h-6 w-60 bg-gray-300 rounded" />
      <div className="flex items-center space-x-3">
        <div className="h-10 w-full max-w-sm bg-gray-300 rounded" />
        <div className="h-10 w-20 bg-gray-300 rounded" />
        <div className="h-10 w-16 bg-gray-300 rounded" />
      </div>
    </div>

    {/* Paper Cards */}
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-96 bg-gray-300 rounded" />
          </div>
          <div className="h-10 w-24 bg-gray-300 rounded" />
        </div>
      ))}
    </div>
  </div>
  )
}

export default ProfileLoader