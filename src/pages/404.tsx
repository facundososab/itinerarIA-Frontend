import { Link } from 'react-router-dom'
import { MapIcon, CompassIcon, HomeIcon } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#131316] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <MapIcon className="h-24 w-24 text-indigo-500 animate-pulse" />
            <CompassIcon className="h-12 w-12 text-indigo-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin" />
          </div>
        </div>
        <h2 className="mt-6 text-6xl font-extrabold text-indigo-100">404</h2>
        <p className="mt-2 text-3xl font-bold text-indigo-200">
          Oops! You're off the map
        </p>
        <p className="mt-2 text-xl text-indigo-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
