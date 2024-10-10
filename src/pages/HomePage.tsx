import { Link, useNavigate } from 'react-router-dom'
import { MapIcon, ClockIcon, ThumbsUpIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext.tsx'
import { useEffect } from 'react'
import ItineraryLanding from '../img/itinerary-landing.svg'

export default function Component() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/itinerarios')
    }
  }, [isAuthenticated])
  return (
    <div className="min-h-screen bg-night">
      <main>
        <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div className="lg:py-24">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-indigo-100 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">Discover Your</span>
                    <span className="block text-indigo-400">
                      Perfect Destination
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-indigo-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Personalized recommendations and tailored itineraries based
                    on your preferences.
                  </p>
                </div>
              </div>
              <div className="mt-12 -mb-16 sm:-mb-48">
                <div className="mx-auto max-w-md flex justify-center items-center px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img src={ItineraryLanding} alt="Hero" className="w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative bg-[#1c1c21] py-16 sm:py-24 lg:py-32"
          id="features"
        >
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-indigo-400 uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-indigo-100 tracking-tight sm:text-4xl">
              Everything you need for the perfect trip
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-indigo-300">
              Ever felt lost trying to decide what to do on your trip? Planning
              activities can be overwhelming. Our system offers personalized
              recommendations and creates itineraries tailored to your
              preferences, so you can enjoy your trip to the fullest without the
              hassle.
            </p>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-[#26262c] rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <MapIcon
                            className="h-6 w-6 text-indigo-100"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-indigo-200 tracking-tight">
                        Personalization
                      </h3>
                      <p className="mt-5 text-base text-indigo-300">
                        Recommendations based on your interests and preferences.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root bg-[#26262c] rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <ClockIcon
                            className="h-6 w-6 text-indigo-100"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-indigo-200 tracking-tight">
                        Tailored Itineraries
                      </h3>
                      <p className="mt-5 text-base text-indigo-300">
                        Generate daily itineraries adjusted to your tastes and
                        available time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <div className="flow-root bg-[#26262c] rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <ThumbsUpIcon
                            className="h-6 w-6 text-indigo-100"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-indigo-200 tracking-tight">
                        User-Friendly
                      </h3>
                      <p className="mt-5 text-base text-indigo-300">
                        An intuitive interface that makes planning your trip
                        simple and fast.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#2f3037]" id="benefits">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-indigo-100 sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block">
                Start planning your dream trip today.
              </span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-300">
              Sign up today and start planning the trip of your dreams. Save
              time, enjoy more, and travel with confidence.
            </p>
            <Link
              to="/register"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="bg-[#26262c] pt-12 sm:pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-indigo-100 sm:text-4xl">
                Key Benefits
              </h2>
            </div>
          </div>
          <div className="mt-10 pb-12 bg-[#1c1c21] sm:pb-16">
            <div className="relative">
              <div className="absolute inset-0 h-1/2 bg-[#26262c]"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <dl className="rounded-lg bg-[#2f3037] shadow-lg sm:grid sm:grid-cols-3">
                    <div className="flex flex-col border-b border-[#393a41] p-6 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-300">
                        Save Time
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-indigo-100">
                        Minutes
                      </dd>
                    </div>
                    <div className="flex flex-col border-t border-b border-[#393a41] p-6 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-300">
                        Enjoy More
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-indigo-100">
                        100%
                      </dd>
                    </div>
                    <div className="flex flex-col border-t border-[#393a41] p-6 text-center sm:border-0 sm:border-l">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-300">
                        Travel Confidence
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-indigo-100">
                        Tailored
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#26262c]" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="mt-12 border-t border-[#393a41] pt-8">
            <p className="text-base text-indigo-400 xl:text-center">
              &copy; 2024 itinerarIA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
