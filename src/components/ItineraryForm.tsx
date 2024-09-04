import { useForm } from "react-hook-form";
import Itinerary from "../interfaces/Itinerary.ts";
import User from "../interfaces/User.ts";
import { useItinerary } from "../context/ItineraryContext.tsx";

export default function InputNewItinerary({
  onClose,
}: {
  onClose: () => void;
}) {
  const { createItinerary } = useItinerary();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Itinerary>();
  const onSubmit = handleSubmit((data) => {
    createItinerary(data);
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-stone-800 p-6 rounded-md shadow-md">
        <div className="text-lg font-semibold mb-1">New Itinerary</div>
        <form onSubmit={onSubmit} className="space-y-1.5">
          {" "}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter itinerary title"
              />
            </div>
            {errors.title?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="description"
                type="text"
                {...register("description")}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter itinerary description"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-white"
            >
              Duration(in days)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="duration"
                type="number"
                {...register("duration", {
                  required: "Duration is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter itinerary duration"
              />
            </div>
            {errors.duration?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="place"
              className="block text-sm font-medium text-white"
            >
              Place
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="place"
                type="text"
                {...register("place", {
                  required: "Place is required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter itinerary place"
              />
            </div>
            {errors.place?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.place.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="preferences"
              className="block text-sm font-medium text-white"
            >
              Preferences
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="preferences"
                type="text"
                {...register("preferences", {
                  required: "Preferences are required",
                })}
                className="block w-full px-3 py-2 bg-davys-gray border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter itinerary preferences"
              />
            </div>
            {errors.preferences?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.preferences.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transform transition-transform duration-300 hover:scale-105 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
        <button
          className="my-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}