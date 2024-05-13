
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-green-300">
      <div className="text-center">
        <h1 className="text-gray-800 text-4xl mt-4 font-bold">Page Not Found</h1>
        <p className="text-gray-800 text-xl mt-4">We are sorry, but the page you requested could not be found.</p>
        <p className="text-gray-800 text-xl mt-4 ">It seems that the page you are looking for has vanished into thin air.</p>
        <div className="mt-8">
         <Link href="/" className="bg-blue-950 text-white text-xl px-4 py-2 rounded-md">
          Go Back Home
         </Link>
        </div>
      </div>
    </div>
  )
}