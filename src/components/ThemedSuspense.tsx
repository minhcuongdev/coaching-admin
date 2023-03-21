import React from 'react'

function ThemedSuspense() {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <div
        className="spinner-grow inline-block w-8 h-8 bg-blue-600 rounded-full opacity-0 text-blue-600"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
      spinner-grow inline-block w-8 h-8 bg-purple-500 rounded-full opacity-0
        text-purple-500
      "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
      spinner-grow inline-block w-8 h-8 bg-green-500 rounded-full opacity-0
        text-green-500
      "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-red-500 rounded-full opacity-0 text-red-500"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="
      spinner-grow inline-block w-8 h-8 bg-yellow-500 rounded-full opacity-0
        text-yellow-500
      "
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-blue-300 rounded-full opacity-0 text-blue-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        className="spinner-grow inline-block w-8 h-8 bg-gray-300 rounded-full opacity-0 text-gray-300"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default ThemedSuspense
