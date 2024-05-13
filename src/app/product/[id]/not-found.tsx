"use client"
import React from 'react'
import  { useRouter } from "next/navigation"

const NotFound = () => {
  const router=useRouter();
  
  const goBack = () => {
    router.back();
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-green-300">
      <div className="text-center">
        <h1 className="text-gray-800 text-4xl mt-4 font-bold">Page Not Found</h1>
        <p className="text-gray-800 text-xl mt-4">We're sorry, but the page you requested could not be found.</p>
        <p className="text-gray-800 text-xl mt-4 ">It seems that the page you are looking for has vanished into thin air.</p>
        <div className="mt-8">
          <button
          type='button' 
          onClick={()=>goBack()}
          className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">Go Back Home</button>
        </div>
      </div>
    </div>
  )
}

export default NotFound