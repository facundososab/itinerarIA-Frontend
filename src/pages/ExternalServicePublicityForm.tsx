import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ExternalService from '../interfaces/ExternalService.ts'
import { addPublicityRequest } from '../auth/publicity.ts'
import { usePlace } from '../context/PlaceContext.tsx'
import Loader from '../components/ui/Loader.tsx'

export default function ExternalServiceAdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExternalService>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitErrors, setSubmitErrors] = useState<string[]>([])
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { places, getAllPlaces } = usePlace()

  useEffect(() => {
    const loadData = async () => {
      getAllPlaces()
    }
    loadData()
  }, [])

  const onCreate = handleSubmit(async (data) => {
    try {
      await addPublicityRequest(data)
      setSubmitSuccess(true)
      reset()
    } catch (error: any) {
      setSubmitErrors([error.response.data.message])
      console.log(submitErrors)
    } finally {
      setIsSubmitting(false)
    }
  })

  useEffect(() => {
    if (submitErrors.length > 0) {
      const timer = setTimeout(() => {
        setSubmitErrors([])
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])

  return (
    <section className="bg-[#1c1c21] text-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-8">
          Advertise Your Service
        </h2>
        <form onSubmit={onCreate} className="space-y-6">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium">
              Service Type
            </label>
            <input
              type="text"
              id="serviceType"
              {...register('serviceType', {
                required: 'Service type is required',
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="e.g., Restaurant, Hotel, Tour Guide"
            />
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-500">
                {errors.serviceType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Service Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Service name is required' })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="Your service name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              {...register('description', {
                required: 'Description is required',
              })}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="Describe your service"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register('address', { required: 'Address is required' })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="Service address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="schedule" className="block text-sm font-medium">
              Schedule (optional)
            </label>
            <input
              type="text"
              id="schedule"
              {...register('schedule')}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="e.g., Mon-Fri 9AM-5PM"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium">
              Website (optional)
            </label>
            <input
              type="text"
              id="website"
              {...register('website', {
                minLength: {
                  value: 3,
                  message: 'Website must be at least 3 characters long',
                },
                maxLength: {
                  value: 50,
                  message: 'Website must be at most 50 characters long',
                },
                pattern: {
                  value: /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                  message: 'Website must be a valid URL (www.example.com)',
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="https://www.example.com"
            />
            {errors.website && (
              <p className="mt-1 text-sm text-red-500">
                {errors.website.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register('phoneNumber', {
                minLength: {
                  value: 10,
                  message: 'Phone number must be 10 characters long',
                },
                maxLength: {
                  value: 10,
                  message: 'Phone number must be 10 characters long',
                },
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100 placeholder-indigo-400"
              placeholder="+1 (123) 456-7890"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="placeId" className="block text-sm font-medium">
              Place
            </label>
            <select
              id="placeId"
              {...register('place', { required: 'Place is required' })}
              className="mt-1 block w-full px-3 py-2 bg-[#26262c] border border-indigo-600 rounded-md text-indigo-100"
            >
              <option value="">Select a place</option>
              {places &&
                places.map((place) => (
                  <option key={place.id.toString()} value={place.id.toString()}>
                    {place.name}
                  </option>
                ))}
            </select>
            {errors.place && (
              <p className="mt-1 text-sm text-red-500">
                {errors.place.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Send Request
            </button>
          </div>

          {submitErrors && submitErrors.length > 0 && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 text-sm p-4 rounded-md">
              <ul className="list-disc pl-5 space-y-1">
                {submitErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {submitSuccess && (
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 text-sm p-4 rounded-md">
              Your service has been submitted successfully and is pending
              review.
            </div>
          )}

          {isSubmitting && <Loader />}
        </form>
      </div>
    </section>
  )
}
