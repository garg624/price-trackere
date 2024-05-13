"use client"
const Error = ({ statusCode }:any) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-300 to-yellow-300">
      <div className="text-center">
        <h1 className="text-gray-800 text-4xl mt-4 font-bold">Error</h1>
        <p className="text-gray-800 text-xl mt-4">{statusCode ? `An error ${statusCode} occurred on the server` : 'An error occurred on the client'}</p>
      </div>
    </div>
  )
}

export default Error